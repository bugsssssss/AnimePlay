import { CCarouselCaption } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { CCarousel } from "@coreui/react";
import { CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
export function Carousel() {
	const [pictures, setPictures] = React.useState([]);

	async function fetchPictures() {
		const response = await fetch("http://127.0.0.1:8000/api/carousel/");
		const data = await response.json();
		setPictures(data);
	}

	React.useEffect(() => {
		fetchPictures();
	}, []);

	console.log(pictures);

	return (
		<section className="Carousel" style={{ paddingTop: "70px" }}>
			<CCarousel controls indicators dark>
				{pictures.map((picture) => (
					<CCarouselItem key={picture.id}>
						<CImage
							style={{
								objectFit: "cover",
							}}
							className="carousel__image"
							src={picture.image}
							alt={picture.id}
						/>
						<CCarouselCaption className="d-none d-md-block caption">
							<a href="">{picture.title}</a>
							<p>{picture.description}</p>
						</CCarouselCaption>
					</CCarouselItem>
				))}
			</CCarousel>
			;
		</section>
	);
}
