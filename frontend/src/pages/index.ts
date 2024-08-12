import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Layout = lazy(() => import("./Layout"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));

const TvLayout = lazy(() => import("./TV/TvLayout"));
const People = lazy(() => import("./People"));
const SingleMovie = lazy(() => import("./SingleMovie"));
const Search = lazy(() => import("./Search"));
const MultSearch = lazy(() => import("./Search/MultSearch"));
const PeopleSearch = lazy(() => import("./Search/PeopleSearch"));
const MovieSearch = lazy(() => import("./Search/MovieSearch"));
const CollectionsSearch = lazy(() => import("./Search/CollectionsSearch"));
const TVshowsSearch = lazy(() => import("./Search/TVshowsSearch"));

const MovieLayout = lazy(() => import("./Movie/MovieLayout"));
const PlayingMovie = lazy(() => import("./Movie/PlayingMovie"));
const PopularMovie = lazy(() => import("./Movie/PopularMovie"));
const TopRatedMovie = lazy(() => import("./Movie/TopRatedMovie"));
const UpcomingMovie = lazy(() => import("./Movie/UpcomingMovie"));

const SinglePerson = lazy(() => import("./SinglePerson"));
const SingleTv = lazy(() => import("./SingleTv"));
const MovieHome = lazy(() => import("./Movie/MovieHome"));
const TvHome = lazy(() => import("./TV/TvHome"));

const MovieCast = lazy(() => import("./Movie/MovieCast"));
const MovieReviews = lazy(() => import("./Movie/MovieReviews"));
const TvCast = lazy(() => import("./TV/TvCast"));
const TvReviews = lazy(() => import("./TV/TvReviews"));
const TvSeasons = lazy(() => import("./TV/TvSeasons"));
const Error = lazy(() => import("./Error"));
const VerifyEmail = lazy(() => import("./Auth/VerifyEmail"));
const ResetPwd = lazy(() => import("./Auth/ResetPwd"));
const UserProfile = lazy(() => import("./User/UserProfile"));
const Trailer = lazy(() => import("./Trailer"));

const ArrivingTv = lazy(() => import("./TV/ArrivingTv"));
const OnTv = lazy(() => import("./TV/OnTv"));
const PopularTv = lazy(() => import("./TV/PopularTv"));
const TopRatedTv = lazy(() => import("./TV/TopRatedTv"));

export {
	TopRatedTv,
	PopularTv,
	OnTv,
	ArrivingTv,
	Trailer,
	ResetPwd,
	UserProfile,
	VerifyEmail,
	Error,
	TvSeasons,
	TvReviews,
	TvCast,
	MovieReviews,
	MovieCast,
	TvHome,
	MovieHome,
	SingleTv,
	SinglePerson,
	UpcomingMovie,
	TopRatedMovie,
	PopularMovie,
	PlayingMovie,
	MovieLayout,
	Home,
	Layout,
	Login,
	Register,
	TvLayout,
	People,
	SingleMovie,
	Search,
	MultSearch,
	MovieSearch,
	PeopleSearch,
	CollectionsSearch,
	TVshowsSearch,
};
