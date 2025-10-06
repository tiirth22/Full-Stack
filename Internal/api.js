// TMDB API Service
class TMDBService {
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
        this.apiKey = API_CONFIG.API_KEY;
        this.imageBaseUrl = API_CONFIG.IMAGE_BASE_URL;
    }

    // Helper method to build API URLs
    buildUrl(endpoint, params = {}) {
        const url = new URL(this.baseUrl + endpoint);
        url.searchParams.append('api_key', this.apiKey);
        
        // Add additional parameters
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
        
        return url.toString();
    }

    // Helper method to get image URL
    getImageUrl(path, size = 'medium', type = 'poster') {
        if (!path) return './assets/no-image-placeholder.jpg';
        const sizeValue = IMAGE_SIZES[type][size] || IMAGE_SIZES[type].medium;
        return `${this.imageBaseUrl}${sizeValue}${path}`;
    }

    // Generic fetch method with error handling
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API fetch error:', error);
            throw error;
        }
    }

    // Get trending content
    async getTrending(timeWindow = 'week') {
        const url = this.buildUrl(API_ENDPOINTS.trending.replace('/week', `/${timeWindow}`));
        return await this.fetchData(url);
    }

    // Get popular movies
    async getPopularMovies(page = 1) {
        const url = this.buildUrl(API_ENDPOINTS.popularMovies, { page });
        return await this.fetchData(url);
    }

    // Get top rated movies
    async getTopRatedMovies(page = 1) {
        const url = this.buildUrl(API_ENDPOINTS.topRatedMovies, { page });
        return await this.fetchData(url);
    }

    // Get popular TV shows
    async getPopularTV(page = 1) {
        const url = this.buildUrl(API_ENDPOINTS.popularTV, { page });
        return await this.fetchData(url);
    }

    // Get movies by genre
    async getMoviesByGenre(genreId, page = 1) {
        const params = {
            with_genres: genreId,
            page: page,
            sort_by: 'popularity.desc'
        };
        const url = this.buildUrl(API_ENDPOINTS.moviesByGenre, params);
        return await this.fetchData(url);
    }

    // Get movie details
    async getMovieDetails(movieId) {
        const endpoint = API_ENDPOINTS.movieDetails + `/${movieId}`;
        const url = this.buildUrl(endpoint, { append_to_response: 'credits,videos' });
        return await this.fetchData(url);
    }

    // Get TV show details
    async getTVDetails(tvId) {
        const endpoint = API_ENDPOINTS.tvDetails + `/${tvId}`;
        const url = this.buildUrl(endpoint, { append_to_response: 'credits,videos' });
        return await this.fetchData(url);
    }

    // Get movie videos (trailers)
    async getMovieVideos(movieId) {
        const endpoint = API_ENDPOINTS.movieVideos.replace('{id}', movieId);
        const url = this.buildUrl(endpoint);
        return await this.fetchData(url);
    }

    // Get TV show videos (trailers)
    async getTVVideos(tvId) {
        const endpoint = API_ENDPOINTS.tvVideos.replace('{id}', tvId);
        const url = this.buildUrl(endpoint);
        return await this.fetchData(url);
    }

    // Search for movies and TV shows
    async search(query, page = 1) {
        const params = {
            query: encodeURIComponent(query),
            page: page
        };
        const url = this.buildUrl(API_ENDPOINTS.search, params);
        return await this.fetchData(url);
    }

    // Get YouTube trailer URL
    getTrailerUrl(videos) {
        if (!videos || !videos.results || videos.results.length === 0) {
            return null;
        }

        // Find the first trailer or teaser
        const trailer = videos.results.find(video => 
            video.site === 'YouTube' && 
            (video.type === 'Trailer' || video.type === 'Teaser')
        );

        if (trailer) {
            return `${API_CONFIG.YOUTUBE_BASE_URL}/${trailer.key}?autoplay=1&mute=1`;
        }

        return null;
    }

    // Format runtime (minutes to hours and minutes)
    formatRuntime(minutes) {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        if (hours === 0) {
            return `${remainingMinutes}m`;
        } else if (remainingMinutes === 0) {
            return `${hours}h`;
        } else {
            return `${hours}h ${remainingMinutes}m`;
        }
    }

    // Format release date
    formatReleaseDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.getFullYear();
    }

    // Get content rating (safely handle undefined ratings)
    getContentRating(voteAverage) {
        if (!voteAverage) return 'N/A';
        return voteAverage.toFixed(1);
    }

    // Truncate text to specified length
    truncateText(text, maxLength = 150) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    // Get genres as string
    getGenresString(genres) {
        if (!genres || genres.length === 0) return '';
        return genres.map(genre => genre.name).join(', ');
    }
}

// Initialize API service
const tmdbService = new TMDBService();