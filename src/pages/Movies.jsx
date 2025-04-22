import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoader } from "../contexts/LoaderContext";

const api_endpoint = "http://localhost:3000/api/v1/movies";

function Movies() {
    const [movies, setMovies] = useState([]);
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        showLoader();
        fetch(api_endpoint)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setMovies(data);
                hideLoader();
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                hideLoader();
            });
    }, [showLoader, hideLoader]);

    return (
        <main>
            <div className="card-container container align-items-center">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="card"
                    >
                        {/* COVER IMAGE */}
                        <img src={`http://localhost:3000${movie.image}`} alt={movie.title} className="img-fluid" />

                        {/* CARD BODY */}
                        <div className="card-body">
                            {/* TITLE */}
                            <h4 className="card-title">{movie.title}</h4>

                            {/* DETAILS */}
                            <p className="card-text">{movie.abstract}</p>
                            <p className="card-text"><strong>Director:</strong> {movie.director}</p>
                            <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
                            <p className="card-text"><strong>Release Year:</strong> {movie.release_year}</p>

                            {/* LINK TO SINGLE MOVIE */}
                            <Link to={`/movies/${movie.id}`} className="btn">See the reviews</Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Movies;