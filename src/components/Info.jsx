import React from "react";
import Box from "./Box";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import Content from "./Content";
import formatNumber from "../utils/formatNumber"

const Info = ({ movie, trailerData: { trailer, trailerError, isTrailerLoading } }) => {
	const date = new Date(movie.release_date);
	const formatted = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return (
		<>
			<div className="flex justify-between mb-6">
				<div>
					<h2>{movie.title}</h2>
					<p className="text-gray-100 text-sm">
						{movie.release_date.split("-")[0]}
						<span> • </span>
						{movie.original_language.toUpperCase()}
						<span> • </span>
						{`${Math.floor(movie.runtime / 60)}h ${Math.floor(movie.runtime % 60)}m`}
					</p>
				</div>
				<div className="flex gap-2">
					<Box>
						<img src="/star.svg" alt="Star Icon" width={"20px"} />
						{movie.vote_average.toFixed(1)}/10 ({movie.vote_count})
					</Box>
					<Box>
						<img src="/arrow.svg" alt="Arrow Icon" width={"20px"} />
						{Math.floor(movie.popularity)}
					</Box>
				</div>
			</div>
			<div className="flex gap-10">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					className="rounded-lg w-2xs"
				/>
				{isTrailerLoading ? (
					<Spinner />
				) : trailerError ? (
					<p className="text-red-500">{trailerError}</p>
				) : (
					<iframe
						width="960"
						height="435"
						src={`https://www.youtube.com/embed/${trailer.key}`}
						title={movie.title}
						frameborder="0"
						allow="autoplay; encrypted-media;"
						allowfullscreen
						className="rounded-lg"></iframe>
				)}
			</div>
			<div className="flex justify-between mt-10">
				<div className="w-4xl flex flex-col gap-5">
					<Content name={"Generes"} center={true}>
						<div className="flex gap-2">
							{movie.genres.map((genre) => (
								<Box key={genre.id}>{genre.name}</Box>
							))}
						</div>
					</Content>

					<Content name={"Overview"}>
						<p>{movie.overview}</p>
					</Content>

					<Content name={"Release Date"}>{formatted}</Content>
					<Content name={"Countries"}>
						<div className="flex">
							{movie.production_countries.map((country, idx) => (
								<>
									<p key={country.name}>{country.name}</p>
									{idx !== movie.production_countries.length - 1 && (
										<span> • </span>
									)}
								</>
							))}
						</div>
					</Content>
					<Content name={"Status"}>
						<p>{movie.status}</p>
					</Content>

					<Content name={"Language"}>
						<div className="flex">
							{movie.spoken_languages.map((language, idx) => (
								<>
									<p key={language.name}>{language.name}</p>
									{idx !== movie.spoken_languages.length - 1 && <span> • </span>}
								</>
							))}
						</div>
					</Content>
					<Content name={"Budget"}>
						<p>{movie.budget > 0 ? `$${formatNumber(movie.budget)}` : "N/A"}</p>
					</Content>
					<Content name={"Revenue"}>
						<p>{movie.revenue > 0 ? `$${formatNumber(movie.revenue)}` : "N/A"}</p>
					</Content>
					<Content name={"Tagline"}>
						<p>{movie.tagline ? movie.tagline : "N/A"}</p>
					</Content>
					<Content name={"Production Companies"}>
						<div className="flex">
							{movie.production_companies.map((company, idx) => (
								<>
									<p key={company.name}>{company.name}</p>
									{idx !== movie.production_companies.length - 1 && (
										<span> • </span>
									)}
								</>
							))}
						</div>
					</Content>
				</div>
				<div>
					<Link
						to={"/"}
						className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] p-3 rounded-xl text-black font-semibold">
						Visit Homepage
					</Link>
				</div>
			</div>
		</>
	);
};

export default Info;
