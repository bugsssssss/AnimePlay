import "./detail.css";
import { CButton } from "@coreui/react";
import { MovieContext, MovieProvider } from "../../context/movie";
import { useContext, useEffect, useState } from "react";
import { Footer } from "../footer/footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Rating } from "../rating/rating";
import { Header } from "../header/header";

export function DetailComponent(movie) {
	const { movieDetail } = useContext(MovieContext);
	const { user } = useContext(AuthContext);
	const [comments, setComments] = useState([]);
	const [inputText, setInputText] = useState("");
	const [isFullScreen, setIsFullScreeen] = useState(false);
	const [replies, setReplies] = useState([]);
	const [replyText, setReplyText] = useState("");
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const [rating, setRating] = useState(0);
	const [selectedStars, setSelectedStars] = useState(
		localStorage.getItem(`${movie.movie.id}`) | 0
	);
	const [isRated, setIsRated] = useState(false);
	const [ratingNumber, setRatingNumber] = useState(0);

	const handleStarClick = (starCount) => {
		setSelectedStars(starCount);
	};

	localStorage.setItem("liked", false);

	const handleText = (e) => {
		setInputText(e.target.value);
	};

	const handleReplyText = (e) => {
		setReplyText(e.target.value);
	};

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
				if (video?.paused) {
					video.play();
				} else {
					video?.pause();
				}
			}
			togglePlay(video);
			// } else if (event.key === "f" || event.key === "F") {
			// 	if (isFullScreen) {
			// 		exitFullscreen();
			// 	} else {
			// 		movieOn();
			// 	}
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

	const getComments = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/reviews/?movie=${movie.movie.id}`
		);

		if (response.status == 200) {
			const data = await response.json();
			setComments(data);
		}
	};

	const sendComment = async (movie, author, text) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/reviews/?movie=${movie}&author=${author}&text=${text}`
		);

		if (response.ok) {
			getComments();
			console.log("Yaayy!");
			let reviewInput = document.getElementById("review");
			reviewInput.value = "";
		}
	};

	const getReplies = async () => {
		let response = await fetch("http://127.0.0.1:8000/api/replies/");

		if (response.ok) {
			let data = await response.json();
			setReplies(data);
		}
	};

	const toggleReply = (id) => {
		let replyBlock = document.getElementById("reply__block" + id.toString());
		console.log(replyBlock);
		replyBlock.classList.add("active");
	};

	const sendReply = async (review, author, text) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/replies/?review=${review}&text=${text}&author=${author}`
		);

		if (response.ok) {
			getComments();
			getReplies();
			console.log("OK");
			let commentInput = document.getElementById(`comment${review}`);
			commentInput.value = "";
			let replyBlock = document.getElementById(
				"reply__block" + review.toString()
			);
			replyBlock.classList.remove("active");
		}
	};

	const commentInput = document.getElementById("reviews");

	// Add an event listener to the input field
	commentInput?.addEventListener("keydown", function (event) {
		// Check if the pressed key is Enter (key code 13) and no modifier keys are pressed
		if (
			event.keyCode === "enter" &&
			!event.shiftKey &&
			!event.ctrlKey &&
			!event.altKey
		) {
			// Prevent the default behavior of Enter key
			event.preventDefault();
			// Call the function to send the comment
			sendComment(movie.movie.id, user.id, inputText);
		}
	});

	const sendLike = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/reviews/?review=${id}&like=test`
		);

		if (response.ok) {
			setLiked(true);
			getComments();
			getReplies();
			console.log("like");
		}
	};

	const sendDislike = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/reviews/?review=${id}&dislike=test`
		);

		if (response.ok) {
			setDisliked(true);
			localStorage.setItem("liked", true);
			getComments();
			getReplies();
		}
	};

	const deleteReview = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/reviews/?delete=${id}`
		);

		if (response.ok) {
			getComments();
			getReplies();
			console.log("deleted");
		}
	};

	const deleteReply = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/replies/?delete=${id}`
		);

		if (response.ok) {
			getComments();
			getReplies();
			console.log("deleted");
		}
	};

	const getRating = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/rating/?movie=${movie.movie.id}`
		);

		if (response.ok) {
			let data = await response.json();
			if (user) {
				setIsRated(data.users.includes(user.id));
			}

			if (data.data) {
				setRatingNumber(data.data.length);
			}
			setRating(data.rating);
		}
	};

	const sendRating = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/rating/?movie=${movie.movie.id}&user=${user.id}&stars=${selectedStars}`
		);

		if (response.ok) {
			getRating();
			localStorage.setItem(`${movie.movie.id}`, selectedStars);
		}
	};

	// ? Video player settingg
	//ELEMENT SELECTORS
	// var player = document.querySelector(".player");
	// var video = document.querySelector("#video");
	// var playBtn = document.querySelector(".play-btn");
	// var volumeBtn = document.querySelector(".volume-btn");
	// var volumeSlider = document.querySelector(".volume-slider");
	// var volumeFill = document.querySelector(".volume-filled");
	// var progressSlider = document.querySelector(".progress");
	// var progressFill = document.querySelector(".progress-filled");
	// var textCurrent = document.querySelector(".time-current");
	// var textTotal = document.querySelector(".time-total");
	// var speedBtns = document.querySelectorAll(".speed-item");
	// var fullscreenBtn = document.querySelector(".fullscreen");

	// //GLOBAL VARS
	// let lastVolume = 1;
	// let isMouseDown = false;

	// //PLAYER FUNCTIONS
	// function togglePlay() {
	// 	if (video?.paused) {
	// 		video?.play();
	// 	} else {
	// 		video?.pause();
	// 	}
	// 	playBtn?.classList.toggle("paused");
	// }
	// function togglePlayBtn() {
	// 	playBtn?.classList.toggle("playing");
	// }

	// function toggleMute() {
	// 	if (video.volume) {
	// 		lastVolume = video.volume;
	// 		video.volume = 0;
	// 		volumeBtn.classList.add("muted");
	// 		volumeFill.style.width = 0;
	// 	} else {
	// 		video.volume = lastVolume;
	// 		volumeBtn.classList.remove("muted");
	// 		volumeFill.style.width = `${lastVolume * 100}%`;
	// 	}
	// }
	// function changeVolume(e) {
	// 	volumeBtn.classList.remove("muted");
	// 	let volume = e.offsetX / volumeSlider.offsetWidth;
	// 	volume < 0.1 ? (volume = 0) : (volume = volume);
	// 	volumeFill.style.width = `${volume * 100}%`;
	// 	video.volume = volume;
	// 	if (volume > 0.7) {
	// 		volumeBtn.classList.add("loud");
	// 	} else if (volume < 0.7 && volume > 0) {
	// 		volumeBtn.classList.remove("loud");
	// 	} else if (volume == 0) {
	// 		volumeBtn.classList.add("muted");
	// 	}
	// 	lastVolume = volume;
	// }
	// function neatTime(time) {
	// 	// var hours = Math.floor((time % 86400)/3600)
	// 	var minutes = Math.floor((time % 3600) / 60);
	// 	var seconds = Math.floor(time % 60);
	// 	seconds = seconds > 9 ? seconds : `0${seconds}`;
	// 	return `${minutes}:${seconds}`;
	// }
	// function updateProgress(e) {
	// 	progressFill.style.width = `${(video.currentTime / video.duration) * 100}%`;
	// 	textCurrent.innerHTML = `${neatTime(video.currentTime)} / ${neatTime(
	// 		video.duration
	// 	)}`;
	// 	// textTotal.innerHTML = neatTime(video.duration);
	// 	// console.log(progressFill.style.width);
	// }
	// function setProgress(e) {
	// 	const newTime = e.offsetX / progressSlider.offsetWidth;
	// 	progressFill.style.width = `${newTime * 100}%`;
	// 	video.currentTime = newTime * video.duration;
	// }
	// function launchIntoFullscreen(element) {
	// 	if (element.requestFullscreen) {
	// 		element.requestFullscreen();
	// 	} else if (element.mozRequestFullScreen) {
	// 		element.mozRequestFullScreen();
	// 	} else if (element.webkitRequestFullscreen) {
	// 		element.webkitRequestFullscreen();
	// 	} else if (element.msRequestFullscreen) {
	// 		element.msRequestFullscreen();
	// 	}
	// }
	// function exitFullscreen() {
	// 	if (document.exitFullscreen) {
	// 		document.exitFullscreen();
	// 	} else if (document.mozCancelFullScreen) {
	// 		document.mozCancelFullScreen();
	// 	} else if (document.webkitExitFullscreen) {
	// 		document.webkitExitFullscreen();
	// 	}
	// }
	// var fullscreen = false;
	// function toggleFullscreen() {
	// 	fullscreen ? exitFullscreen() : launchIntoFullscreen(player);
	// 	fullscreen = !fullscreen;
	// }
	// function setSpeed(e) {
	// 	console.log(parseFloat(this.dataset.speed));
	// 	video.playbackRate = this.dataset.speed;
	// 	speedBtns.forEach((speedBtn) => speedBtn.classList.remove("active"));
	// 	this.classList.add("active");
	// }
	// function handleKeypress(e) {
	// 	switch (e.key) {
	// 		case " ":
	// 			togglePlay();
	// 		case "ArrowRight":
	// 			if (video) {
	// 				video.currentTime += 5;
	// 			}
	// 		case "ArrowLeft":
	// 			if (video) {
	// 				video.currentTime -= 5;
	// 			}
	// 		default:
	// 			return;
	// 	}
	// }
	// //EVENT LISTENERS
	// playBtn?.addEventListener("click", togglePlay);
	// video?.addEventListener("click", togglePlay);
	// video?.addEventListener("play", togglePlayBtn);
	// video?.addEventListener("pause", togglePlayBtn);
	// video?.addEventListener("ended", togglePlayBtn);
	// video?.addEventListener("timeupdate", updateProgress);
	// video?.addEventListener("canplay", updateProgress);
	// volumeBtn?.addEventListener("click", toggleMute);
	// window.addEventListener("mousedown", () => (isMouseDown = true));
	// window.addEventListener("mouseup", () => (isMouseDown = false));
	// // volumeSlider.addEventListener('mouseover', changeVolume);
	// volumeSlider?.addEventListener("click", changeVolume);
	// progressSlider?.addEventListener("click", setProgress);
	// fullscreenBtn?.addEventListener("click", toggleFullscreen);
	// speedBtns?.forEach((speedBtn) => {
	// 	speedBtn.addEventListener("click", setSpeed);
	// });
	// window.addEventListener("keydown", handleKeypress);

	useEffect(() => {
		getComments();
		getRating();
		getReplies();
	}, []);

	return (
		<>
			<section
				className="detail-page"
				style={{
					zIndex: "100",
				}}
			>
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
					<h1
						style={{
							margin: "10px 0",
						}}
					>
						{movie.movie.title_eng}
					</h1>
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
						<span>
							AP: <b>{rating}</b> ({ratingNumber})
						</span>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
						}}
					>
						{user ? (
							<div
								style={{
									margin: "10px 0",
								}}
							>
								<h4
									style={{
										marginBottom: "10px",
									}}
								>
									Star Rating: {selectedStars} stars
								</h4>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
									}}
								>
									{isRated ? (
										<div
											style={{
												fontSize: "20px",
											}}
											title="You have already rated"
										>
											{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starCount) => (
												<span
													key={starCount}
													style={{
														cursor: "not-allowed",
														color: starCount <= selectedStars ? "gold" : "gray",
													}}
													// onClick={() => handleStarClick(starCount)}
												>
													&#9733;
												</span>
											))}
										</div>
									) : (
										<div
											style={{
												fontSize: "20px",
											}}
										>
											{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starCount) => (
												<span
													key={starCount}
													style={{
														cursor: "pointer",
														color: starCount <= selectedStars ? "gold" : "gray",
													}}
													onClick={() => handleStarClick(starCount)}
												>
													&#9733;
												</span>
											))}
										</div>
									)}
									{isRated ? (
										<span
											title="You have already rated"
											style={{
												fontSize: "18px",
												padding: "0 12px",
												border: "1px solid #fff",
												cursor: "not-allowed",
											}}
											// onClick={() => {
											// 	sendRating();
											// }}
										>
											Rate
										</span>
									) : (
										<span
											style={{
												fontSize: "18px",
												padding: "0 12px",
												border: "1px solid #fff",
												cursor: "pointer",
											}}
											onClick={() => {
												sendRating();
											}}
										>
											Rate
										</span>
									)}
								</div>
							</div>
						) : (
							<></>
						)}
						<span style={{}}>
							Genres:
							<br />
							{movie.movie.genres.map((genre) => {
								return <b key={genre}>{genre} </b>;
							})}
						</span>
					</div>
					<div
						className="description"
						style={{
							marginTop: "10px",
						}}
					>
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
							PLAY
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
						// <div className="player-container">
						// 	<div className="player">
						// 		<video
						// 			id="video"
						// 			src={movie.movie.file}
						// 			autoPlay
						// 			playsInline
						// 		></video>
						// 		<div className="play-btn-big"></div>
						// 		<div className="controls">
						// 			<div className="time">
						// 				<span className="time-current"></span>
						// 				<span className="time-total"></span>
						// 			</div>
						// 			<div className="progress">
						// 				<div className="progress-filled"></div>
						// 			</div>
						// 			<div className="controls-main">
						// 				<div className="controls-left">
						// 					<div className="volume">
						// 						<div className="volume-btn loud">
						// 							<svg
						// 								width="26"
						// 								height="24"
						// 								viewBox="0 0 26 24"
						// 								fill="none"
						// 								xmlns="http://www.w3.org/2000/svg"
						// 							>
						// 								<path
						// 									d="M6.75497 17.6928H2C0.89543 17.6928 0 16.7973 0 15.6928V8.30611C0 7.20152 0.895431 6.30611 2 6.30611H6.75504L13.9555 0.237289C14.6058 -0.310807 15.6 0.151473 15.6 1.00191V22.997C15.6 23.8475 14.6058 24.3098 13.9555 23.7617L6.75497 17.6928Z"
						// 									transform="translate(0 0.000518799)"
						// 									fill="white"
						// 								/>
						// 								<path
						// 									id="volume-low"
						// 									d="M0 9.87787C2.87188 9.87787 5.2 7.66663 5.2 4.93893C5.2 2.21124 2.87188 0 0 0V2C1.86563 2 3.2 3.41162 3.2 4.93893C3.2 6.46625 1.86563 7.87787 0 7.87787V9.87787Z"
						// 									transform="translate(17.3333 7.44955)"
						// 									fill="white"
						// 								/>

						// 								<path
						// 									id="volume-high"
						// 									d="M0 16.4631C4.78647 16.4631 8.66667 12.7777 8.66667 8.23157C8.66667 3.68539 4.78647 0 0 0V2C3.78022 2 6.66667 4.88577 6.66667 8.23157C6.66667 11.5773 3.78022 14.4631 0 14.4631V16.4631Z"
						// 									transform="translate(17.3333 4.15689)"
						// 									fill="white"
						// 								/>
						// 								<path
						// 									id="volume-off"
						// 									d="M1.22565 0L0 1.16412L3.06413 4.0744L0 6.98471L1.22565 8.14883L4.28978 5.23853L7.35391 8.14883L8.57956 6.98471L5.51544 4.0744L8.57956 1.16412L7.35391 0L4.28978 2.91031L1.22565 0Z"
						// 									transform="translate(17.3769 8.31403)"
						// 									fill="white"
						// 								/>
						// 							</svg>
						// 						</div>
						// 						<div className="volume-slider">
						// 							<div className="volume-filled"></div>
						// 						</div>
						// 					</div>
						// 				</div>
						// 				<div className="play-btn paused"></div>
						// 				<div className="controls-right">
						// 					<div className="speed">
						// 						<ul className="speed-list">
						// 							<li className="speed-item" data-speed="0.5">
						// 								0.5x
						// 							</li>
						// 							<li className="speed-item" data-speed="0.75">
						// 								0.75x
						// 							</li>
						// 							<li className="speed-item active" data-speed="1">
						// 								1x
						// 							</li>
						// 							<li className="speed-item" data-speed="1.5">
						// 								1.5x
						// 							</li>
						// 							<li className="speed-item" data-speed="2">
						// 								2x
						// 							</li>
						// 						</ul>
						// 					</div>
						// 					<svg className="fullscreen">
						// 						<svg
						// 							width="30"
						// 							height="22"
						// 							viewBox="0 0 30 22"
						// 							fill="none"
						// 							xmlns="http://www.w3.org/2000/svg"
						// 						>
						// 							<path
						// 								d="M0 0V-1.5H-1.5V0H0ZM0 18H-1.5V19.5H0V18ZM26 18V19.5H27.5V18H26ZM26 0H27.5V-1.5H26V0ZM1.5 6.54545V0H-1.5V6.54545H1.5ZM0 1.5H10.1111V-1.5H0V1.5ZM-1.5 11.4545V18H1.5V11.4545H-1.5ZM0 19.5H10.1111V16.5H0V19.5ZM24.5 11.4545V18H27.5V11.4545H24.5ZM26 16.5H15.8889V19.5H26V16.5ZM27.5 6.54545V0H24.5V6.54545H27.5ZM26 -1.5H15.8889V1.5H26V-1.5Z"
						// 								transform="translate(2 2)"
						// 								fill="white"
						// 							/>
						// 						</svg>
						// 					</svg>
						// 				</div>
						// 			</div>
						// 		</div>
						// 	</div>
						// </div>
						<div id="video__container" className="video__container">
							<video id="video" controls>
								<source src={movie.movie.file} type="video/mp4" />
							</video>
						</div>
					) : (
						<span></span>
					)}
					{user ? (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								marginTop: "50px",
							}}
						>
							<label htmlFor="review">Leave your comment:</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "10px",
								}}
							>
								<input
									style={{
										outline: "none",
										padding: "6px 8px",
										width: "90%",
									}}
									type="text"
									name="review"
									className="transparent"
									id="review"
									onChange={handleText}
								/>
								<img
									src="../paper-plane.png"
									alt=""
									style={{
										width: "30px",
										height: "25px",
										cursor: "pointer",
									}}
									onClick={() => {
										sendComment(movie.movie.id, user.id, inputText);
									}}
								/>
							</div>
						</div>
					) : (
						<h5
							style={{
								margin: "40px 0 0 0",
							}}
						>
							<span>If you want to leave a comment </span>
							<Link
								to="/login"
								style={{
									textDecoration: "none",
									color: "#fff",
									borderBottom: "1px solid #fff",
								}}
							>
								log in
							</Link>
						</h5>
					)}
					{comments ? (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								fontWeight: "600",
							}}
						>
							<h3
								style={{
									marginTop: "30px",
								}}
							>
								Comments:
							</h3>
							{comments.map((comment) => {
								return (
									<div
										style={{
											padding: "8px 2px",
											position: "relative",
											width: "70%",
											minHeight: "120px",
											// border: "1px solid #fff",
											marginBottom: "15px",
										}}
										key={comment.id}
									>
										<div
											style={{
												// position: "absolute",
												top: 0,
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												width: "100%",
												padding: "8px 12px",
											}}
										>
											{comment.author.is_admin == true ? (
												<div
													style={{
														display: "flex",
														gap: "10px",
														alignItems: "center",
													}}
												>
													<Link
														to={`/user/${comment.author.username}/${comment.author.id}`}
													>
														<div
															style={{
																width: "60px",
																height: "60px",
																backgroundImage: `url(${comment.author.picture})`,
																backgroundPosition: "center",
																backgroundSize: "cover",
																borderRadius: "50%",
																border: "3px solid gold",
															}}
														></div>
													</Link>
													<span style={{ color: "gold" }}>
														{comment.author.username}
													</span>
												</div>
											) : (
												<div
													style={{
														display: "flex",
														gap: "10px",
														alignItems: "center",
													}}
												>
													<Link
														to={`/user/${comment.author.username}/${comment.author.id}`}
													>
														<div
															style={{
																width: "60px",
																height: "60px",
																backgroundImage: `url(http://127.0.0.1:8000${comment.author.picture})`,
																backgroundPosition: "center",
																backgroundSize: "cover",
																borderRadius: "50%",
															}}
														></div>
													</Link>
													<span>{comment.author.username}</span>
												</div>
											)}
											<span>{comment.created}</span>
										</div>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
											}}
										>
											<div
												style={{
													// position: "absolute",
													bottom: "0",
													padding: "8px 12px",
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													width: "100%",
												}}
											>
												{comment.author.is_admin ? (
													<span
														style={{
															width: "80%",
															color: "gold",
														}}
													>
														<b>{comment.text}</b>
													</span>
												) : (
													<span
														style={{
															width: "80%",
														}}
													>
														<b>{comment.text}</b>
													</span>
												)}

												{user ? (
													<div
														style={{
															display: "flex",
															alignItems: "center",
															gap: "15px",
														}}
													>
														{liked |
														disliked |
														(user.id == comment.author.id) ? (
															<>
																<div
																	style={{
																		display: "flex",
																		// alignItems: "center",
																		gap: "5px",
																	}}
																>
																	{comment.likes}
																	<img
																		style={{
																			width: "20px",
																			height: "18px",
																			cursor: "pointer",
																		}}
																		src="../like_disabled.png"
																		alt=""
																	/>
																</div>
																<div
																	style={{
																		display: "flex",
																		alignItems: "center",
																		gap: "5px",
																	}}
																>
																	{comment.dislikes}
																	<img
																		style={{
																			width: "20px",
																			height: "18px",
																			cursor: "pointer",
																		}}
																		src="../dislike_disabled.png"
																		alt=""
																	/>
																</div>
															</>
														) : (
															<>
																<div
																	style={{
																		display: "flex",
																		// alignItems: "center",
																		gap: "5px",
																	}}
																>
																	{comment.likes}
																	<img
																		style={{
																			width: "20px",
																			height: "18px",
																			cursor: "pointer",
																		}}
																		src="../like.png"
																		alt=""
																		onClick={() => {
																			sendLike(comment.id, "test");
																		}}
																	/>
																</div>
																<div
																	style={{
																		display: "flex",
																		alignItems: "center",
																		gap: "5px",
																	}}
																>
																	{comment.dislikes}
																	<img
																		style={{
																			width: "20px",
																			height: "18px",
																			cursor: "pointer",
																		}}
																		src="../dislike.png"
																		alt=""
																		onClick={() => {
																			sendDislike(comment.id, "test");
																		}}
																	/>
																</div>
															</>
														)}
														{user?.is_admin ? (
															<img
																style={{
																	width: "22px",
																	cursor: "pointer",
																}}
																src="../trash.png"
																alt=""
																onClick={() => {
																	deleteReview(comment.id);
																}}
															/>
														) : (
															<></>
														)}
														<div
															style={{
																cursor: "pointer",
															}}
															onClick={() => {
																toggleReply(comment.id);
															}}
														>
															<img
																style={{
																	width: "22px",
																}}
																src="../reply.png"
																alt=""
															/>
														</div>
													</div>
												) : (
													<span></span>
												)}
											</div>
											<div
												className="replies__block"
												style={{
													padding: "10px 0 10px 40px",
												}}
											>
												{replies.map((reply) =>
													reply.review == comment.id ? (
														<div key={reply.id}>
															<div
																style={{
																	// position: "absolute",
																	top: 0,
																	display: "flex",
																	justifyContent: "space-between",
																	alignItems: "center",
																	width: "100%",
																	padding: "8px 12px",
																}}
															>
																{reply.author.is_admin == true ? (
																	<div
																		style={{
																			display: "flex",
																			gap: "10px",
																			alignItems: "center",
																		}}
																	>
																		<Link
																			to={`/user/${comment.author.username}/${comment.author.id}`}
																		>
																			<div
																				style={{
																					width: "60px",
																					height: "60px",
																					backgroundImage: `url(http://127.0.0.1:8000${reply.author.picture})`,
																					backgroundPosition: "center",
																					backgroundSize: "cover",
																					borderRadius: "50%",
																					border: "3px solid gold",
																				}}
																			></div>
																		</Link>
																		<span style={{ color: "gold" }}>
																			{reply.author.username}
																		</span>
																	</div>
																) : (
																	<div
																		style={{
																			display: "flex",
																			gap: "10px",
																			alignItems: "center",
																		}}
																	>
																		<Link
																			to={`/user/${comment.author.username}/${comment.author.id}`}
																		>
																			<div
																				style={{
																					width: "60px",
																					height: "60px",
																					backgroundImage: `url(http://127.0.0.1:8000${reply.author.picture})`,
																					backgroundPosition: "center",
																					backgroundSize: "cover",
																					borderRadius: "50%",
																				}}
																			></div>
																		</Link>
																		<span>{reply.author.username}</span>
																	</div>
																)}
																<span>{reply.created}</span>
															</div>
															{reply.author.is_admin ? (
																<div
																	style={{
																		padding: "10px 0px 10px 13px",
																		color: "gold",
																		display: "flex",
																		justifyContent: "space-between",
																	}}
																>
																	<div>
																		<b>{reply.text}</b>
																	</div>
																	{user?.is_admin ? (
																		<img
																			style={{
																				width: "22px",
																				height: "22px",
																				cursor: "pointer",
																			}}
																			src="../trash.png"
																			alt=""
																			onClick={() => {
																				deleteReply(reply.id);
																			}}
																		/>
																	) : (
																		<></>
																	)}
																</div>
															) : (
																<div
																	style={{
																		padding: "10px 0px 10px 15px",
																		display: "flex",
																		justifyContent: "space-between",
																	}}
																>
																	<div>
																		<b>{reply.text}</b>
																	</div>
																	{user?.is_admin ? (
																		<img
																			style={{
																				width: "22px",
																				height: "22px",
																				cursor: "pointer",
																			}}
																			src="../trash.png"
																			alt=""
																			onClick={() => {
																				deleteReply(reply.id);
																			}}
																		/>
																	) : (
																		<></>
																	)}
																</div>
															)}
														</div>
													) : (
														<span></span>
													)
												)}
											</div>
											<div
												className="reply__block"
												id={`reply__block${comment.id}`}
												style={{
													display: "flex",
													alignItems: "center",
													gap: "10px",
													// position: "absolute",
													padding: "0 12px",
													bottom: "-45px",
													display: "none",
													width: "100%",
												}}
											>
												<input
													style={{
														outline: "none",
														padding: "6px 8px",
														width: "90%",
													}}
													type="text"
													name="reply"
													className="reply transparent"
													id={comment.id ? `comment${comment.id}` : ""}
													onChange={handleReplyText}
												/>
												<img
													src="../paper-plane.png"
													alt=""
													style={{
														width: "30px",
														height: "25px",
														cursor: "pointer",
													}}
													onClick={() => {
														sendReply(comment.id, user.id, replyText);
													}}
												/>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<h3>No comments yet</h3>
					)}
				</div>
				<div
					className="favourites"
					style={{
						display: "flex",
						gap: "5px",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						padding: "8px 10px",
						border: "1px solid #fff",
						width: "200px",
					}}
				>
					<img
						src="../star.png"
						style={{
							width: "22px",
							height: "22px",
						}}
						alt=""
					/>
					<span>Add to favourites</span>
				</div>
			</section>
			<Footer />
		</>
	);
}
