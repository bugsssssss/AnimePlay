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
	const [selectedStars, setSelectedStars] = useState(0);
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

	const sendLike = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/reviews/?review=${id}&like=test`
		);

		if (response.ok) {
			setLiked(true);
			localStorage.setItem("liked", true);
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
		}
	};

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
													<div
														style={{
															width: "60px",
															height: "60px",
															backgroundImage: `url(${comment.author.picture})`,
															backgroundPosition: "center",
															backgroundSize: "cover",
															borderRadius: "50%",
														}}
													></div>
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
																		<div
																			style={{
																				width: "60px",
																				height: "60px",
																				backgroundImage: `url(${reply.author.picture})`,
																				backgroundPosition: "center",
																				backgroundSize: "cover",
																				borderRadius: "50%",
																				border: "3px solid gold",
																			}}
																		></div>
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
																		<div
																			style={{
																				width: "60px",
																				height: "60px",
																				backgroundImage: `url(${reply.author.picture})`,
																				backgroundPosition: "center",
																				backgroundSize: "cover",
																				borderRadius: "50%",
																			}}
																		></div>
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
			</section>
			<Footer />
		</>
	);
}
