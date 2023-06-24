import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User } from "./user";
import { Chat } from "../pages/chat";

export const UserDetail = () => {
	const { username, id } = useParams();
	const { user } = useContext(AuthContext);

	const [userInfo, setUserinfo] = useState([]);
	const [isFollowing, setIsFollowing] = useState(false);
	const [isChat, setIsChat] = useState(false);

	let navigate = useNavigate();

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

	useEffect(() => {
		getUserDetail(id);
	}, []);

	return (
		<div>
			{isChat ? (
				<Chat userObject={userInfo} />
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
