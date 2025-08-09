import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Info from "../components/Info";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
};

const Details = () => {
	const { movieId } = useParams();

	const [movie, setMovie] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [trailer, setTrailer] = useState(null);
	const [trailerError, setTrailerError] = useState(null);
	const [isTrailerLoading, setIsTrailerLoading] = useState(false);

	const fetchMovieData = async () => {
		setIsLoading(true);
		setErrorMessage("");
		try {
			const response = await fetch(`${BASE_URL}/${movieId}`, API_OPTIONS);

			if (!response.ok) throw new Error("Error getting movie.");

			const data = await response.json();

			if (data.response === "False") throw new Error("Error getting movie.");

			setMovie(data);
		} catch (error) {
			console.error("Error getting movie.", error);
			setErrorMessage("Error getting movie. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	const fetchTrailer = async () => {
		setIsTrailerLoading(true);
		setTrailerError("");
		try {
			const response = await fetch(`${BASE_URL}/${movieId}/videos`, API_OPTIONS);

			if (!response.ok) throw new Error("Error getting movie trailer.");

			const data = await response.json();

			if (data.response === "False") throw new Error("Error getting movie.");

			setTrailer(data.results[0]);
		} catch (error) {
			console.error("Error getting movie.", error);
			setTrailerError("Error getting movie. Please try again later.");
		} finally {
			setIsTrailerLoading(false);
		}
	};

	useEffect(() => {
		fetchMovieData();
		fetchTrailer();
		// Scroll to top when component mounts
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="p-8 wrapper">
			<div className="details-shadow text-white p-6 rounded-md">
				{isLoading ? (
					<Spinner />
				) : errorMessage ? (
					<p className="text-red-500">{errorMessage}</p>
				) : movie ? (
					<Info
						movie={movie}
						trailerData={{
							trailer: trailer,
							trailerError: trailerError,
							isTrailerLoading: isTrailerLoading,
						}}
					/>
				) : (
					<p className="text-white font-bold">No movie data available</p>
				)}
			</div>
		</div>
	);
};

export default Details;
