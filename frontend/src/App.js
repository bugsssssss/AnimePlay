import styles from "./App.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Categories } from "./components/categories/categories";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useParams,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Home } from "./pages/home";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { DetailPage } from "./pages/detail-page";
import { MovieContext, MovieProvider } from "./context/movie";
import { Search } from "./pages/search";
import { Login } from "./components/login/login";
import { Sign } from "./components/sign/sign";

const App = () => {
	const { id } = useParams();
	const { name } = useParams();

	return (
		<MovieProvider>
			<div className="App">
				<Router>
					<AuthProvider>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/" element={<PrivateRoute />}>
								<Route path="/:name/:id" element={<DetailPage />} />
							</Route>
							<Route path="/categories" element={<Categories />} />
							<Route path="/search" element={<Search />} />
							<Route path="/login" element={<Login />} />
							<Route path="/sign-up" element={<Sign />} />
						</Routes>
						<Header />
					</AuthProvider>
					{/* <Categories /> */}
				</Router>
			</div>
		</MovieProvider>
	);
};

export default App;
