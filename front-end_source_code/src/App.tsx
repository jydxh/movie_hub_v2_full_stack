import {
	createBrowserRouter,
	//createHashRouter,
	RouterProvider,
} from "react-router-dom";
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
import { loader as MovieHomeLoader } from "@/pages/Movie/MovieHome";
import TvHome, { loader as TvHomeLoader } from "@/pages/TV/TvHome";
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
		<RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
	);
}

//aggregate_credits,reviews,recommendations

//
