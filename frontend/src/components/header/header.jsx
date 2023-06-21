import { Link } from "react-router-dom";
import styles from "./header.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export { Header };

function Header() {
	const { logoutUser, user } = useContext(AuthContext);

	window.addEventListener("scroll", function () {
		var header = document.getElementById("header");
		var scrollPosition = window.scrollY || document.documentElement.scrollTop;

		if (scrollPosition > 0) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}
	});

	return (
		<header className="header__main" id="header">
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
						<Link to="/contact">Contact us</Link>
					</li>
					{/* {user.is_admin == true ? (
						<Link to="/about">Admin panel</Link>
					) : (
						<span></span>
					)} */}
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
				<div
					className="header__main__user not"
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{user.is_admin == true ? (
						<>
							<Link to="/admin-panel">Dashboard</Link>
							<Link
								to="/user"
								// style={{
								// 	display: "flex",
								// 	alignItems: "center",
								// 	gap: "10px",
								// }}
							>
								{/* <img
									src="./medal.png"
									alt=""
									style={{
										width: "32px",
									}}
								/> */}

								<div
									style={{
										backgroundImage: `url(${user.picture})`,
										backgroundPosition: "center",
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										width: "50px",
										height: "50px",
										borderRadius: "50%",
										border: "3px solid gold",
									}}
								></div>
							</Link>
						</>
					) : (
						<Link
							to="/user"
							// style={{
							// 	display: "flex",
							// 	alignItems: "center",
							// 	gap: "10px",
							// }}
						>
							{/* <img
								src="./user.png"
								alt=""
								style={{
									width: "22px",
								}}
							/> */}
							<div
								style={{
									backgroundImage: `url(${user.picture})`,
									backgroundPosition: "center",
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									width: "50px",
									height: "50px",
									borderRadius: "50%",
								}}
							></div>
						</Link>
					)}
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
