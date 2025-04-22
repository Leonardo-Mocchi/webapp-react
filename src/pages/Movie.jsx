import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useLoader } from "../contexts/LoaderContext";
import ReviewForm from "../components/ReviewForm";

export default function Movie() {
    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Local loading state
    const { id } = useParams();
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        let isMounted = true; // Prevent state updates if the component unmounts
        /* console.log("Fetching movie with ID:", id); // Debugging log //debug purposes */
        setIsLoading(true);
        showLoader();

        // Fetch the current movie
        fetch(`http://localhost:3000/api/v1/movies/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                /* console.log("Fetched movie data:", data); //debug purposes */
                if (isMounted) {
                    setMovie(data);
                }
            })
            .catch((err) => console.error("Error fetching movie:", err))
            .finally(() => {
                if (isMounted) {
                    /* console.log("Hiding loader after fetching movie"); //debug purposes */
                    setIsLoading(false);
                    hideLoader();
                }
            });

        // Fetch the list of all movies
        fetch("http://localhost:3000/api/v1/movies")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    setMovies(data);
                }
            })
            .catch((err) => console.error("Error fetching movies:", err));

        return () => {
            isMounted = false; // Cleanup to prevent state updates after unmount
        };
    }, [id, showLoader, hideLoader]);

    const handleNewReview = (updatedMovie) => {
        setMovie(updatedMovie);
    };

    // Determine the previous and next movies
    const currentIndex = movies.findIndex((m) => m.id === parseInt(id));
    const previousMovie = currentIndex > 0 ? movies[currentIndex - 1] : null;
    const nextMovie = currentIndex < movies.length - 1 ? movies[currentIndex + 1] : null;

    // Navigation handlers for previous and next movies
    const handlePreviousMovie = () => {
        if (previousMovie) {
            navigate(`/movies/${previousMovie.id}`);
        }
    };

    const handleNextMovie = () => {
        if (nextMovie) {
            navigate(`/movies/${nextMovie.id}`);
        }
    };

    // Render loading state if movie is not yet loaded
    if (isLoading || !movie) {
        return (
            <main className="movie-page">
                <div className="container py-2">
                    <p className="text-light">Loading movie details...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="movie-page">
            <div className="container py-2">
                <div className="d-flex justify-content-between my-4">
                    <Link to="/movies" className="btn btn-custom mb-4">
                        <i className="bi bi-arrow-return-right"></i> Go Back
                    </Link>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <button
                            className={`btn btn-custom me-2 d-flex align-items-center ${!previousMovie && "d-none"}`}
                            type="button"
                            onClick={handlePreviousMovie}
                        >
                            <i className="bi bi-arrow-left"></i>
                            <span className="ms-2">Previous Movie</span>
                        </button>
                        <button
                            className={`btn btn-custom d-flex align-items-center ${!nextMovie && "d-none"}`}
                            type="button"
                            onClick={handleNextMovie}
                            disabled={!nextMovie}
                        >
                            <span className="me-2">Next Movie</span>
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-md-4">
                        <img
                            className="img-fluid rounded shadow movie-image-small"
                            src={`http://localhost:3000${movie.image}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className="col-12 col-md-8">
                        <h1 className="text-highlight">{movie.title}</h1>
                        <p className="text-light">
                            <strong>Director:</strong> {movie.director}
                        </p>
                        <p className="text-light">
                            <strong>Genre:</strong> {movie.genre}
                        </p>
                        <p className="text-light">
                            <strong>Release Year:</strong> {movie.release_year}
                        </p>
                        <p className="text-light">{movie.abstract}</p>
                    </div>
                </div>

                {/* Review Form */}
                <ReviewForm movieId={id} onReviewSubmit={handleNewReview} />

                <section className="mt-2">
                    <h2 className="text-highlight">Reviews</h2>
                    {movie.reviews?.length > 0 ? (
                        <ul className="list-group">
                            {movie.reviews.map((review) => (
                                <li
                                    key={review.id}
                                    className="list-group-item"
                                >
                                    <h5>{review.name}</h5>
                                    <p>{review.text}</p>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <FontAwesomeIcon
                                                key={index}
                                                icon={faStar}
                                                style={{
                                                    color: index < review.vote ? "gold" : "gray",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-light">
                            No reviews available for this movie. Be the first to leave a review!
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}