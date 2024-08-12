export const baseImgUrl = "https://image.tmdb.org/t/p";
export const imgUrl = "https://image.tmdb.org/t/p/original/";
// Common Media interface
export interface Media {
	backdrop_path: string;
	id: number;
	overview: string;
	poster_path: string;
	media_type: string;
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	vote_average: number;
	vote_count: number;
}

// Movie interface extending Media
export interface Movie extends Media {
	original_title: string;
	title: string;
	release_date: string;
	video: boolean;
}

// TV Show interface extending Media
export interface TVShow extends Media {
	original_name: string;
	name: string;
	first_air_date: string;
	origin_country: string[];
}

//TrendingAllResult interface
export interface TrendingAllResult extends Media {
	original_title?: string;
	title?: string;
	release_date?: string;
	video?: boolean;
	original_name?: string;
	name?: string;
	first_air_date?: string;
	origin_country?: string[];
}

// Trending All Response interface
export interface TrendingAllResponse {
	page: number;
	total_pages: number;
	total_results: number;
	results: TrendingAllResult[];
}

// People Known For interface
export interface PeopleKnownFor {
	backdrop_path: string;
	id: number;
	original_name?: string;
	overview: string;
	poster_path: string;
	media_type: MediaType;
	adult: boolean;
	name?: string;
	original_language: OriginalLanguage;
	genre_ids: number[];
	popularity: number;
	first_air_date?: string;
	vote_average: number;
	vote_count: number;
	origin_country?: string[];
	original_title?: string;
	title?: string;
	release_date?: string;
	video?: boolean;
}
export enum OriginalLanguage {
	En = "en",
	Es = "es",
	Fr = "fr",
	Th = "th",
	Tr = "tr",
}
export enum MediaType {
	Movie = "movie",
	Tv = "tv",
}

// Trending People Response interface
export interface TrendingPeopleResponse {
	page: number;
	total_pages: number;
	total_results: number;
	results: TrendingPeople[];
}

// Trending People interface
export interface TrendingPeople {
	id: number;
	original_name: string;
	media_type: string;
	adult: boolean;
	name: string;
	popularity: number;
	gender: number;
	known_for_department: string;
	profile_path: string;
	known_for: PeopleKnownFor[];
}

export interface MovieResult {
	/* adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number; */
	backdrop_path: string | null;
	id: number;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: "movie";
	adult: boolean;
	title: string;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	first_air_date?: string;
	name?: string;
}

export interface MovieData {
	page: number;
	results: MovieResult[];
	total_pages: number;
	total_results: number;
}

export interface TVResults {
	backdrop_path: string;
	id: number;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: "tv";
	adult: boolean;
	name: string;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}
export interface TVResponse {
	page: number;
	results: TVResults[];
	total_pages: number;
	total_results: number;
}

export interface PersonResult {
	id: number;
	original_name: string;
	media_type: "person";
	adult: boolean;
	name: string;
	popularity: number;
	gender: number;
	known_for_department: string;
	profile_path: string | null;
	known_for: KnownForItem[];
}

export interface CollectionResult {
	adult: boolean;
	backdrop_path: string;
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string;
}
export interface CollectionResultResponse {
	page: number;
	results: Array<CollectionResult>;
	total_pages: number;
	total_results: number;
}

export interface MovieResultResponse {
	page: number;
	results: Array<MovieResult>;
	total_pages: number;
	total_results: number;
	dates?: { maximum: string; minumum: string };
}

export interface MultiSearchResponse {
	page: number;
	results: Array<MovieResult | PersonResult | TVResults>;
	total_pages: number;
	total_results: number;
}

export interface KnownForItem {
	backdrop_path: string | null;
	id: number;
	original_name: string;
	overview: string;
	poster_path: string | null;
	media_type: "tv" | "movie";
	adult: boolean;
	name?: string;
	title: string;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	first_air_date?: string;
	release_date?: string;
	vote_average: number;
	vote_count: number;
	origin_country?: string[];
}
export interface PeopleListResponse {
	page: number;
	results: PeopleListResult[];
	total_pages: number;
	total_results: number;
}

export interface PeopleListResult {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	known_for: KnownForItem[];
}

export interface Genre {
	id: number;
	name: string;
}

export interface MovieListResponse {
	page: number;
	results: MovieListResult[];
	total_pages: number;
	total_results: number;
}

export interface MovieListResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TvListResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	first_air_date: string;
	name: string;
	vote_average: number;
	vote_count: number;
}
export interface TvListResponse {
	page: number;
	results: TvListResult[];
	total_pages: number;
	total_results: number;
}

export interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}
export interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}
export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}
export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface MovieDetailResponse {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: BelongsToCollection;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	reviews: Reviews;
	credits: MovieCredits;
	recommendations: MovieRecommendations;
}

export interface MovieDetailWithTrailerResponse extends MovieDetailResponse {
	trailers: string[];
}

export interface Reviews {
	page: number;
	results: ReviewsResult[];
	total_pages: number;
	total_results: number;
}
export interface ReviewsResult {
	author?: string;
	author_details: AuthorDetails;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}
export interface AuthorDetails {
	name: string;
	username: string;
	avatar_path: null | string;
	rating: number | null;
}

export interface MovieCredits {
	cast: MovieCast[];
	crew: MovieCast[];
}
export interface TvCredits {
	cast: TvCast[];
	crew: TvCast[];
}

export interface MovieCast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: null | string;
	cast_id?: number;
	character?: string;
	credit_id: string;
	order?: number;
	department?: string;
	job?: string;
}
export enum Department {
	Acting = "Acting",
	Art = "Art",
	Camera = "Camera",
	CostumeMakeUp = "Costume & Make-Up",
	Crew = "Crew",
	Directing = "Directing",
	Editing = "Editing",
	Production = "Production",
	Sound = "Sound",
	VisualEffects = "Visual Effects",
	Writing = "Writing",
}
export interface Role {
	credit_id: string;
	character: string;
	episode_count: number;
}

export interface TvCast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: Department;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: null | string;
	roles?: Role[];
	total_episode_count: number;
	order?: number;
	jobs?: Job[];
	department?: Department;
}
export interface Job {
	credit_id: string;
	job: string;
	episode_count: number;
}

export interface MovieRecommendations {
	page: number;
	results: MovieRecommendationsResult[];
	total_pages: number;
	total_results: number;
}

export interface MovieRecommendationsResult {
	backdrop_path: string;
	id: number;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: MediaType;
	adult: boolean;
	title: string;
	original_language: OriginalLanguage;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TvRecommendations {
	page: number;
	results: TvRecommendationsResult[];
	total_pages: number;
	total_results: number;
}

export interface TvRecommendationsResult {
	backdrop_path: string;
	id: number;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: MediaType;
	adult: boolean;
	name: string;
	original_language: OriginalLanguage;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: OriginCountry[];
}

export interface MediaImages {
	backdrops: Backdrop[];
	id: number;
	logos: Backdrop[];
	posters: Backdrop[];
}

export interface Backdrop {
	aspect_ratio: number;
	height: number;
	iso_639_1: null | string;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}

export interface CreatedBy {
	id: number;
	credit_id: string;
	name: string;
	original_name: string;
	gender: number;
	profile_path: string;
}
export interface TEpisodeToAir {
	id: number;
	overview: string;
	name: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number | null;
	season_number: number;
	show_id: number;
	still_path: string;
}
export interface Network {
	id: number;
	logo_path: null | string;
	name: string;
	origin_country: string;
}
export enum OriginCountry {
	Us = "US",
}
export interface Season {
	air_date: string | null;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: null | string;
	season_number: number;
	vote_average: number;
}

export interface TvBaseResponse {
	adult: boolean;
	backdrop_path: string;
	created_by: CreatedBy[];
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: TEpisodeToAir;
	name: string;
	next_episode_to_air: TEpisodeToAir;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: Network[];
	production_countries: ProductionCountry[];
	seasons: Season[];
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}

export interface TvMultiFetchResponse extends TvBaseResponse {
	aggregate_credits: TvCredits;
	reviews: Reviews;
	recommendations: TvRecommendations;
}

export interface PersonMultiFetchResponse {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: null;
	gender: number;
	homepage: string;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
	combined_credits: CombinedCredits;
	images: Images;
}
export interface CombinedCredits {
	cast: Cast[];
	crew: Crew[];
}
export interface Crew {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: OriginalLanguage;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: Date;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	credit_id: string;
	department: string;
	job: string;
	media_type: MediaType;
}
export interface Cast {
	adult: boolean;
	backdrop_path: null | string;
	genre_ids: number[];
	id: number;
	original_language: OriginalLanguage;
	original_title?: string;
	overview: string;
	popularity: number;
	poster_path: null | string;
	release_date?: string;
	title?: string;
	video?: boolean;
	vote_average: number;
	vote_count: number;
	character: string;
	credit_id: string;
	order?: number;
	media_type: MediaType;
	origin_country?: string[];
	original_name?: string;
	first_air_date?: Date;
	name?: string;
	episode_count?: number;
}

export interface Images {
	profiles: Profile[];
}

export interface Profile {
	aspect_ratio: number;
	height: number;
	iso_639_1: null;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}

export interface SearchKeywordResponse {
	page: number;
	results: SearchKeywordResult[];
	total_pages: number;
	total_results: number;
}

export interface SearchKeywordResult {
	id: number;
	name: string;
}

export interface UserInfoType {
	name: string;
	email: string;
	city: string | undefined;
	country: string | undefined;
	avatar: string | undefined;
}

export interface UserInfoRes {
	name: string;
	email: string;
	city: string;
	country: string;
	exp: string;
}

export interface UserAvatarAction {
	msg: string;
	image: {
		src: string;
	};
}
export interface HomeLatestTrailer {
	poster_path: string;
	id: number;
	original_title: string;
	trailer: string[];
}

export interface HomeLatestTrailerRes {
	results: {
		results: HomeLatestTrailer[];
		page: number;
		total_pages: number;
		total_results: number;
	};
}
