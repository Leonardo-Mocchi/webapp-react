import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Movie() {
    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [showComments, setShowComments] = useState(true); // State to toggle comments visibility
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch the current movie
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/movies/${id}`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error("Error fetching movie:", err));
    }, [id]);

    // Fetch the list of all movies
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/movies")
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    const currentIndex = movies.findIndex((m) => m.id === parseInt(id));
    const previousMovie = currentIndex > 0 ? movies[currentIndex - 1] : null;
    const nextMovie = currentIndex < movies.length - 1 ? movies[currentIndex + 1] : null;

    return (
        <main className="movie-page">
            {movie && (
                <div className="container mt-4">
                    {/* Back Button */}
                    <Link to="/movies" className="btn btn-custom mb-4">
                        <i className="bi bi-arrow-return-right"></i> Go Back
                    </Link>

                    {/* Navigation Buttons */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <button
                            className={`btn btn-custom me-2 d-flex align-items-center ${!previousMovie && "d-none"}`}
                            onClick={() => previousMovie && navigate(`/movies/${previousMovie.id}`)}
                        >
                            <i className="bi bi-arrow-left"></i>
                            <span className="ms-2">Previous Episode</span>
                        </button>
                        <button
                            className={`btn btn-custom d-flex align-items-center ${!nextMovie && "d-none"}`}
                            onClick={() => nextMovie && navigate(`/movies/${nextMovie.id}`)}
                        >
                            <span className="me-2">Next Episode</span>
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>

                    {/* Movie Details */}
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

                    {/* Toggle Comments Button */}
                    <button
                        className="btn btn-custom mt-4"
                        onClick={() => setShowComments(!showComments)}
                    >
                        {showComments ? "Hide Comments" : "Show Comments"}
                    </button>

                    {/* Reviews Section */}
                    {showComments && (
                        <section className="mt-5">
                            <h2 className="text-highlight">Reviews</h2>
                            {movie.reviews?.length > 0 ? (
                                <ul className="list-group">
                                    {movie.reviews.map((review) => (
                                        <li
                                            key={review.id}
                                            className="list-group-item bg-dark text-light shadow-sm"
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
                                    No reviews available for this movie.
                                </p>
                            )}
                        </section>
                    )}
                </div>
            )}
        </main>
    );
}