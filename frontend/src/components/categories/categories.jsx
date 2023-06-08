import "./categories.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function Categories() {
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [data, setData] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const { user } = useContext(AuthContext);

	async function fetchCategories() {
		let response = await fetch("http://127.0.0.1:8000/api/category/");
		if (response.ok) {
			let data = await response.json();
			return data;
		} else {
			let data = [];
			return data;
		}
	}

	async function SetCategories() {
		let data = await fetchCategories();
		setCategories(data);
	}

	async function fetchMovies(category) {
		let response = await fetch(
			`http://127.0.0.1:8000/api/movies/?category=${category}`
		);
		if (response.ok) {
			let data = await response.json();
			setAllMovies(data);
		}
	}

	async function updateMovie(movie) {
		let response = await fetch("http://127.0.0.1:8000/api/history/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				movie: movie,
				username: user.username,
			}),
		});

		console.log(await response.json());
	}

	const ChangeCategory = (category) => {
		setSelectedCategory(category.toLowerCase());
	};

	useEffect(() => {
		SetCategories();
	}, []);

	useEffect(() => {
		fetchMovies(selectedCategory);
	}, [selectedCategory]);

	allMovies.map((movie) => {
		console.log(movie.title_rus);
		console.log(selectedCategory);
	});

	return (
		<section className="content__movies">
			<section
				className="categories"
				style={{
					marginTop: "70px",
				}}
			>
				<ul className="categories__list">
					{categories.map((category) => (
						<li className="categories__list-item" key={category.id}>
							<a
								// href={`/category/${category.name.toLowerCase()}`}
								className="categories__list-link"
								onClick={() => ChangeCategory(category.name)}
							>
								{category.name}
							</a>
						</li>
					))}
				</ul>
			</section>
			<section className="movies">
				<h1
					className="movies-heading"
					style={{
						textAlign: "center",
					}}
				>
					{selectedCategory.toUpperCase()}
				</h1>
				<div className="movies__container">
					{allMovies.map((movie) => (
						<Link to={`/${movie.title_original}/${movie.id}`} key={movie.id}>
							<div
								onClick={() => {
									updateMovie(movie.id);
								}}
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
										{movie.title_eng}
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>
		</section>
	);
}
