import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { json, Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export const Chat = (userObject) => {
	const [sent, setSent] = useState([]);
	const [received, setReceived] = useState([]);
	const { user } = useContext(AuthContext);
	let userInfo = userObject.userObject;

	const getMessages = async (sender, to) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/messages/?sender=${sender}&to=${to}`
		);

		if (response.ok) {
			let data = await response.json();
			console.log(data);
		}
	};

	useEffect(() => {
		getMessages(user.id, userInfo.id);
	});

	return (
		<div
			style={{
				maxWidth: "1140px",
				margin: "100px auto 200px auto",
				color: "#fff",
				display: "flex",
				flexDirection: "column",
				gap: "10px",
			}}
		>
			<div
				style={{
					position: "relative",
					border: "1px solid #fff",
					minHeight: "70vh",
					padding: "20px",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: "0",
						// height: "80px",
						width: "100%",
						left: "0",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "15px",
						borderBottom: "1px solid #fff",
					}}
				>
					<span
						style={{
							fontSize: "20px",
						}}
					>
						{userInfo.name ? userInfo.name : userInfo.username}
					</span>
					<div
						style={{
							position: "relative",
							width: "70px",
							height: "70px",
							backgroundImage: `url(http://127.0.0.1:8000${userInfo.picture})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
							borderRadius: "50%",
						}}
					>
						<div
							style={{
								width: "15px",
								height: "15px",
								borderRadius: "50%",
								backgroundColor: "green",
								position: "absolute",
								bottom: "2px",
								left: "1px",
								zIndex: "10",
							}}
						></div>
					</div>
				</div>
			</div>
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
						width: "100%",
					}}
					type="text"
					name="review"
					className="transparent"
					id="review"
				/>
				<img
					src="/../paper-plane(1).png"
					alt=""
					style={{
						width: "30px",
						height: "25px",
						cursor: "pointer",
					}}
				/>
			</div>
		</div>
	);
};
