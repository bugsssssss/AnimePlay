import "./detail.css";
import { CButton } from "@coreui/react";
import { MovieContext, MovieProvider } from "../../context/movie";
import { useContext, useState } from "react";
import { Footer } from "../footer/footer";
import { Link } from "react-router-dom";

export function DetailComponent(movie) {
	const { movieDetail } = useContext(MovieContext);

	const [isFullScreen, setIsFullScreeen] = useState(false);

	function movieOn() {
		let video = document.getElementById("video");
		console.log("clicked");
		if (video?.requestFullscreen) {
			video.requestFullscreen();
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen();
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen();
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen();
		}
		let video__container = document.getElementById("video__container");
		video__container.classList.add("active");
		setIsFullScreeen(true);
	}

	document.addEventListener("keydown", function (event) {
		let video = document.getElementById("video");
		let video__container = document.getElementById("video__container");
		if (event.key === "Escape") {
			exitFullscreen();
			video__container?.classList.remove("active");
		} else if (event.code === "Space") {
			function togglePlay(video) {
				if (video.paused) {
					video.play();
				} else {
					video.pause();
				}
			}
			togglePlay(video);
		} else if (event.key === "f" || event.key === "F") {
			if (isFullScreen) {
				exitFullscreen();
			} else {
				movieOn();
			}
		}
	});

	function exitFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		setIsFullScreeen(false);
	}

	return (
		<>
			<section className="detail-page">
				<div className="detail-page__content">
					<div
						className="collections__movies-item"
						style={{
							backgroundImage: `url(http://127.0.0.1:8000${movie.movie.picture})`,
							marginBottom: "20px",
							// "&:hover": {
							// 	transform: "scale(0)",
							// 	cursor: "pointer",
							// },
						}}
					></div>
					<h1>{movie.movie.title_eng}</h1>
					<h4>{movie.movie.title_rus}</h4>
					<h4>{movie.movie.title_original}</h4>
					<div className="additional_info">
						<span>
							Year: <b>{movie.movie.created}</b>
						</span>
						<span>
							Country: <b>{movie.movie.country}</b>
						</span>

						<span>
							Age: <b>{movie.movie.age}+</b>
						</span>
					</div>

					<div className="rating">
						<span>
							IMDB: <b>{movie.movie.ratingIMDB}</b>
						</span>
						<span>
							KP: <b> {movie.movie.ratingKP}</b>
						</span>
					</div>
					<span style={{}}>
						Genres:
						<br />
						{movie.movie.genres.map((genre) => {
							return <b key={genre}>{genre} </b>;
						})}
					</span>
					<div className="description">
						<span>Description: </span>
						<p>
							<b>{movie.movie.description}</b>
						</p>
					</div>

					<span>Directors:</span>
					<div
						className="directors__list"
						style={{
							listStyle: "none",
							display: "flex",
							alignItems: "center",
							gap: "20px",
							margin: "15px 0",
						}}
					>
						{movie.movie.directors.map((director) => {
							return (
								<Link
									key={director.id}
									style={{
										textDecoration: "none",
										color: "#fff",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											flexDirection: "column",
											gap: "10px",
											fontSize: "14px",
										}}
									>
										<div
											style={{
												backgroundImage: `url(${director.picture})`,
												backgroundSize: "cover",
												width: "75px",
												height: "100px",
												backgroundPosition: "center",
											}}
										></div>
										{director.name}
									</div>
								</Link>
							);
						})}
					</div>
					<span>Actors:</span>
					<div
						className="directors__list"
						style={{
							listStyle: "none",
							display: "flex",
							alignItems: "center",
							gap: "20px",
							margin: "15px 0",
						}}
					>
						{movie.movie.actors.map((actor) => {
							return (
								<Link
									key={actor.id}
									style={{
										textDecoration: "none",
										color: "#fff",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											flexDirection: "column",
											gap: "10px",
											fontSize: "14px",
										}}
									>
										<div
											style={{
												backgroundImage: `url(${actor.picture})`,
												backgroundSize: "cover",
												backgroundPosition: "center",
												width: "75px",
												height: "100px",
											}}
										></div>
										{actor.name}
									</div>
								</Link>
							);
						})}
					</div>
					{movie.movie.file ? (
						<button
							id="btn"
							className="watch"
							onClick={movieOn}
							style={{
								width: "155px",
								height: "auto",
								background: "none",
								border: "1px solid #fff",
							}}
							color="secondary"
							shape="rounded-0"
						>
							Watch
						</button>
					) : (
						<span
							style={{
								fontSize: "22px",
							}}
						>
							<br />
							There is no video yet
						</span>
					)}
					{movie.movie.file ? (
						<div id="video__container" className="video__container">
							<video id="video" controls>
								<source src={movie.movie.file} type="video/mp4" />
							</video>
						</div>
					) : (
						<span></span>
					)}
				</div>
			</section>
			<Footer />
		</>
	);
}
