import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./rating.css";

export function Rating(movie) {
	const { user } = useContext(AuthContext);

	const [selectedStars, setSelectedStars] = useState(0);

	const handleStarClick = (starCount) => {
		setSelectedStars(starCount);
	};

	const sendRating = async () => {
		let response = await fetch(
			`http://127.0.0.1:8000/api/rating/?movie=${movie.movie}&user=${user.id}&stars=${selectedStars}`
		);

		if (response.ok) {
			console.log("updated");
		}
	};

	return (
		<div
			style={{
				margin: "10px 0",
			}}
		>
			<h4
				style={{
					marginBottom: "10px",
				}}
			>
				Star Rating: {selectedStars} stars
			</h4>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",
				}}
			>
				<div
					style={{
						fontSize: "20px",
					}}
				>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starCount) => (
						<span
							key={starCount}
							style={{
								cursor: "pointer",
								color: starCount <= selectedStars ? "gold" : "gray",
							}}
							onClick={() => handleStarClick(starCount)}
						>
							&#9733;
						</span>
					))}
				</div>
				<span
					style={{
						fontSize: "18px",
						padding: "0 12px",
						border: "1px solid #fff",
						cursor: "pointer",
					}}
					onClick={() => {
						sendRating();
					}}
				>
					Rate
				</span>
			</div>
		</div>
	);
}
