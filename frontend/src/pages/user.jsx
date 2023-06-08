import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const User = () => {
	const { user } = useContext(AuthContext);
	const { loginUser, logoutUser } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState({});
	const [userHistory, setUserHistory] = useState([]);

	const getUser = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/users/?username=${user.username}`
		);
		if (response.status === 200) {
			const data = await response.json();
			setUserInfo(data[0]);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	console.log(userInfo.history);

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
			{userInfo ? (
				<div className="user__info">
					<div
						className="profile__picture"
						style={{
							backgroundImage: `url(${userInfo.picture})`,
							width: "300px",
							height: "300px",
							borderRadius: "50%",
							backgroundPosition: "center",
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							margin: "0 auto 20px auto",
						}}
					></div>

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
							{userInfo.phone ? (
								<span>
									Phone:
									<b> {userInfo.phone}</b>
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
							{userInfo.history ? (
								<span>
									History:
									{userInfo.history.map((i) => {
										return <b> {i} </b>;
									})}
								</span>
							) : (
								<span>
									History:
									<b> - </b>
								</span>
							)}
						</div>
					</h2>
				</div>
			) : (
				<h1 style={{ textAlign: "center" }}>
					You need to <Link to="/login">Log in</Link>
				</h1>
			)}
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
