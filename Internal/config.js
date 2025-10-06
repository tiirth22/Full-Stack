// TMDB API Configuration
const API_CONFIG = {
    // Get your API key from https://www.themoviedb.org/settings/api
    API_KEY: 'YOUR_TMDB_API_KEY_HERE', // Replace with your actual API key
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    YOUTUBE_BASE_URL: 'https://www.youtube.com/embed'
};

// Image sizes
const IMAGE_SIZES = {
    poster: {
        small: '/w154',
        medium: '/w342',
        large: '/w500',
        xlarge: '/w780'
    },
    backdrop: {
        small: '/w300',
        medium: '/w780',
        large: '/w1280',
        original: '/original'
    }
};

// API endpoints
const API_ENDPOINTS = {
    trending: '/trending/all/week',
    popularMovies: '/movie/popular',
    topRatedMovies: '/movie/top_rated',
    popularTV: '/tv/popular',
    moviesByGenre: '/discover/movie',
    movieDetails: '/movie',
    tvDetails: '/tv',
    movieVideos: '/movie/{id}/videos',
    tvVideos: '/tv/{id}/videos',
    search: '/search/multi'
};

// Genre IDs
const GENRES = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scienceFiction: 878,
    thriller: 53,
    war: 10752,
    western: 37
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, IMAGE_SIZES, API_ENDPOINTS, GENRES };
}