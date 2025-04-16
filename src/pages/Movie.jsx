import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Movie() {
    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch the current movie
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/movies/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setMovie(data))
            .catch((err) => console.error("Error fetching movie:", err));
    }, [id]);

    // Fetch the list of all movies
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/movies")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setMovies(data))
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    // Guard clause to prevent rendering when movie is null
    if (!movie) {
        return null; // Render nothing until movie is fetched
    }

    // Determine the previous and next movies
    const currentIndex = movies.findIndex((m) => m.id === parseInt(id));
    const previousMovie = currentIndex > 0 ? movies[currentIndex - 1] : null;
    const nextMovie = currentIndex < movies.length - 1 ? movies[currentIndex + 1] : null;

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
                            onClick={() => {
                                if (previousMovie) {
                                    navigate(`/movies/${previousMovie.id}`);
                                }
                            }}
                        >
                            <i className="bi bi-arrow-left"></i>
                            <span className="ms-2">Previous Movie</span>
                        </button>
                        <button
                            className={`btn btn-custom d-flex align-items-center ${!nextMovie && "d-none"}`}
                            type="button"
                            onClick={() => {
                                if (nextMovie) {
                                    navigate(`/movies/${nextMovie.id}`);
                                }
                            }}
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

                <section className="mt-5">
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