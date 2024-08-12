import {
	createBrowserRouter,
	//createHashRouter,
	RouterProvider,
} from "react-router-dom";
import { Suspense } from "react";
/* after the lazing load router is speed up to 1.709s */

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

/* action function */
import { LoginAction } from "@/loaderAction/LoginAction";
import { RegisterAction } from "@/loaderAction/RegisterAction";
import { UserInfoAction } from "@/loaderAction/UserInfoAction";
import { ResetPwdAction } from "@/loaderAction/ResetPwdAction";

/* these are pages and has lazy loaded */
import PopularMovieWrapper from "./routes/PopularMovieWrapper";
import PlayingMovieWrapper from "./routes/PlayingMovieWrapper";
import UpcomingMovieWrapper from "./routes/UpcomingMovieWrapper";
import TopRatedMovieWrapper from "./routes/TopRatedMovieWrapper";
import ArrivingTvWrapper from "./routes/ArrivingTvWrapper";
import OnTvWrapper from "./routes/OnTvWrapper";
import PopularTvWrapper from "./routes/PopularTvWrapper";
import TopRatedTvWrapper from "./routes/TopRatedTvWrapper";

/* loader */
import multiSearchLoader from "@/utils/multiSearchLoader";
import movieListsLoader from "@/utils/movieListsLoader";
import { MovieHomeLoader } from "@/loaderAction/MovieHomeLoader";
import { TvHomeLoader } from "@/loaderAction/TvHomeLoader";
import tvListsLoader from "@/utils/tvListsLoader";
import { PeopleLoader } from "@/loaderAction/PeopleLoader";
import { TvSeasonsLoader } from "@/loaderAction/TvSeasonsLoader";
import { SinglePersonLoader } from "@/loaderAction/SinglePersonLoader";

import { UserInfoLoader } from "@/loaderAction/UserInfoLoader";
import { TrailerListLoader } from "@/loaderAction/TrailerListLoader";

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
			{ path: "people", element: <People />, loader: PeopleLoader },
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
