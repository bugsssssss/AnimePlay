import { Link } from "react-router-dom";
import styles from "./header.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export { Header };

function Header() {
	const { logoutUser, user } = useContext(AuthContext);

	return (
		<header className="header__main">
			<div className="header__main__logo">
				<Link to="/">AnimePlay</Link>
			</div>
			{/* <div className="header__main__search">
				<input type="text" placeholder="Search" />
			</div> */}
			<nav className="header__main__nav">
				<ul className="header__main__nav__list">
					<li className="header__main__nav__list__item">
						<Link to="/categories">Categories</Link>
					</li>
					<li className="header__main__nav__list__item">
						<Link to="/news">News</Link>
					</li>
					<li className="header__main__nav__list__item">
						<Link to="/forum">Forum</Link>
					</li>
					<li className="header__main__nav__list__item">
						<Link to="/about">About us</Link>
					</li>
					<li className="header__main__nav__list__item">
						<Link to="/search">
							<img
								src="./search(2).png"
								alt=""
								style={{
									width: "28px",
								}}
							/>
						</Link>
					</li>
				</ul>
			</nav>
			{/* <span>Hello {name}</span> */}
			{user ? (
				<div className="header__main__user not">
					<span
						style={{
							color: "#fff",
						}}
					>
						Hello {user.username}
					</span>
					<span
						onClick={logoutUser}
						style={{
							color: "#fff",
							cursor: "pointer",
						}}
					>
						Log out
					</span>
				</div>
			) : (
				<div className="header__main__user not">
					<Link to="/login">Log in</Link>
					<Link to="/sign-up">Sign up</Link>
				</div>
			)}
		</header>
	);
}
