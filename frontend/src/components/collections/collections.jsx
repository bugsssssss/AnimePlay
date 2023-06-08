import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { MovieContext, MovieProvider } from "../../context/movie";
import { useContext } from "react";
import "./collections.css";
import { useParams } from "react-router-dom";
import { CardSlider } from "../slider/slider";
import { AuthContext } from "../../context/AuthContext";

export function Collections() {
	const [collections, setCollections] = useState([]);
	const { movieDetail, setMovieDetail } = useContext(MovieContext);
	const { name } = useParams();

	const { username } = useContext(AuthContext);

	async function fetchCollections() {
		let response = await fetch("http://127.0.0.1:8000/api/collections/");
		if (response.ok) {
			let data = await response.json();
			return await data;
		} else {
			let data = [];
			return data;
		}
	}

	async function GetCollections() {
		let data = await fetchCollections();
		setCollections(data);
	}

	function HandleClick(movieId) {
		setMovieDetail(movieId);
	}

	useEffect(() => {
		GetCollections();
	}, []);

	console.log(collections);
	return (
		// <MovieProvider>
		<section className="collections">
			{/* <h1 className="collections-heading">Collections</h1> */}
			{/* <div className="collections__content"> */}
			{collections.map((collection) => (
				<div className="collections__content-item" key={collection.id}>
					<span
						style={{
							display: "block",
							margin: "0 auto 30px auto",
							textAlign: "center",
						}}
						className="content-item-heading"
					>
						{collection.name}
					</span>
					<CardSlider collection={collection} />
				</div>
			))}
			{/* </div> */}
		</section>
		// </MovieProvider>
	);
}
