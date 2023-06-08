import { React, useEffect, useState } from "react";

export const News = () => {
	const [news, setNews] = useState([]);

	let getNews = async () => {
		let response = await fetch("http://127.0.0.1:8000/api/news/");
		if (response.status === 200) {
			setNews(await response.json());
		}
	};

	useEffect(() => {
		getNews();
	}, []);

	console.log(news);

	return (
		<section
			className="news__container"
			style={{
				maxWidth: "800px",
				margin: "100px auto 0 auto",
				color: "#fff",
				padding: "15px 20px",
				display: "flex",
				flexDirection: "column",
				gap: "30px",
			}}
		>
			{news.map((i) => {
				return (
					<div
						style={
							{
								// width: "340px",
								// display: "flex",
								// flexDirection: "column",
								// gap: "10px",
							}
						}
						key={i.id}
					>
						<div
							style={{
								// minWidth: "340px",
								maxWidth: "600px",
								height: "340px",
								backgroundImage: `url(${i.picture})`,
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundPosition: "top",
								margin: "0 auto",
							}}
							className="wrapper"
						></div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
							}}
						>
							<span
								style={{
									fontSize: "18px",
								}}
							>
								{i.intro}
							</span>
							<span
								style={{
									fontSize: "14px",
								}}
							>
								{i.title}
							</span>
							<span
								style={{
									fontSize: "14px",
								}}
							>
								Posted at: {i.time}
							</span>
						</div>
					</div>
				);
			})}
		</section>
	);
};
