import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { json, Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const NewsDetail = () => {
	const [newsItem, setNewsItem] = useState();
	const [comments, setComments] = useState([]);
	const [liked, setLiked] = useState(false);
	const [disliked, setdDsliked] = useState(false);
	const [commentText, setCommentText] = useState("");

	const { user } = useContext(AuthContext);
	const { id } = useParams();

	const handleText = (e) => {
		let text = e.target.value;
		setCommentText(text);
	};

	const getNewsDetail = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-detail/?id=${id}`
		);

		if (response.ok) {
			let data = await response.json();
			setNewsItem(data);
		}
	};

	const getComments = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-comments/?id=${id}`
		);

		if (response.ok) {
			let data = await response.json();
			setComments(data);
		}
	};

	const sendComment = async (text) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-comments/?id=${id}&user=${user.id}&text=${text}`
		);

		if (response.ok) {
			let inpt = document.getElementById("review");
			inpt.value = "";
			getComments();
		}
	};

	const sendLike = async (comment_id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-comments/?comment=${comment_id}&like=test`
		);

		if (response.ok) {
			getComments();
			setLiked(true);
		}
	};

	const sendDislike = async (comment_id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-comments/?comment=${comment_id}&dislike=test`
		);

		if (response.ok) {
			getComments();
			setdDsliked(true);
		}
	};

	const deleteComment = async (comment_id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/news-comments/?delete=${comment_id}`
		);

		if (response.ok) {
			getComments();
		}
	};

	useEffect(() => {
		getNewsDetail();
		getComments();
	}, []);

	console.log(comments);

	return (
		<section
			style={{
				maxWidth: "1140px",
				margin: "100px auto 0 auto",
				color: "#fff",
				padding: "15px 20px",
				display: "flex",
				flexDirection: "column",
				gap: "30px",
			}}
		>
			<h2
				style={{
					textAlign: "center",
				}}
			>
				{newsItem?.intro}
			</h2>

			<div
				style={{
					// minWidth: "340px",
					width: "600px",
					height: "600px",
					backgroundImage: `url(${newsItem?.picture})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
					margin: "0 auto",
				}}
				className="wrapper"
			></div>
			<p
				style={{
					fontSize: "20px",
				}}
			>
				{newsItem?.title}
			</p>
			<div>
				{comments.length != 0 ? (
					<section>
						{comments.map((comment) => {
							return (
								<div
									style={{
										padding: "8px 2px",
										position: "relative",
										// width: "70%",
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
												{liked | disliked | (user.id == comment.author.id) ? (
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
																	sendLike(comment.id);
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
																	sendDislike(comment.id);
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
															deleteComment(comment.id);
														}}
													/>
												) : (
													<></>
												)}
											</div>
										) : (
											<span></span>
										)}
									</div>
								</div>
							);
						})}
					</section>
				) : (
					<h3>No comments yet...</h3>
				)}
			</div>
			{user ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
						marginTop: "10px",
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
								sendComment(commentText);
							}}
						/>
					</div>
				</div>
			) : (
				<h5
					style={{
						margin: "0 0 0 0",
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
		</section>
	);
};
