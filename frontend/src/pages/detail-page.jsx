import React from "react";
import { MovieContext, MovieProvider } from "../context/movie";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { DetailComponent } from "../components/detail/detail";
import { useParams } from "react-router-dom";

export function DetailPage() {
	const { movie, changeMovie } = useContext(MovieContext);
	const [movieData, setMovieData] = useState(null);

	const { id } = useParams();
	const { name } = useParams();

	async function fetchMovie() {
		try {
			let response = await fetch(
				`http://127.0.0.1:8000/api/movies/?movie-id=${id}`
			);
			let result = await response.json();
			setMovieData(result[0]);
		} catch (error) {}
	}

	useEffect(() => {
		fetchMovie();
	}, []);

	if (movieData === null) {
		return <div>Loading...</div>;
	} else {
		return <DetailComponent movie={movieData} />;
	}
}
