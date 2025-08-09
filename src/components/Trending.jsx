import React from 'react'
import Spinner from './Spinner';

const Trending = ({isTrendingLoading, trendingErrorMessage, trendingMovies}) => {
    return (
        <section className="trending">
            <h2>Trending Movies</h2>

            {isTrendingLoading ? (
                <Spinner/>
            ) : trendingErrorMessage ? (
                <p className="text-red-500">{trendingErrorMessage}</p>
            ) : trendingMovies.length > 0 ? (
                <ul>
                    {trendingMovies.map((movie, idx) => (
                        <li key={movie.$id}>
                            <p>{idx + 1}</p>
                            <img src={movie.poster_url} alt={movie.title}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white font-bold text-center text-2xl my-10">
                    No Trending Movies to Show
                </p>
            )}
        </section>
    );
}

export default Trending