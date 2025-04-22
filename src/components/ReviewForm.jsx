import React, { useState } from "react";

export default function ReviewForm({ movieId, onReviewSubmit }) {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);
    const [userName, setUserName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            text: reviewText,
            vote: rating,
            name: userName || "Anon",
        };

        fetch(`http://localhost:3000/api/v1/movies/${movieId}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to submit review");
                }
                return response.json();
            })
            .then(() => {
                // Fetch the updated movie data
                return fetch(`http://localhost:3000/api/v1/movies/${movieId}`);
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch updated movie data");
                }
                return response.json();
            })
            .then((updatedMovie) => {
                onReviewSubmit(updatedMovie); // Pass the updated movie to the parent
                setReviewText("");
                setRating(1);
                setUserName("");
            })
            .catch((error) => {
                console.error("Error submitting review:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="review-form mt-5">
            <h3 className="text-highlight">Leave a Review</h3>
            <div className="d-flex mb-3">
                <div className="me-3 flex-grow-1">
                    <label htmlFor="userName" className="form-label">
                        Your Name
                    </label>
                    <input
                        id="userName"
                        type="text"
                        className="form-control"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div style={{ width: "100px" }}>
                    <label htmlFor="rating" className="form-label">
                        Rating
                    </label>
                    <select
                        id="rating"
                        className="form-select"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="reviewText" className="form-label">
                    Your Review
                </label>
                <textarea
                    id="reviewText"
                    className="form-control"
                    rows="3"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-custom">
                    Submit Review
                </button>
            </div>
        </form>
    );
}