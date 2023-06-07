import "../login/login.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function Sign() {
	const { loginUser } = useContext(AuthContext);

	return (
		<>
			<div className="login-box">
				<h2>Sign Up</h2>
				<form
				// onSubmit={loginUser}
				>
					<div className="user-box">
						<input type="text" name="username" required="" />
						<label htmlFor="username">Username</label>
					</div>
					{/* <div className="user-box">
						<input type="email" name="" required="" />
						<label>Email</label>
					</div> */}
					<div className="user-box">
						<input type="password" name="password" required="" />
						<label htmlFor="password">Password</label>
					</div>
					<div className="user-box">
						<input type="password" name="password1" required="" />
						<label htmlFor="password1">Сonfirm Password</label>
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
						Sign up
					</button>
				</form>
			</div>
		</>
	);
}