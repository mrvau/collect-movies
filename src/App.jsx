import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Trending from "./components/Trending";
import AllMovies from "./components/AllMovies";
import Details from "./pages/Details";
import Footer from "./components/Footer";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
};

const maxPage = 50;
const minPage = 1;

const App = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

	const [page, setPage] = useState(minPage);

	const [isLeftDisabled, setIsLeftDisabled] = useState(true);
	const [isRightDisabled, setIsRightDisabled] = useState(false);

	const [popularMovies, setPopularMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [trendingMovies, setTrendingMovies] = useState([]);
	const [trendingErrorMessage, setTrendingErrorMessage] = useState("");
	const [isTrendingLoading, setIsTrendingLoading] = useState(false);

	useDebounce(() => setDebouncedSearchTerm(searchTerm), 700, [searchTerm]);

	const fetchMovies = async (query = "", page) => {
		setIsLoading(true);
		setErrorMessage("");
		try {
			const endpoint = query
				? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
				: `${API_BASE_URL}/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`;
			const response = await fetch(endpoint, API_OPTIONS);

			if (!response.ok) {
				throw new Error("Failed to fetch movies.");
			}

			const data = await response.json();

			if (data.response === "False") {
				setErrorMessage(data.error || "Failed to fetch movies.");
				setPopularMovies([]);
				return;
			}
			setPopularMovies(data.results || []);

			if (query && data.results.length > 0) {
				await updateSearchCount(query, data.results[0]);
			}
		} catch (error) {
			console.error(`Error fetching movies: ${error}`);
			setErrorMessage(`Error fetching movies. Please try again later!`);
		} finally {
			setIsLoading(false);
		}
	};

	const loadTrendingMovies = async () => {
		setIsTrendingLoading(true);
		setTrendingErrorMessage("");
		try {
			const movies = await getTrendingMovies();
			setTrendingMovies(movies || []);
		} catch (error) {
			console.error(`Error fetching trending movies: ${error}`);
			setTrendingErrorMessage("Error fetching trending movies.");
		} finally {
			setIsTrendingLoading(false);
		}
	};

	useEffect(() => {
		if (page === minPage) {
			setIsLeftDisabled(true);
		} else if (page === maxPage) {
			setIsRightDisabled(true);
		} else {
			setIsLeftDisabled(false);
			setIsRightDisabled(false);
		}
	}, [page]);

	useEffect(() => {
		fetchMovies(debouncedSearchTerm, page);
	}, [debouncedSearchTerm, page]);

	useEffect(() => {
		loadTrendingMovies();
	}, []);

	return (
		<main>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<div className="pattern" />
							<div className="wrapper">
								<Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
								<Trending
									isTrendingLoading={isTrendingLoading}
									trendingErrorMessage={trendingErrorMessage}
									trendingMovies={trendingMovies}
								/>

								<AllMovies
									isLoading={isLoading}
									errorMessage={errorMessage}
									popularMovies={popularMovies}
								/>

								<Footer
									page={page}
									setPage={setPage}
									isLeftDisabled={isLeftDisabled}
									isRightDisabled={isRightDisabled}
									maxPage={maxPage}
								/>
							</div>
						</>
					}
				/>
				<Route path="/details/:movieId" element={<Details />} />
			</Routes>
		</main>
	);
};

export default App;
