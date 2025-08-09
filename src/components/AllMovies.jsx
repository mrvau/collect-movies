import {Link} from 'react-router-dom';
import Spinner from './Spinner';
import MovieCard from './MovieCard';

const AllMovies = ({isLoading, errorMessage, popularMovies}) => {
    return (
        <section className="all-movies">
            <h2>All Movies</h2>

            {isLoading ? (
                <Spinner/>
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : (
                <ul>
                    {popularMovies.map((movie) => (
                        <Link key={movie.id} to={`/details/${movie.id}`}
                        >
                            <MovieCard movie={movie}/>
                        </Link>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default AllMovies