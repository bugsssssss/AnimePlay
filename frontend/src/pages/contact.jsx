import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import background from "../components/video/background6.mp4";

export const Contact = () => {
	const { user } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		user: user?.id,
		subject: "",
		username: user?.username,
		text: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const sendFeedback = async (e) => {
		e.preventDefault();
		// Send POST request here
		let selectElement = document.getElementById("subject");
		let selectedValue = selectElement.value;
		formData.subject = selectedValue;
		let response = await fetch("http://127.0.0.1:8000/api/feedbacks/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			console.log("success!");
			let text = document.getElementById("text");
			text.value = "";
			let popUp = document.getElementById("alertBox");
			let container = document.getElementById("aboutContainer");
			popUp.classList.add("active");
			container.style.opacity = "0%";
			scrollToTop();
			setTimeout(() => {
				let popUp = document.getElementById("alertBox");
				let container = document.getElementById("aboutContainer");
				popUp.classList.remove("active");
				container.style.opacity = "100%";
			}, 2000);
		} else {
			console.log("error");
		}
	};

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth", // Use 'smooth' for smooth scrolling, or 'auto' for instant scrolling
		});
	}

	return (
		<>
			{/* <video
				className="backgroundVideo"
				src={background}
				// muted
				autoPlay
				loop
				type="video/mp4"
			></video> */}
			<section
				id="aboutContainer"
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%,-60%)",
				}}
			>
				{user ? (
					<div
						className="feedback"
						style={{
							maxWidth: "1140px",
							margin: "100px auto 0 auto",
							color: "#fff",
							padding: "15px 20px",
						}}
					>
						<h3
							style={{
								marginTop: "50px",
								textAlign: "center",
								marginBottom: "30px",
							}}
						>
							Leave your feedback or thoughts about website:
						</h3>
						<form
							onSubmit={sendFeedback}
							style={{
								maxWidth: "500px",
								margin: "0 auto",
							}}
						>
							<div className="user-box">
								{/* <input
								type="text"
								name="username"
								required=""
								hidden
								defaultValue={user.username}
							/>
							<input type="text" name="user" defaultValue={user.id} hidden /> */}
							</div>
							<div className="user-box">
								<div
									className="input__group"
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<label htmlFor="subject">Choose a subject: </label>
									<select
										name="subject"
										id="subject"
										onChange={handleChange}
										style={{
											width: "100%",
											padding: "10px 8px",
											fontSize: "16px",
											color: "#fff",
											marginBottom: "30px",
											border: "none",
											border: "1px solid #fff",
											outline: "none",
											background: "transparent",
										}}
									>
										<option value="suggestion">Suggestion</option>
										<option value="complaint">Complaint</option>
										<option value="error">Error</option>
										<option value="collaboration">Collaboration</option>
									</select>
								</div>
								<div
									className="input__group"
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<label htmlFor="text">Text: </label>
									<textarea
										name="text"
										id="text"
										cols="30"
										rows="5"
										onChange={handleChange}
										style={{
											width: "100%",
											padding: "10px 8px",
											fontSize: "16px",
											color: "#fff",
											marginBottom: "30px",
											border: "none",
											border: "1px solid #fff",
											outline: "none",
											background: "transparent",
										}}
									></textarea>
								</div>
							</div>
							<button
								type="submit"
								className="submit"
								href="#"
								style={{
									background: "none",
									border: "none",
								}}
							>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								Submit
							</button>
							<span
								style={{
									color: "#fff",
								}}
							></span>
						</form>
					</div>
				) : (
					<h3
						style={{
							marginTop: "100px",
							textAlign: "center",
							marginBottom: "30px",
							color: "#fff",
						}}
					>
						Login to contact us
					</h3>
				)}
			</section>
			<div
				className="alertBox"
				id="alertBox"
				style={{
					width: "400px",
					height: "300px",
					border: "1px solid #fff",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					top: "30%",
					left: "35%",
					visibility: "hidden",
					color: "#fff",
				}}
			>
				<h2 style={{}}>Success!</h2>
			</div>
		</>
	);
};
