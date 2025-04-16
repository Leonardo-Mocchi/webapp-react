import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const api_endpoint = "http://localhost:3000/api/v1/movies";

function Movies() {
    const [movies, setMovies] = useState([]);

    function fetchMovies() {
        fetch(api_endpoint)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {

                console.log(); // for debugging purposes

                setMovies(data);
            })
            .catch(error => console.error("Error fetching movies:", error));
    }

    useEffect(fetchMovies, []);


    return (
        <main>
            <div className="container">


            </div>

            {/* link to the reviews of the movie */}
            {/* <Link to={`/movies/${movies.id}`} className="btn btn-success"> See reviews </Link> */}
        </main>
    )
}
export default Movies