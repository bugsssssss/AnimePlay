import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./pages.css";

export const User = () => {
	const { user } = useContext(AuthContext);
	const { loginUser, logoutUser } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState({});
	const [userHistory, setUserHistory] = useState([]);
	const [category, setCategory] = useState("info");
	const [feedbacks, setFeedbacks] = useState([]);
	const [feedbackStatus, setFeedbackStatus] = useState("opened");
	const [reviews, setReviews] = useState([]);
	const [isEditing, setIsEditing] = useState(false);

	const getUser = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/users/?username=${user.username}`
		);
		if (response.status === 200) {
			const data = await response.json();
			setUserInfo(data[0]);
		}
	};
	const getFeedbacks = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/myfeedbacks/?username=${user.username}&status=${feedbackStatus}`
		);
		if (response.status === 200) {
			const data = await response.json();
			setFeedbacks(data);
		}
	};

	const getReviews = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/reviews/?author=${user.id}`
		);

		if (response.ok) {
			let data = await response.json();
			setReviews(data);
		}
	};

	let sendData = async (e) => {
		e.preventDefault();
		// console.log("Form submitted");
		let formData = new FormData();
		formData.append("username", e.target.username.value);
		formData.append("name", e.target.name.value);
		formData.append("email", e.target.email.value);
		formData.append("phone_number", e.target.phone_number.value);
		formData.append("about", e.target.about.value);

		let fileInput = e.target.picture;
		if (fileInput.files.length > 0) {
			formData.append("picture", fileInput.files[0]);
		}

		let response = await fetch(
			`http://127.0.0.1:8000/api/user-update/${user.id}/`,
			{
				method: "PATCH",
				body: formData,
			}
		);
		let data = await response.json();

		if (response.status === 200) {
			getUser();
			setIsEditing(false);
		}
	};

	const handleIsEditing = (bool) => {
		setIsEditing(bool);
	};

	useEffect(() => {
		getUser();
	}, []);

	const handleClick = (category) => {
		setCategory(category);
	};

	const handleStatus = (status) => {
		setFeedbackStatus(status);
	};

	useEffect(() => {
		let info = document.getElementById("info");
		let feed = document.getElementById("feedbacks");
		let reviewsElement = document.getElementById("reviews");
		let collectionElement = document.getElementById("collections");

		if (category == "info") {
			info.classList.add("active");
			feed.classList.remove("active");
			reviewsElement.classList.remove("active");
			collectionElement.classList.remove("active");
		} else if (category == "feedbacks") {
			info.classList.remove("active");
			feed.classList.add("active");
			reviewsElement.classList.remove("active");
			collectionElement.classList.remove("active");
		} else if (category == "reviews") {
			info.classList.remove("active");
			feed.classList.remove("active");
			reviewsElement.classList.add("active");
			collectionElement.classList.remove("active");

			getReviews();
		} else {
			info.classList.remove("active");
			feed.classList.remove("active");
			reviewsElement.classList.remove("active");
			collectionElement.classList.add("active");
		}
	}, [category]);

	useEffect(() => {
		if (category == "feedbacks") {
			let opened = document.getElementById("opened");
			let answered = document.getElementById("answered");
			if (feedbackStatus == "opened") {
				opened.classList.add("active");
				answered.classList.remove("active");
			} else {
				opened.classList.remove("active");
				answered.classList.add("active");
			}
		}
		// else if (category == "reviews") {
		// 	getReviews();
		// 	console.log(reviews);
		// }
	}, [category, feedbackStatus]);

	useEffect(() => {
		getFeedbacks();
	}, [feedbackStatus]);

	return (
		<section
			className="user__content"
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
					marginBottom: "75px",
				}}
			>
				<li className="categories__list-item" id="info">
					<Link
						onClick={() => {
							handleClick("info");
						}}
					>
						My info
					</Link>
				</li>
				<li className="categories__list-item" id="feedbacks">
					<Link
						onClick={() => {
							handleClick("feedbacks");
						}}
					>
						Feedbacks
					</Link>
				</li>
				<li className="categories__list-item" id="reviews">
					<Link
						onClick={() => {
							handleClick("reviews");
						}}
					>
						Reviews
					</Link>
				</li>
				<li className="categories__list-item" id="collections">
					<Link
						onClick={() => {
							handleClick("collections");
						}}
					>
						Collections
					</Link>
				</li>
			</ul>
			{category == "info" ? (
				<div
					className="user__info"
					style={{
						position: "relative",
					}}
				>
					{isEditing ? (
						<>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "15px",
									width: "70%",
									margin: "0 auto",
									alignItems: "center",
								}}
							>
								<form
									enctype="multipart/form-data"
									style={{
										width: "60%",
									}}
									onSubmit={sendData}
								>
									{" "}
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "5px",
										}}
									>
										<label htmlFor="picture">Select new picture:</label>
										<input
											style={{
												width: "100%",
											}}
											type="file"
											name="picture"
											id="picture"
											accept="image/*"
											defaultValue={userInfo.picture.url}
										/>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "5px",
										}}
									>
										<label htmlFor="username">Username:</label>
										<input
											style={{
												padding: "2px 6px",
												border: "1px solid #fff",
												background: "transparent",
												color: "#fff",
											}}
											type="text"
											name="username"
											id="username"
											defaultValue={userInfo.username}
										/>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "5px",
										}}
									>
										<label htmlFor="username">Name:</label>
										<input
											style={{
												padding: "2px 6px",
												border: "1px solid #fff",
												background: "transparent",
												color: "#fff",
											}}
											type="text"
											name="name"
											id="name"
											defaultValue={userInfo.name}
										/>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "5px",
										}}
									>
										<label htmlFor="email">Email:</label>
										<input
											style={{
												padding: "2px 6px",
												border: "1px solid #fff",
												background: "transparent",
												color: "#fff",
											}}
											type="text"
											name="email"
											id="email"
											defaultValue={userInfo.email}
										/>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "5px",
										}}
									>
										<label htmlFor="phone">Phone:</label>
										<input
											style={{
												padding: "2px 6px",
												border: "1px solid #fff",
												background: "transparent",
												color: "#fff",
											}}
											type="text"
											name="phone_number"
											id="phone"
											defaultValue={userInfo.phone_number}
										/>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "5px",
										}}
									>
										<label htmlFor="phone">About:</label>
										<textarea
											style={{
												padding: "2px 6px",
												border: "1px solid #fff",
												background: "transparent",
												color: "#fff",
												outline: "none",
											}}
											type="text"
											name="about"
											id="phone"
											defaultValue={userInfo.about}
										/>
									</div>
									<div
										style={{
											display: "flex",
											gap: "10px",
										}}
									>
										<input
											style={{
												padding: "8px 16px",
												border: "1px solid #fff",
												cursor: "pointer",
												margin: "20px auto",
											}}
											onClick={() => {
												// handleIsEditing(false);
											}}
											type="submit"
											value="SAVE"
										></input>
										<span
											style={{
												padding: "8px 16px",
												border: "1px solid #fff",
												cursor: "pointer",
												margin: "20px auto",
											}}
											onClick={() => {
												handleIsEditing(false);
											}}
										>
											CANCEL
										</span>
									</div>
								</form>
							</div>
						</>
					) : (
						<>
							{" "}
							<div
								className="profile__picture"
								style={{
									backgroundImage: `url(http://127.0.0.1:8000${userInfo.picture})`,
									width: "300px",
									height: "300px",
									borderRadius: "50%",
									backgroundPosition: "center",
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									margin: "0 auto 20px auto",
								}}
							></div>
							<div
								style={{
									display: "flex",
									gap: "20px",
									justifyContent: "center",
								}}
							>
								<h2>Followers: {userInfo.followers?.count}</h2>
								<h2>Following: {userInfo.following?.count}</h2>
							</div>
							<div
								style={{
									// maxWidth: "400px",
									margin: "0 auto",
								}}
							>
								<h2 style={{ textAlign: "center" }}>
									Username: <b>{userInfo.username}</b>
								</h2>
								<h2 style={{ textAlign: "center" }}>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "0.5rem",
											// width: "400px",
											// textAlign: "left",
											// margin: "0 auto",
										}}
									>
										{userInfo.name ? (
											<span>
												Name:
												<b> {userInfo.name}</b>
											</span>
										) : (
											<div>
												Name:
												<b> -</b>
											</div>
										)}
										{userInfo.email ? (
											<span>
												Email:
												<b> {userInfo.email}</b>
											</span>
										) : (
											<span>
												Email:
												<b> -</b>
											</span>
										)}
										{userInfo.phone_number ? (
											<span>
												Phone:
												<b> {userInfo.phone_number}</b>
											</span>
										) : (
											<span>
												Phone:
												<b> -</b>
											</span>
										)}
										{userInfo.balance ? (
											<span>
												Balance:
												<b> {userInfo.balance}</b>
											</span>
										) : (
											<span>
												Balance:
												<b> 0.00 </b>
											</span>
										)}
										{userInfo.carma ? (
											<span>
												Carma:
												<b> {userInfo.carma}</b>
											</span>
										) : (
											<span>
												Carma:
												<b> 0 </b>
											</span>
										)}
										{userInfo.about ? (
											<span>
												About:
												<b> {userInfo.about}</b>
											</span>
										) : (
											<span>
												About:
												<b> - </b>
											</span>
										)}
										{/* {userInfo.history ? (
											<span>
												History:
												{userInfo.history.map((i) => {
													return <b key={i}> {i} </b>;
												})}
											</span>
										) : (
											<span>
												History:
												<b> - </b>
											</span>
										)} */}
									</div>
								</h2>
							</div>
							<span
								style={{
									padding: "8px 16px",
									border: "1px solid #fff",
									cursor: "pointer",
									position: "absolute",
									top: "0",
									right: "10%",
								}}
								onClick={() => {
									handleIsEditing(true);
								}}
							>
								EDIT
							</span>
						</>
					)}
				</div>
			) : (
				<span></span>
			)}

			{category == "feedbacks" ? (
				<>
					<ul
						className="categories__list"
						style={{
							marginBottom: "75px",
						}}
					>
						<li className="categories__list-item" id="opened">
							<Link
								onClick={() => {
									handleStatus("opened");
								}}
							>
								Opened
							</Link>
						</li>
						<li className="categories__list-item" id="answered">
							<Link
								onClick={() => {
									handleStatus("answered");
								}}
							>
								Answered
							</Link>
						</li>
					</ul>
					<div
						className="feedbacks__container"
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "20px",
						}}
					>
						{feedbacks ? (
							feedbacks.map((feedback) => {
								return (
									<div
										className="feedback-item"
										style={{
											width: "400px",
											display: "flex",
											flexDirection: "column",
										}}
										key={feedback.id}
									>
										{feedback.subject == "error" ? (
											<span
												style={
													{
														// color: "red",
													}
												}
											>
												Subject: {feedback.subject}
											</span>
										) : (
											<span>Subject: {feedback.subject}</span>
										)}
										<span>Text: {feedback.text}</span>
										{feedback.status == "opened" ? (
											<span
												style={{
													color: "red",
												}}
											>
												Status: {feedback.status}
											</span>
										) : (
											<span
												style={{
													color: "green",
												}}
											>
												Status: {feedback.status}
											</span>
										)}
										<span>Created: {feedback?.created.date}</span>
										<span>At: {feedback?.created.time}</span>
										{feedback.response ? (
											<span
												style={{
													color: "green",
												}}
											>
												Response: {feedback.response}
											</span>
										) : (
											<span></span>
										)}
									</div>
								);
							})
						) : (
							<h2>No feedbacks yet...</h2>
						)}
					</div>
				</>
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

									{review.text}
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
												alignItems: "center",
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
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<span></span>
			)}

			{category == "collections" ? <></> : <></>}
			<div
				style={{
					position: "absolute",
					bottom: "-100px",
					display: "flex",
					justifyContent: "center",
					margin: "0 auto",
					width: "100%",
				}}
			>
				<Link
					style={{
						textDecoration: "none",
						color: "#fff",
						display: "block",
						textAlign: "center",
						fontSize: "22px",
					}}
					to="/login"
					onClick={logoutUser}
				>
					Log out
				</Link>
			</div>
		</section>
	);
};
