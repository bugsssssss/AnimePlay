import { useEffect, useState } from "react";
import "./pages.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Movies } from "../components/movies/movies";

export function Search() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("");

	// async function fetchMovies() {
	// 	let response = await fetch("http://127.0.0.1:8000/api/movies/");
	// 	// return response.json();
	// 	console.log(response.json());
	// 	// if (response != null) {
	// 	// 	let data = await response.json();
	// 	// 	setMovies(data);
	// 	// }
	// }

	// async function getMovies() {
	// 	let data = await fetchMovies();
	// 	setMovies(data);
	// }

	useEffect(() => {
		console.log(query);
	}, [query]);

	const checkMovies = (query) => {
		axios
			.get(`http://127.0.0.1:8000/api/movies/?q=${query}`)
			.then((response) => {
				// Handle the response from the API
				// let is_found = response.data["movies"];
				let is_found = response.data;

				// setSeriesVerified(is_found);
				// let seriesInputStyle = document.getElementById("series");
				if (is_found) {
					setMovies(is_found);
					console.log(movies);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleChange = (e) => {
		const value = e.target.value;

		if (value.length > 2) {
			setQuery(value);
			checkMovies(value);
		} else if (value.length == 0) {
			setMovies([]);
		}
	};

	return (
		<div className="search__content">
			<section className="search">
				<h1>Search...</h1>
				<input type="text" onChange={handleChange} className="search__item" />
			</section>
			<span>Results: {movies.length}</span>
			<div
				className="movies__container"
				style={{
					marginTop: "30px",
				}}
			>
				{movies ? (
					movies.map((movie) => (
						<Link to={`/${movie.title_original}/${movie.id}`} key={movie.id}>
							<div
								className="movies__container-item"
								style={{
									backgroundImage: `url(http://127.0.0.1:8000${movie.picture})`,
									position: "relative",
									transition: "0.5s",
									color: "#fff",
								}}
							>
								<div
									className="movie__container-item-wrapper"
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<span className="movie__container_item-title">
										{movie.title_rus}
									</span>
								</div>
							</div>
						</Link>
					))
				) : (
					<h2>Nothing here...</h2>
				)}
			</div>
		</div>
	);
}
