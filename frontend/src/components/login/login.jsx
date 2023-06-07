import "./login.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function Login() {
	const { loginUser } = useContext(AuthContext);
	const { user } = useContext(AuthContext);

	return (
		<>
			<div className="login-box">
				<h2>Login</h2>
				<form onSubmit={loginUser}>
					{/* <div className="user-box">
						<input type="email" name="" required="" />
						<label>Email</label>
					</div> */}
					<div className="user-box">
						<input type="text" name="username" required="" />
						<label htmlFor="username">Username</label>
					</div>
					<div className="user-box">
						<input type="password" name="password" required="" />
						<label htmlFor="password">Password</label>
					</div>
					<p
						style={{
							color: "#fff",
						}}
					>
						Don't have an account?{" "}
						<Link to="/sign-up" className="sign">
							Sign Up
						</Link>
					</p>
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
						Login
					</button>
					{user && (
						<span
							style={{
								color: "#fff",
							}}
						>
							Hello {user?.username}!
						</span>
					)}
				</form>
			</div>
		</>
	);
}
