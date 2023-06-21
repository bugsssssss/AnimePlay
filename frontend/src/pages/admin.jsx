import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export const Admin = () => {
	const [category, setCategory] = useState("feedbacks");
	const [feedbacks, setFeedbacks] = useState([]);
	const [feedbackStatus, setFeedbackStatus] = useState("all");
	const [text, setText] = useState("");
	const [reviewReplyText, setreviewReplyText] = useState("");
	const [sent, setSent] = useState("");
	const [reviews, setReviews] = useState([]);
	const [collections, setCollections] = useState([]);
	const [editing, setEditing] = useState(false);
	const [collectionName, setCollectionName] = useState("");
	const [isAdding, setIsAdding] = useState(false);
	const [allMovies, setAllMovies] = useState([]);
	const [chosenMovies, setChosenMovies] = useState([]);
	const [collectionPosition, setCollectionPosition] = useState(1);
	const [newCollectionName, setNewCollectionName] = useState("");
	const [news, setNews] = useState([]);
	const [users, setUsers] = useState([]);
	const [newsAuthor, setNewsAuthor] = useState("all");
	const [isNewsEditing, setIsNewsEditing] = useState(false);
	const [editingNewsObject, setEditingNewsObject] = useState({});

	localStorage.setItem("chosenMovies", chosenMovies);

	const { user } = useContext(AuthContext);

	const handleClick = (category) => {
		let feedbacksItem = document.getElementById("feedback-item");
		let reviewItem = document.getElementById("review-item");
		let collectionItem = document.getElementById("collection-item");
		let newsItem = document.getElementById("news-item");
		let usersItem = document.getElementById("users-item");

		setCategory(category);

		if (category == "feedbacks") {
			feedbacksItem.classList.add("active");
			reviewItem.classList.remove("active");
			collectionItem.classList.remove("active");
			newsItem.classList.remove("active");
			usersItem.classList.remove("active");
		} else if (category == "reviews") {
			feedbacksItem.classList.remove("active");
			reviewItem.classList.add("active");
			collectionItem.classList.remove("active");
			newsItem.classList.remove("active");
			usersItem.classList.remove("active");
		} else if (category == "collections") {
			feedbacksItem.classList.remove("active");
			reviewItem.classList.remove("active");
			collectionItem.classList.add("active");
			newsItem.classList.remove("active");
			usersItem.classList.remove("active");
		} else if (category == "news") {
			feedbacksItem.classList.remove("active");
			reviewItem.classList.remove("active");
			collectionItem.classList.remove("active");
			newsItem.classList.add("active");
			usersItem.classList.remove("active");
		} else if (category == "users") {
			feedbacksItem.classList.remove("active");
			reviewItem.classList.remove("active");
			collectionItem.classList.remove("active");
			newsItem.classList.remove("active");
			usersItem.classList.add("active");
		}
	};

	const getFeedbacks = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/myfeedbacks/?username=all&status=${feedbackStatus}`
		);
		if (response.status === 200) {
			const data = await response.json();
			setFeedbacks(data);
		}
	};

	const handleChange = (e) => {
		let status = e.target.value;
		setFeedbackStatus(status);
	};

	const handleText = (e) => {
		setText(e.target.value);
		console.log(text);
	};

	const handleReviewReply = (e) => {
		setreviewReplyText(e.target.value);
	};

	const newCollection = (e) => {
		setNewCollectionName(e.target.value);
	};

	const replyMessage = async (id, text) => {
		setSent(text);
		let response = await fetch(
			`http://127.0.0.1:8000/api/myfeedbacks/?id=${id}&response=${text}`
		);

		if (response.ok) {
			getFeedbacks();
		}
	};

	const getReviews = async () => {
		let response = await fetch(`http://127.0.0.1:8000/api/reviews/?author=all`);

		if (response.ok) {
			let data = await response.json();
			setReviews(data);
		}
	};
	const sendReply = async (review, author, text) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/replies/?review=${review}&text=${text}&author=${author}`
		);

		if (response.ok) {
			getReviews();
			let inpt = document.getElementById(`review_reply${review}`);
			inpt.classList.remove("active");
			console.log("OK");
		}
	};

	const deleteReview = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/reviews/?delete=${id}`
		);

		if (response.ok) {
			getReviews();
		}
	};

	const deleteFeedback = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/feedbacks/?delete=${id}`
		);

		if (response.ok) {
			getFeedbacks();
		}
	};

	const getCollectiions = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/collections-detail/?user=${id}`
		);

		if (response.ok) {
			let data = await response.json();
			setCollections(data);
		}
	};

	const toggleEdit = (id) => {
		setEditing(true);
		let newName = document.getElementById(`collection_name${id}`);
		let oldName = document.getElementById(`collection_old${id}`);
		let saveImg = document.getElementById(`save-img${id}`);
		let editImg = document.getElementById(`edit-img${id}`);

		newName.classList.add("active");
		oldName.classList.remove("active");
		editImg.classList.remove("active");
		saveImg.classList.add("active");
	};

	const toggleInput = (id) => {
		let inpt = document.getElementById(`review_reply${id}`);
		inpt.classList.add("active");
	};

	const handleCollectionName = (e) => {
		let name = e.target.value;
		setCollectionName(name);
	};

	const sendNewName = async (id, name) => {
		setEditing(true);
		let newName = document.getElementById(`collection_name${id}`);
		let oldName = document.getElementById(`collection_old${id}`);
		let saveImg = document.getElementById(`save-img${id}`);
		let editImg = document.getElementById(`edit-img${id}`);

		let response = await fetch(
			`http://127.0.0.1:8000/api/collections-detail/?collection=${id}&name=${name}`
		);

		if (response.ok) {
			getCollectiions("all");
		}

		newName.classList.remove("active");
		oldName.classList.add("active");
		editImg.classList.add("active");
		saveImg.classList.remove("active");
	};

	const deleteCollection = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/collections-detail/?delete=${id}`
		);

		if (response.ok) {
			getCollectiions("all");
		}
	};

	async function fetchMovies(category) {
		let response = await fetch(
			`http://127.0.0.1:8000/api/movies/?category=${category}`
		);
		if (response.ok) {
			let data = await response.json();
			setAllMovies(data);
		}
	}

	const handleIsAdding = () => {
		setIsAdding(true);
		fetchMovies("all");
	};

	const handleNewСollectionName = (e) => {
		setNewCollectionName(e.target.value);
	};

	const handleChosenMovies = (id) => {
		if (!chosenMovies.includes(id)) {
			const updatedChosenMovies = [...chosenMovies, id];
			setChosenMovies(updatedChosenMovies);
		} else {
			alert("Already chosen");
		}

		console.log(chosenMovies);
	};

	const handlePosition = (e) => {
		setCollectionPosition(e.target.value);
	};

	const sendCategory = async (name, position, author, movies) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/collections-detail/?movies=${movies}&name=${name}&position=${position}&user=${author}`
		);

		if (response.ok) {
			getCollectiions("all");
			setIsAdding(false);
		}
	};

	const getNews = async (author) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-detail/?author=${author}`
		);

		if (response.ok) {
			let data = await response.json();
			setNews(data);
		}
	};

	const fetchUsers = async () => {
		let response = await fetch(`http://127.0.0.1:8000/api/users/`);

		if (response.ok) {
			let data = await response.json();
			setUsers(data);
		}
	};

	const deleteNews = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-detail/?delete=${id}`
		);

		if (response.ok) {
			getNews("all");
		}
	};

	const handleAuthor = (e) => {
		setNewsAuthor(e.target.value);
	};

	const handleIsNewsEditing = (id, author, intro, title, time) => {
		setIsNewsEditing(true);
		setEditingNewsObject({
			id: id,
			author: author,
			intro: intro,
			title: title,
			time: time,
		});
		console.log(editingNewsObject);
	};

	const handleCancel = () => {
		setIsNewsEditing(false);
		setEditingNewsObject({});
		console.log("cancel");
	};

	const handleNewsPicture = (e) => {
		editingNewsObject.picture = e.target.value;
	};
	const handleNewsIntro = (e) => {
		editingNewsObject.intro = e.target.value;
	};
	const handleNewsTitle = (e) => {
		editingNewsObject.title = e.target.value;
	};

	const sendChanges = async (id, intro, title, picture) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-detail/?edit=${id}&intro=${intro}&title=${title}&picture=${picture}`
		);

		if (response.status === 200) {
			setIsNewsEditing(false);
			getNews("all");
		}
	};

	useEffect(() => {
		getNews(newsAuthor);
	}, [newsAuthor]);

	useEffect(() => {
		console.log(collectionPosition);
	}, [collectionPosition]);

	useEffect(() => {
		if (category == "feedbacks") {
			getFeedbacks();
			let feedbacksItem = document.getElementById("feedback-item");
			feedbacksItem.classList.add("active");

			console.log(feedbacks);
		} else if (category == "reviews") {
			getReviews();
		} else if (category == "collections") {
			getCollectiions("all");
		} else if (category == "news") {
			getNews("all");
			fetchUsers();
			console.log(users);
		} else if (category == "users") {
			// if (!users) {
			fetchUsers();
			console.log(users);
			// }
		}
	}, [category]);

	useEffect(() => {
		getFeedbacks();
	}, [feedbackStatus]);

	useEffect(() => {
		getFeedbacks();
	}, [sent]);

	return (
		<section
			className="admin"
			style={{
				maxWidth: "1140px",
				margin: "100px auto 200px auto",
				color: "#fff",
				position: "relative",
			}}
		>
			<ul
				className="categories__list"
				style={{
					marginBottom: "50px",
				}}
			>
				<li className="categories__list-item" id="feedback-item">
					<Link
						onClick={() => {
							handleClick("feedbacks");
						}}
					>
						Feedbacks
					</Link>
				</li>
				<li className="categories__list-item" id="review-item">
					<Link
						onClick={() => {
							handleClick("reviews");
						}}
					>
						Reviews
					</Link>
				</li>
				<li className="categories__list-item" id="collection-item">
					<Link
						onClick={() => {
							handleClick("collections");
						}}
					>
						Collections
					</Link>
				</li>
				<li className="categories__list-item" id="news-item">
					<Link
						onClick={() => {
							handleClick("news");
						}}
					>
						News
					</Link>
				</li>
				<li className="categories__list-item" id="users-item">
					<Link
						onClick={() => {
							handleClick("users");
						}}
					>
						Users
					</Link>
				</li>
			</ul>
			{category == "feedbacks" ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<h3>Show: </h3>
						<select
							name="status"
							id="status"
							style={{
								height: "30px",
								background: "transparent",
								border: "1px solid #fff",
								color: "#fff",
								padding: "0 7px",
							}}
							onChange={handleChange}
						>
							<option value="all">All</option>
							<option value="opened">Opened</option>
							<option value="answered">Answered</option>
						</select>
					</div>

					{feedbacks ? (
						feedbacks.map((feedback) => {
							return (
								<div
									className="feedback-item"
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "column",
										padding: "10px 12px",
										border: "1px solid #fff",
										position: "relative",
									}}
									key={feedback.id}
								>
									<span>Subject: {feedback.subject}</span>
									<span>User: {feedback.username}</span>
									<span>Text: {feedback.text}</span>
									<span>Status: {feedback.status}</span>
									<span>Created: {feedback?.created.date}</span>
									<span>At: {feedback?.created.time}</span>
									<span
										style={{
											padding: "8px 12px",
											cursor: "pointer",
											position: "absolute",
											right: "10px",
										}}
										onClick={() => {
											deleteFeedback(feedback.id);
										}}
									>
										DELETE
									</span>
									{feedback.status == "opened" ? (
										<>
											<label htmlFor="answer">Reply: </label>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													gap: "10px",
													marginTop: "5px",
												}}
											>
												<input
													type="text"
													name="answer"
													style={{
														outline: "none",
														padding: "2px 8px",
														width: "100%",
													}}
													// className="transparent"
													onChange={handleText}
												/>
												<img
													src="./paper-plane.png"
													alt=""
													style={{
														width: "30px",
														height: "25px",
														cursor: "pointer",
													}}
													onClick={() => {
														replyMessage(feedback.id, text);
													}}
												/>
											</div>
										</>
									) : (
										<span>Response: {feedback.response}</span>
									)}
								</div>
							);
						})
					) : (
						<span></span>
					)}
				</div>
			) : (
				<span></span>
			)}
			{category == "reviews" ? (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "30px",
						}}
					>
						{reviews.map((review) => {
							return (
								<div
									key={review.id}
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "5px",
										border: "1px solid #fff",
										padding: "12px 16px",
									}}
								>
									<Link to={`/${review.movie.title}/${review.movie.id}`}>
										<div
											style={{
												backgroundImage: `url(http://127.0.0.1:8000${review.movie.picture})`,
												position: "relative",
												backgroundSize: "cover",
												backgroundPosition: "center",
												backgroundRepeat: "no-repeat",
												transition: "0.5s",
												color: "#fff",
												width: "75px",
												height: "100px",
											}}
										></div>
									</Link>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "5px",
										}}
									>
										<span>Username: {review.author.username}</span>
										<span>Text: {review.text}</span>
										<span>Created: {review.created}</span>
									</div>

									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: "10px",
										}}
									>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "5px",
											}}
										>
											{review.likes}
											<img
												style={{
													width: "20px",
												}}
												src="../like.png"
												alt=""
											/>
										</div>
										<div
											style={{
												display: "flex",
												gap: "5px",
											}}
										>
											{review.dislikes}
											<img
												style={{
													width: "20px",
												}}
												src="../dislike.png"
												alt=""
											/>
										</div>
										<span
											style={{
												padding: "8px 12px",
												cursor: "pointer",
											}}
											onClick={() => {
												toggleInput(review.id);
											}}
										>
											REPLY
										</span>
										<span
											style={{
												padding: "8px 12px",
												cursor: "pointer",
											}}
											onClick={() => {
												deleteReview(review.id);
											}}
										>
											DELETE
										</span>
									</div>
									<div
										style={{
											display: "none",
										}}
										className="review_reply"
										id={`review_reply${review.id}`}
									>
										<label htmlFor="review_answer">Reply: </label>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "10px",
												marginTop: "5px",
											}}
										>
											<input
												type="text"
												name="review_answer"
												style={{
													outline: "none",
													padding: "2px 8px",

													width: "100%",
												}}
												// className="transparent"
												onChange={handleReviewReply}
											/>
											<img
												src="./paper-plane.png"
												alt=""
												style={{
													width: "30px",
													height: "25px",
													cursor: "pointer",
												}}
												onClick={() => {
													sendReply(review.id, user.id, reviewReplyText);
												}}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<span></span>
			)}

			{category == "collections" ? (
				isAdding ? (
					<div
						style={{
							position: "relative",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								alignItems: "center",
								marginBottom: "30px",
							}}
						>
							<label
								style={{
									fontSize: "18px",
								}}
								htmlFor="name"
							>
								Name of the collection:
							</label>
							<input
								style={{
									width: "50%",
									outline: "none",
									padding: "0 8px",
								}}
								type="text"
								name="name"
								id="name"
								onChange={handleNewСollectionName}
							/>
						</div>
						<div>
							<span
								style={{
									fontSize: "18px",
									textAlign: "center",
									display: "block",
								}}
							>
								Choose movies to add:
							</span>
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "5px",
								}}
							>
								{allMovies.map((movie) => {
									return (
										<>
											{chosenMovies.includes(movie.id) ? (
												<div
													style={{
														backgroundImage: `url(http://127.0.0.1:8000${movie.picture})`,
														position: "relative",
														backgroundSize: "cover",
														backgroundPosition: "center",
														backgroundRepeat: "no-repeat",
														transition: "0.5s",
														color: "#fff",
														width: "175px",
														height: "220px",
														cursor: "pointer",
														opacity: "0.3",
													}}
													onClick={() => {
														handleChosenMovies(movie.id);
													}}
												></div>
											) : (
												<div
													style={{
														backgroundImage: `url(http://127.0.0.1:8000${movie.picture})`,
														position: "relative",
														backgroundSize: "cover",
														backgroundPosition: "center",
														backgroundRepeat: "no-repeat",
														transition: "0.5s",
														color: "#fff",
														width: "175px",
														height: "220px",
														cursor: "pointer",
													}}
													onClick={() => {
														handleChosenMovies(movie.id);
													}}
												></div>
											)}
										</>
									);
								})}
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								alignItems: "center",
								marginBottom: "30px",
							}}
						>
							<label
								style={{
									fontSize: "18px",
								}}
								htmlFor="name"
							>
								Select position:
							</label>
							<select name="position" id="position" onChange={handlePosition}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
							</select>
						</div>
						<div
							style={{
								position: "absolute",
								width: "180px",
								display: "flex",
								gap: "10px",
								left: "50%",
								bottom: "-100px",
								transform: "translate(-50%, -50%)",
							}}
						>
							<span
								style={{
									padding: "8px 16px",
									border: "1px solid #fff",
									cursor: "pointer",
								}}
								onClick={() => {
									sendCategory(
										newCollectionName,
										collectionPosition,
										user.id,
										chosenMovies
									);
								}}
							>
								SAVE
							</span>
							<span
								style={{
									padding: "8px 16px",
									border: "1px solid #fff",
									cursor: "pointer",
								}}
								onClick={() => {}}
							>
								CANCEL
							</span>
						</div>
					</div>
				) : (
					<div
						style={{
							marginTop: "20px",
							position: "relative",
						}}
					>
						<span
							style={{
								padding: "8px 16px",
								border: "1px solid #fff",
								cursor: "pointer",
								position: "absolute",
								right: "20px",
								top: "-40px",
							}}
							onClick={() => {
								handleIsAdding();
							}}
						>
							ADD
						</span>
						{collections.length != 0 ? (
							<div>
								{collections.map((item) => {
									return (
										<div
											key={item.id}
											style={{
												padding: "8px 12px",
												display: "flex",
												flexDirection: "column",
											}}
										>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													gap: "10px",
													justifyContent: "center",
												}}
											>
												<input
													className="collection_name"
													type="text"
													style={{
														outline: "none",
														padding: "2px 8px",
														fontSize: "18px",
													}}
													defaultValue={item.name}
													id={`collection_name${item.id}`}
													onChange={handleCollectionName}
												/>
												<h3
													className="collection_old active"
													style={{ margin: "0", padding: "0" }}
													id={`collection_old${item.id}`}
												>
													{item.name}
												</h3>

												<img
													src="../edit.png"
													style={{
														width: "22px",
														cursor: "pointer",
													}}
													alt=""
													onClick={() => {
														toggleEdit(item.id);
													}}
													id={`edit-img${item.id}`}
													className="collection_editing active"
												/>
												<img
													src="../tick.png"
													style={{
														width: "25px",
														cursor: "pointer",
													}}
													alt=""
													onClick={() => {
														sendNewName(item.id, collectionName);
													}}
													id={`save-img${item.id}`}
													className="collection_editing"
												/>
												<img
													src="../trash.png"
													alt=""
													style={{
														width: "22px",
														cursor: "pointer",
													}}
													onClick={() => {
														deleteCollection(item.id);
													}}
												/>
											</div>
											<div
												style={{
													display: "flex",
													margin: "30px 0",
													gap: "10px",
												}}
											>
												{item.movies.map((movie) => {
													return (
														<Link to={`/${movie.title}/${movie.id}`}>
															<div
																style={{
																	backgroundImage: `url(http://127.0.0.1:8000${movie.picture})`,
																	position: "relative",
																	backgroundSize: "cover",
																	backgroundPosition: "center",
																	backgroundRepeat: "no-repeat",
																	transition: "0.5s",
																	color: "#fff",
																	width: "175px",
																	height: "220px",
																}}
															></div>
														</Link>
													);
												})}
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<h2
								style={{
									textAlign: "center",
								}}
							>
								No collections yet
							</h2>
						)}
					</div>
				)
			) : (
				<></>
			)}

			{category == "news" ? (
				<>
					{isNewsEditing ? (
						<>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: "10px",
									position: "relative",
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "5px",
										width: "50%",
									}}
								>
									<label htmlFor="intro">Picture: </label>
									<input
										type="file"
										name="intro"
										style={{
											outline: "none",
											padding: "2px 4px",
										}}
										onChange={handleNewsPicture}
									/>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "5px",
										width: "50%",
									}}
								>
									<label htmlFor="intro">Intro: </label>
									<input
										type="text"
										name="intro"
										style={{
											outline: "none",
											padding: "2px 4px",
										}}
										onChange={handleNewsIntro}
										defaultValue={editingNewsObject?.intro}
									/>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "5px",
										width: "50%",
									}}
								>
									<label htmlFor="title">Title: </label>
									<textarea
										type="text"
										name="title"
										rows={10}
										style={{
											outline: "none",
											padding: "4px 8px",
										}}
										onChange={handleNewsTitle}
										defaultValue={editingNewsObject?.title}
									/>
								</div>
							</div>
							<div
								style={{
									position: "absolute",
									display: "flex",
									gap: "10px",
									left: "50%",
									bottom: "-80px",
									transform: "translate(-50%, -50%)",
								}}
							>
								<span
									style={{
										padding: "8px 16px",
										border: "1px solid #fff",
										cursor: "pointer",
									}}
									onClick={() => {
										sendChanges(
											editingNewsObject.id,
											editingNewsObject.intro,
											editingNewsObject.title,
											editingNewsObject.picture
										);
									}}
								>
									SAVE
								</span>
								<span
									style={{
										padding: "8px 16px",
										border: "1px solid #fff",
										cursor: "pointer",
									}}
									onClick={() => {
										handleCancel();
									}}
								>
									CANCEL
								</span>
							</div>
						</>
					) : (
						<>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "10px",
									margin: "20px 0",
								}}
							>
								<label
									style={{
										fontSize: "20px",
									}}
									htmlFor="author"
								>
									Author:{" "}
								</label>
								<select
									name="author"
									id="author"
									style={{
										padding: "4px 8px",
										background: "transparent",
										border: "1px solid #fff",
										color: "#fff",
									}}
									onChange={handleAuthor}
								>
									{users.map((item) => {
										return (
											<option key={item.id} value={item.id}>
												{item.username}
											</option>
										);
									})}
								</select>
							</div>
							{news ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "20px",
									}}
								>
									{news.map((item) => {
										return (
											<div
												key={item.id}
												style={{
													padding: "8px 16px",
													border: "1px solid #fff",
													display: "flex",
													flexDirection: "column",
													gap: "8px",
												}}
											>
												{/* <div
											style={{
												// minWidth: "340px",
												maxWidth: "600px",
												height: "340px",
												backgroundImage: `url(${item.picture})`,
												backgroundRepeat: "no-repeat",
												backgroundSize: "cover",
												backgroundPosition: "top",
												margin: "0 auto",
											}}
											className="wrapper"
										></div> */}
												<span>ID: {item.id}</span>
												<span>Title: {item.intro}</span>
												<span>Text: {item.title}</span>
												<span>Author: {item.author.username}</span>
												<div
													style={{
														display: "flex",
														alignItems: "center",
														gap: "10px",
														cursor: "pointer",
													}}
												>
													<span>Created: {item.time}</span>
													<img
														src="../edit.png"
														alt=""
														style={{
															width: "22px",
															cursor: "pointer",
														}}
														onClick={() => {
															handleIsNewsEditing(
																item.id,
																user.id,
																item.intro,
																item.title
															);
														}}
													/>
													<img
														src="../trash.png"
														alt=""
														style={{
															width: "22px",
														}}
														onClick={() => {
															deleteNews(item.id);
														}}
													/>
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<h3
									style={{
										textAlign: "center",
									}}
								>
									No news yet
								</h3>
							)}
						</>
					)}
				</>
			) : (
				<></>
			)}

			{category == "users" ? (
				<>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "5px",
							marginBottom: "20px",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "25%",
							}}
						>
							<label htmlFor="username">Username:</label>
							<input
								style={{
									padding: "0 4px",
									background: "transparent",
									border: "1px solid #fff",
									color: "#fff",
								}}
								type="text"
								name="username"
								id="username"
							/>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "25%",
							}}
						>
							<label htmlFor="name">Name:</label>
							<input
								style={{
									padding: "0 4px",
									background: "transparent",
									border: "1px solid #fff",
									color: "#fff",
								}}
								type="text"
								name="name"
								id="name"
							/>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "25%",
							}}
						>
							<label htmlFor="email">Email:</label>
							<input
								style={{
									padding: "0 4px",
									background: "transparent",
									border: "1px solid #fff",
									color: "#fff",
								}}
								type="text"
								name="email"
								id="email"
							/>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignSelf: "end",
								width: "20%",
							}}
						>
							<label htmlFor="admin">Admin:</label>
							<select
								name="admin"
								id="admin"
								style={{
									height: "28px",
									background: "transparent",
									border: "1px solid #fff",
									color: "#fff",
									padding: "0 8px",
								}}
							>
								<option value=""></option>
								<option value="yes">yes</option>
								<option value="no">no</option>
							</select>
						</div>
						<span
							style={{
								padding: "2px 16px",
								border: "1px solid #fff",
								color: "#fff",
								cursor: "pointer",
								alignSelf: "end",
							}}
							onClick={() => {
								sendChanges(
									editingNewsObject.id,
									editingNewsObject.intro,
									editingNewsObject.title,
									editingNewsObject.picture
								);
							}}
						>
							SEARCH
						</span>
					</div>
					<table
						style={{
							borderCollapse: "collapse",
							width: "100%",
							// display: "flex",
						}}
					>
						<thead
							style={{
								textTransform: "uppercase",
								// display: "flex",
								// flexDirection: "column",
							}}
						>
							<tr>
								<th>ID</th>
								<th>Username</th>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Admin</th>
								<th>Balance</th>
								<th>Carma</th>
								<th>Last login</th>
								<th>Created</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.username}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.phone ? user.phone : "no"}</td>
									<td>{user.is_superuser ? "yes" : "no"}</td>
									<td>{user.balance ? user.balance : "0"}</td>
									<td>{user.carma ? user.carma : "0"}</td>
									<td>{user.logged}</td>
									<td>{user.created}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<></>
			)}
			{/* 
			{category == "users" ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "20px",
						alignItems: "center",
					}}
				>
					{users.map((user) => {
						return (
							<table
								style={{
									borderCollapse: "collapse",
									width: "100%",
									// display: "flex",
								}}
							>
								<thead
									style={{
										textTransform: "uppercase",
										// display: "flex",
										// flexDirection: "column",
									}}
								>
									<th>ID</th>
									<th>Username</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Admin</th>
									<th>Balance</th>
									<th>Carma</th>
									<th>Last login</th>
									<th>Created</th>
								</thead>
								<tr
									style={
										{
											// display: "flex",
											// flexDirection: "column",
										}
									}
								>
									<td>{user.id}</td>
									<td>{user.username}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.phone ? user.phone : "no"}</td>
									<td>{user.is_superuser ? "yes" : "no"}</td>
									<td>{user.balance ? user.balance : "0"}</td>
									<td>{user.carma ? user.carma : "0"}</td>
									<td>{user.logged}</td>
									<td>{user.created}</td>
								</tr>
							</table>
							// <div
							// 	style={{
							// 		display: "flex",
							// 		flexDirection: "column",
							// 		gap: "2px",
							// 		width: "50%",
							// 		padding: "8px 12px",
							// 		border: "1px solid #fff",
							// 	}}
							// >
							// 	<div
							// 		style={{
							// 			width: "60px",
							// 			height: "60px",
							// 			backgroundImage: `url(${user.picture})`,
							// 			backgroundPosition: "center",
							// 			backgroundSize: "cover",
							// 			borderRadius: "50%",
							// 		}}
							// 	></div>
							// 	<div
							// 		style={{
							// 			// border: "1px solid #fff",
							// 			padding: "4px 8px",
							// 		}}
							// 	>
							// 		ID: {user.id}
							// 	</div>
							// 	<div
							// 		style={{
							// 			// border: "1px solid #fff",
							// 			padding: "4px 8px",
							// 		}}
							// 	>
							// 		Username: {user.username}
							// 	</div>
							// 	<div
							// 		style={{
							// 			// border: "1px solid #fff",
							// 			padding: "4px 8px",
							// 		}}
							// 	>
							// 		Name: {user.name}
							// 	</div>
							// 	<div
							// 		style={{
							// 			// border: "1px solid #fff",
							// 			padding: "4px 8px",
							// 		}}
							// 	>
							// 		Email: {user.email ? user.email : "No email"}
							// 	</div>
							// 	<div
							// 		style={{
							// 			// border: "1px solid #fff",
							// 			padding: "4px 8px",
							// 		}}
							// 	>
							// 		Phone: {user.phone ? user.phone : "No phone"}
							// 	</div>
							// 	<div
							// 		style={{
							// 			// border: "1px solid #fff",
							// 			padding: "4px 8px",
							// 		}}
							// 	>
							// 		Admin: {user.is_superuser ? "yes" : "no"}
							// 	</div>
							// </div>
						);
					})}
				</div>
			) : (
				<></>
			)} */}
		</section>
	);
};
