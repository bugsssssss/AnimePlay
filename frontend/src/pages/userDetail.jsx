import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User } from "./user";

export const UserDetail = () => {
	const { username, id } = useParams();
	const { user } = useContext(AuthContext);

	const [userInfo, setUserinfo] = useState([]);
	const [isFollowing, setIsFollowing] = useState(false);
	const [isChat, setIsChat] = useState(false);
	const [messages, setMessages] = useState([]);
	const [chatId, setChatId] = useState();
	const [messageText, setMessageText] = useState();

	let navigate = useNavigate();

	const handleMessageText = (e) => {
		let text = e.target.value;
		setMessageText(text);
	};

	const getUserDetail = async (id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/users-detail/?id=${id}`
		);

		if (response.ok) {
			let data = await response.json();
			setUserinfo(data);
			if (data.followers.data.includes(user.id)) {
				setIsFollowing(true);
			} else {
				setIsFollowing(false);
			}
		}
	};

	const follow = async (user_id, following_id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/users-detail/?follow=${user_id}&id=${following_id}`
		);

		if (response.ok) {
			getUserDetail(id);
		}
	};

	const unfollow = async (user_id, following_id) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/users-detail/?unfollow=${user_id}&id=${following_id}`
		);

		if (response.ok) {
			getUserDetail(id);
		}
	};

	const getChat = async (user1, user2) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/chat/?user1=${user1}&user2=${user2}`
		);

		if (response.ok) {
			let data = await response.json();
			setChatId(data.id);
			setMessages(data.messages);
		}
	};

	const sendMessage = async (chat_id, sender, text) => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/chat/?id=${chat_id}&sender=${sender}&text=${text}`
		);

		if (response.ok) {
			getChat(user.username, userInfo.username);
		}
	};

	useEffect(() => {
		if (isChat) {
			getChat(user.username, userInfo.username);
		}
	}, [isChat]);

	useEffect(() => {
		getUserDetail(id);
	}, []);

	return (
		<div>
			{isChat ? (
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
								zIndex: "20",
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
						{messages.length != 0 ? (
							<div
								style={{
									height: "calc(100% - 116px)",
									width: "calc(100% - 35px)",
									position: "absolute",
									bottom: "15px",
									display: "flex",
									flexDirection: "column",
									justifyContent: "end",
									gap: "10px",
									overflowY: "auto",
								}}
							>
								{messages.map((message) => {
									return (
										<div key={message.id}>
											{message.sender == user.id ? (
												<div
													style={{
														display: "flex",
														justifyContent: "end",
													}}
												>
													<div
														style={{
															padding: "5px 15px",
															width: "max-content",
															border: "1px solid #fff",
															borderRadius: "20px",
														}}
													>
														{message.text}
													</div>
												</div>
											) : (
												<div
													style={{
														display: "flex",
													}}
												>
													<div
														style={{
															padding: "5px 15px",
															width: "max-content",
															border: "1px solid #fff",
															borderRadius: "20px",
														}}
													>
														{message.text}
													</div>
												</div>
											)}
										</div>
									);
								})}
							</div>
						) : (
							<h2
								style={{
									position: "absolute",
									bottom: "20px",
									textAlign: "center",
								}}
							>
								No messages yet...
							</h2>
						)}
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
							onChange={handleMessageText}
						/>
						<img
							src="/../paper-plane(1).png"
							alt=""
							style={{
								width: "30px",
								height: "25px",
								cursor: "pointer",
							}}
							onClick={() => {
								sendMessage(chatId, user.id, messageText);
							}}
						/>
					</div>
				</div>
			) : (
				<div
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
						<h3>Followers: {userInfo.followers?.count}</h3>
						<h3>Following: {userInfo.following?.count}</h3>
					</div>
					{user.id == userInfo.id ? (
						<></>
					) : (
						<>
							<div
								style={{
									display: "flex",
									gap: "10px",
									justifyContent: "center",
								}}
							>
								{isFollowing ? (
									<span
										style={{
											padding: "8px 16px",
											border: "1px solid #fff",
											cursor: "pointer",
										}}
										onClick={() => {
											unfollow(user.id, userInfo.id);
										}}
									>
										UNFOLLOW
									</span>
								) : (
									<span
										style={{
											padding: "8px 16px",
											border: "1px solid #fff",
											cursor: "pointer",
										}}
										onClick={() => {
											follow(user.id, userInfo.id);
										}}
									>
										FOLLOW
									</span>
								)}

								<span
									style={{
										padding: "8px 16px",
										border: "1px solid #fff",
										cursor: "pointer",
									}}
									onClick={() => {
										setIsChat(true);
									}}
								>
									WRITE
								</span>
							</div>
						</>
					)}

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<h3>Username: {userInfo.username}</h3>
						<h3>Character name: {userInfo.name}</h3>
						<h3>Bio: {userInfo.about}</h3>
					</div>
					{userInfo.id != user.id ? <></> : <></>}
				</div>
			)}
		</div>
	);
};
