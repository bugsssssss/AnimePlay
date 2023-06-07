import { cn } from "./footer.css";
import { CFooter, CLink } from "@coreui/react";

export function Footer() {
	return (
		// <section className="footer__section">
		// 	<ul className="footer__nav">
		// 		<li className="footer__nav-item">
		// 			<a href="">Home</a>
		// 		</li>
		// 		<li className="footer__nav-item">
		// 			<a href="">Categories</a>
		// 		</li>
		// 		<li className="footer__nav-item">
		// 			<a href="">Follow us</a>
		// 		</li>
		// 		<li className="footer__nav-item">
		// 			<a href="">Contact us</a>
		// 		</li>
		// 	</ul>
		// </section>
		<CFooter
			style={{
				backgroundColor: "#000",
				border: "none",
				padding: "25px 35px",
			}}
		>
			<div>
				<CLink href="https://coreui.io">Bugsss</CLink>

				<span>&copy; 2023</span>
			</div>

			<div>
				<span>Find me on: </span>
				<CLink href="https://coreui.io">instagram</CLink>
				<span> / </span>
				<CLink href="https://coreui.io">telegram</CLink>
				<span> / </span>
				<CLink href="https://coreui.io">github</CLink>
			</div>

			<div>
				<span>Powered by </span>

				<CLink href="https://coreui.io">bugsssssss</CLink>
			</div>
		</CFooter>
	);
}
