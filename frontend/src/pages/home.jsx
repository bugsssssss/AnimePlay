import React from "react";
import { useState, useEffect } from "react";
import { Categories } from "../components/categories/categories";
import { Collections } from "../components/collections/collections";
import { Carousel } from "../components/carousel/carousel";
import { MovieContext, MovieProvider } from "../context/movie";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { CardSlider } from "../components/slider/slider";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

export function Home() {
	return (
		<MovieProvider>
			<>
				<Carousel />
				<Collections />
				<Footer />
			</>
		</MovieProvider>
	);
}
