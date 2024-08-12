import {
	createBrowserRouter,
	//createHashRouter,
	RouterProvider,
} from "react-router-dom";
import { Suspense } from "react";
/* const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const MovieLayout = lazy(() => import("./pages/Movie/MovieLayout"));
const TvLayout = lazy(() => import("./pages/TV/TvLayout"));
const People = lazy(() => import("./pages/People"));
const SingleMovie = lazy(() => import("./pages/SingleMovie.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const MultSearch = lazy(() => import("./pages/Search/MultSearch.tsx"));
const MovieSearch = lazy(() => import("./pages/Search/MovieSearch.tsx"));
const PeopleSearch = lazy(() => import("./pages/Search/PeopleSearch.tsx"));
const CollectionsSearch = lazy(
	() => import("./pages/Search/CollectionsSearch.tsx")
);
const TVshowsSearch = lazy(() => import("./pages/Search/TVshowsSearch.tsx"));
const SingleTv = lazy(() => import("./pages/SingleTv.tsx"));
const SinglePerson = lazy(() => import("./pages/SinglePerson.tsx"));
const MovieHome = lazy(() => import("./pages/Movie/MovieHome.tsx"));
const MovieCast = lazy(() => import("./pages/Movie/MovieCast.tsx"));
const MovieReviews = lazy(() => import("./pages/Movie/MovieReviews.tsx"));
const TvCast = lazy(() => import("./pages/TV/TvCast.tsx"));
const TvReviews = lazy(() => import("./pages/TV/TvReviews.tsx"));
const TvSeasons = lazy(() => import("./pages/TV/TvSeasons.tsx"));
const Error = lazy(() => import("./pages/Error.tsx"));
const VerifyEmail = lazy(() => import("./pages/Auth/VerifyEmail.tsx"));
const UserProfile = lazy(() => import("./pages/User/UserProfile.tsx"));
const ResetPwd = lazy(() => import("./pages/Auth/ResetPwd.tsx"));
const Trailer = lazy(() => import("./pages/Trailer.tsx")); */

import {
	Layout,
	Home,
	Login,
	Register,
	MovieLayout,
	TvLayout,
	People,
	SingleMovie,
	Search,
	MultSearch,
	MovieSearch,
	PeopleSearch,
	CollectionsSearch,
	TVshowsSearch,
	SingleTv,
	SinglePerson,
	MovieHome,
	MovieCast,
	MovieReviews,
	TvCast,
	TvReviews,
	TvSeasons,
	Error,
	VerifyEmail,
	UserProfile,
	ResetPwd,
	Trailer,
	TvHome,
} from "./pages";

import { action as LoginAction } from "@/pages/Login";
import { action as RegisterAction } from "@/pages/Register";
import { action as UserInfoAction } from "@/pages/User/UserProfile";
import { action as ResetPwdAction } from "@/pages/Auth/ResetPwd";

import multiSearchLoader from "@/utils/multiSearchLoader";
import movieListsLoader from "./utils/movieListsLoader";

import PopularMovieWrapper from "./routes/PopularMovieWrapper";
import PlayingMovieWrapper from "./routes/PlayingMovieWrapper";
import UpcomingMovieWrapper from "./routes/UpcomingMovieWrapper";
import TopRatedMovieWrapper from "./routes/TopRatedMovieWrapper";
import ArrivingTvWrapper from "./routes/ArrivingTvWrapper";
import OnTvWrapper from "./routes/OnTvWrapper";
import PopularTvWrapper from "./routes/PopularTvWrapper";
import TopRatedTvWrapper from "./routes/TopRatedTvWrapper";

/* loader */
import { loader as MovieHomeLoader } from "@/pages/Movie/MovieHome";
import { loader as TvHomeLoader } from "@/pages/TV/TvHome";
import tvListsLoader from "./utils/tvListsLoader";
import { loader as PopularPeopleLoader } from "@/pages/People";
import { loader as TvSeasonsLoader } from "@/pages/TV/TvSeasons";
import { loader as SinglePersonLoader } from "@/pages/SinglePerson";
//import { loader as VerifyEmailLoader } from "@/pages/VerifyEmail";
import { loader as UserInfoLoader } from "@/pages/User/UserProfile";
import { loader as TrailerListLoader } from "@/pages/Trailer";

const router = createBrowserRouter([
	//const router = createHashRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "user/profile",
				element: <UserProfile />,
				loader: UserInfoLoader,
				action: UserInfoAction,
			},
			{
				path: "trailers",
				element: <Trailer />,
				loader: TrailerListLoader, // use the loader function to read the store.state.userName exists to know if login or not, if not login yet re-direct to login page, this way save code
			},
			{
				path: "movie",
				element: <MovieLayout />,
				children: [
					{ index: true, element: <MovieHome />, loader: MovieHomeLoader },
					{
						path: "popular",
						element: <PopularMovieWrapper />,
						loader: movieListsLoader("popular"),
					},
					{
						path: "playing",
						element: <PlayingMovieWrapper />,
						loader: movieListsLoader("now_playing"),
					},
					{
						path: "upcoming",
						element: <UpcomingMovieWrapper />,
						loader: movieListsLoader("upcoming"),
					},
					{
						path: "top_rated",
						element: <TopRatedMovieWrapper />,
						loader: movieListsLoader("top_rated"),
					},
				],
			},
			{
				path: "movie/:id",
				element: <SingleMovie />,
			},
			{ path: "movie/:id/cast", element: <MovieCast /> },
			{ path: "movie/:id/reviews", element: <MovieReviews /> },
			{
				path: "tv_show",
				element: <TvLayout />,
				children: [
					{ index: true, element: <TvHome />, loader: TvHomeLoader },
					{
						path: "popular",
						element: <PopularTvWrapper />,
						loader: tvListsLoader("popular"),
					},
					{
						path: "arriving",
						element: <ArrivingTvWrapper />,
						loader: tvListsLoader("arriving"),
					},
					{
						path: "on_Tv",
						element: <OnTvWrapper />,
						loader: tvListsLoader("on_Tv"),
					},
					{
						path: "top_rated",
						element: <TopRatedTvWrapper />,
						loader: tvListsLoader("top_rated"),
					},
				],
			},
			{ path: "tv_show/:id", element: <SingleTv /> },
			{ path: "tv_show/:id/cast", element: <TvCast /> },
			{ path: "tv_show/:id/reviews", element: <TvReviews /> },
			{
				path: "tv_show/:id/seasons",
				element: <TvSeasons />,
				loader: TvSeasonsLoader,
			},
			{ path: "people", element: <People />, loader: PopularPeopleLoader },
			{
				path: "people/:id",
				element: <SinglePerson />,
				loader: SinglePersonLoader,
			},
			{
				path: "search",
				element: <Search />,
				children: [
					{
						index: true,
						element: <MultSearch />,
						loader: multiSearchLoader("multi"),
					},
					{
						path: "movies",
						element: <MovieSearch />,
						loader: multiSearchLoader("movie"),
					},
					{
						path: "tvShow",
						element: <TVshowsSearch />,
						loader: multiSearchLoader("tv"),
					},
					{
						path: "people",
						element: <PeopleSearch />,
						loader: multiSearchLoader("person"),
					},
					{
						path: "collections",
						element: <CollectionsSearch />,
						loader: multiSearchLoader("collection"),
					},
				],
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
		action: LoginAction,
	},
	{
		path: "/register",
		element: <Register />,
		action: RegisterAction,
	},
	{
		path: "/userAuth/verify-email",
		element: <VerifyEmail />,
		//	loader: VerifyEmailLoader,
	},
	{
		path: "/userAuth/reset-pwd",
		element: <ResetPwd />,
		action: ResetPwdAction,
		//	loader: VerifyEmailLoader,
	},
]);

export default function App() {
	return (
		<Suspense fallback={<div> loading...</div>}>
			<RouterProvider
				router={router}
				fallbackElement={<p>Initial Load...</p>}
			/>
		</Suspense>
	);
}

//aggregate_credits,reviews,recommendations

//
