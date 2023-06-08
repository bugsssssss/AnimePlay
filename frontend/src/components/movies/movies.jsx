import "../categories/categories.css";
import { Link } from "react-router-dom";

export function Movies({ movies }) {
	if (movies) {
		return (
			<div className="movies__container">
				{movies.map((movie) => (
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
							<div className="movie__container-item-wrapper">
								{/* <span className="movie__container_item-title">
									{movie.title_original}
								</span> */}
							</div>
						</div>
					</Link>
				))}
			</div>
		);
	} else {
		return <h1>Not found</h1>;
	}
}
