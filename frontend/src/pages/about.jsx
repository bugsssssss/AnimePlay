import { React, useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const About = () => {
	const { user } = useContext(AuthContext);

	return (
		<>
			<section
				className="about__container"
				id="aboutContainer"
				style={{
					maxWidth: "1140px",
					margin: "100px auto 0 auto",
					color: "#fff",
					padding: "15px 20px",
				}}
			>
				<h4
					style={{
						textAlign: "center",
					}}
				>
					Hey {user?.username}! Welcome to AnimePlay, a vibrant community
					dedicated to all things anime! We are passionate about Japanese
					animation and strive to create a haven for anime enthusiasts to
					connect, explore, and celebrate their shared love for this captivating
					art form.
				</h4>
				<p>
					At AnimePlay, we believe that anime has the power to transport us to
					incredible worlds, introduce us to unforgettable characters, and evoke
					a wide range of emotions. Our goal is to provide a platform where fans
					from all walks of life can come together to indulge in their favorite
					shows, discover new series, and engage in meaningful discussions.
				</p>
				<p>
					Here, you will find a vast collection of anime series, movies, and
					OVAs spanning various genres, from action-packed shounen adventures to
					heartwarming slice-of-life stories. Our carefully curated library
					ensures that there's something for everyone, whether you're a seasoned
					otaku or just getting started on your anime journey.
				</p>
				<p>
					In addition to our extensive anime collection, we offer a range of
					features and resources to enhance your experience. Dive into our
					in-depth character profiles, where you can learn more about the heroes
					and heroines that have captured our hearts. Explore our comprehensive
					reviews and recommendations to help you discover your next favorite
					series. Engage with fellow fans in our lively forums and share your
					thoughts, theories, and fan art.
				</p>
				<p>
					At AnimePlay, we are committed to delivering a seamless and
					user-friendly experience. Our intuitive interface and powerful search
					functionality make it easy to navigate through our vast library and
					find exactly what you're looking for. We regularly update our content
					to ensure that you have access to the latest and greatest anime
					releases.
				</p>
				<p>
					Join our community today and embark on an exciting anime adventure
					with like-minded fans. Immerse yourself in the rich tapestry of
					storytelling, stunning animation, and captivating narratives that have
					made anime a global phenomenon. Whether you're seeking action,
					romance, comedy, or thought-provoking drama, AnimePlay is your
					ultimate destination for all your anime cravings.
				</p>
				<p
					style={{
						textAlign: "center",
					}}
				>
					<b>Thank you for being a part of our vibrant anime community!</b>
				</p>
			</section>
		</>
	);
};
