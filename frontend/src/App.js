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
import { User } from "./pages/user";
import { News } from "./pages/news";
import { About } from "./pages/about";
import { Forum } from "./pages/forum";
import { Admin } from "./pages/admin";
import { Contact } from "./pages/contact";
import { NewsDetail } from "./pages/newsDetail";
import { UserDetail } from "./pages/userDetail";

const App = () => {
	const { id } = useParams();
	const { name } = useParams();
	const { newsId } = useParams();

	return (
		<MovieProvider>
			<div
				className="App"
				style={{
					overflowX: "hidden",
				}}
			>
				<Router>
					<AuthProvider>
						<Header />

						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/:name/:id" element={<DetailPage />} />
							<Route path="/" element={<PrivateRoute />}>
								<Route path="/admin-panel" element={<Admin />} />
							</Route>
							<Route path="/categories" element={<Categories />} />
							<Route path="/search" element={<Search />} />
							<Route path="/login" element={<Login />} />
							<Route path="/sign-up" element={<Sign />} />
							<Route path="/user" element={<User />} />
							<Route path="/user/:username/:id" element={<UserDetail />} />
							<Route path="/news" element={<News />} />
							<Route path="/:id" element={<NewsDetail />} />
							<Route path="/about" element={<About />} />
							<Route path="/forum" element={<Forum />} />
							<Route path="/contact" element={<Contact />} />
							{/* <Route path="/chat" element={<Chat />} /> */}
						</Routes>
					</AuthProvider>
					{/* <Categories /> */}
				</Router>
			</div>
		</MovieProvider>
	);
};

export default App;
