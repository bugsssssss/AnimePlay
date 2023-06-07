import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieContext, MovieProvider } from "../../context/movie";
import { useContext } from "react";
import { DetailComponent } from "../detail/detail";
import { useParams } from "react-router-dom";
import * as MaterialUI from "@material-ui/core";
import classNames from "classnames";
import "./slider.css";

const {
	Button,
	makeStyles,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Box,
} = MaterialUI;
const { useState } = React;

//-------------- card slider styles ---------------
const useStyles = makeStyles({
	sideColumn: {
		height: "370px",
		position: "relative",
		"&:before, &:after": {
			content: '""',
			position: "absolute",
			width: "2.2vw",
			height: "120%",
			background: "#000",
			top: "-10%",
			left: 0,
			zIndex: 3,
		},
		"&:after": {
			left: "auto",
			width: "2.2vw",
			right: 0,
		},
	},
	cardSlider: {
		position: "relative",
		height: "370px",
		maxWidth: "82vw",
		margin: "0 auto",
	},
	cardWrapper: {
		display: "flex",
		position: "absolute",
		left: "0",
		transition: "transform 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955)",
	},
	button: {
		display: "block",
		position: "absolute",
		border: "none",
		borderRadius: "50%",
		height: "4vw",
		width: "4vw",
		zIndex: "4",
		top: "40%",
		backgroundColor: "#000",
		color: "#fff",
		"&:focus": {
			outline: "none",
		},
		"&:active": {
			transform: "translateY(1px)",
			filter: "saturate(150%)",
		},
		"&:hover": {
			borderColor: "#f3f3f3",
			backgroundColor: "#fff",
			color: "#000",
			cursor: "pointer",
		},
	},
	buttonRight: {
		boxShadow:
			"1px 1px 4px 1px rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0,     0, 0.19)",
		right: "-2.5%",
	},
	buttonLeft: {
		boxShadow:
			"-1px 1px 4px 1px rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0,       0, 0.19)",
		left: "-3%",
	},
	noTextOverflow: {
		display: "block",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
});

//--------------------------------------------

const ExampleCard = (movie) => {
	const classes = useStyles();
	return (
		<Link to={`/${movie.movie.title_original}/${movie.movie.id}`}>
			<div className="collections__movies-item">
				<div className="collections__movies-item-wrapper">
					<Card
						style={{
							marginRight: "0.5vw",
							backgroundImage: `url(${movie.movie.picture})`,
							width: "275px",
							height: "370px",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							position: "relative",
							transition: "0.5s",
							color: "#fff",

							"&:hover": {
								transform: " scale(1.1)",
								cursor: "pointer",
							},
						}}
					>
						<CardActionArea>
							<CardContent>
								<Typography component="div">
									{/* <Box
										style={{
											zIndex: "2",
										}}
										textAlign="center"
									>
										{movie.movie.title_original}
									</Box> */}
									{/* <Box textAlign="left" fontFamily="Monospace" m={1}>
							Sed ut perspiciatis unde.
						</Box> */}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</div>
				<Box className="collections__movies-item-title">
					{movie.movie.title_original}
				</Box>
			</div>
		</Link>
	);
};
//--------------------------------------------

export const CardSlider = (collection) => {
	const classes = useStyles();
	const [card, setCard] = useState(0);
	const [cards, setCards] = useState([]);
	// const cards = new Array(10).fill(0);
	const visLeft = card === 0 ? "hidden" : "visible";
	const visRight = card === cards.length - 1 ? "hidden" : "visible";

	// async function fetchCards() {
	// 	let response = await fetch("http://127.0.0.1:8000/api/collections/");
	// 	if (response.ok) {
	// 		let data = await response.json();
	// 		setCards(data[0]["movies"]);
	// 		return await data;
	// 	} else {
	// 		let data = [];
	// 		return data;
	// 	}
	// }

	function IncreaseCard() {
		if (card < cards.length - 1) {
			setCard(card + 1);
		}
	}

	function DecreaseCard() {
		if (card > 0) {
			setCard(card - 1);
		}
	}

	useEffect(() => {
		setCards(collection.collection.movies);
	}, []);

	return (
		<div className={classes.sideColumn}>
			<div className={classes.cardSlider}>
				<button
					onClick={() => IncreaseCard()}
					className={classNames(classes.buttonRight, classes.button)}
					style={{ visibility: visRight }}
				>
					{">"}
				</button>
				<button
					onClick={() => DecreaseCard()}
					className={classNames(classes.buttonLeft, classes.button)}
					style={{ visibility: visLeft }}
				>
					{"<"}
				</button>
				<div
					className={classes.cardWrapper}
					style={{ transform: `translateX(-${card * (100 / cards.length)}%` }}
				>
					{cards.map((movie, index) => (
						<ExampleCard key={index} movie={movie} />
					))}
				</div>
			</div>
		</div>
	);
};

//--------------------------

//--------------------------
