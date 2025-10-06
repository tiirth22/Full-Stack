// Main Application Logic
class NetflixApp {
    constructor() {
        this.isInitialized = false;
        this.contentCache = new Map();
        this.init();
    }

    // Initialize the application
    async init() {
        try {
            // Check if API key is configured
            if (!API_CONFIG.API_KEY || API_CONFIG.API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
                this.showAPIKeyError();
                return;
            }

            // Show loading screen
            netflixUI.showLoading();

            // Load all content simultaneously
            await Promise.all([
                this.loadTrendingContent(),
                this.loadPopularMovies(),
                this.loadTopRatedMovies(),
                this.loadPopularTV(),
                this.loadActionMovies(),
                this.loadComedyMovies()
            ]);

            // Set up hero banner
            await this.setupHeroBanner();

            // Hide loading screen
            netflixUI.hideLoading();

            this.isInitialized = true;
            console.log('Netflix Clone initialized successfully!');

        } catch (error) {
            console.error('Error initializing app:', error);
            netflixUI.hideLoading();
            netflixUI.showError('Failed to load content. Please check your internet connection and API key.');
        }
    }

    // Load trending content
    async loadTrendingContent() {
        try {
            const data = await tmdbService.getTrending();
            this.contentCache.set('trending', data.results);
            netflixUI.populateRow('trending-content', data.results.slice(0, 20));
        } catch (error) {
            console.error('Error loading trending content:', error);
            this.handleLoadError('trending-content', 'Failed to load trending content');
        }
    }

    // Load popular movies
    async loadPopularMovies() {
        try {
            const data = await tmdbService.getPopularMovies();
            this.contentCache.set('popular-movies', data.results);
            netflixUI.populateRow('popular-movies-content', data.results.slice(0, 20));
        } catch (error) {
            console.error('Error loading popular movies:', error);
            this.handleLoadError('popular-movies-content', 'Failed to load popular movies');
        }
    }

    // Load top rated movies
    async loadTopRatedMovies() {
        try {
            const data = await tmdbService.getTopRatedMovies();
            this.contentCache.set('top-rated-movies', data.results);
            netflixUI.populateRow('top-rated-movies-content', data.results.slice(0, 20));
        } catch (error) {
            console.error('Error loading top rated movies:', error);
            this.handleLoadError('top-rated-movies-content', 'Failed to load top rated movies');
        }
    }

    // Load popular TV shows
    async loadPopularTV() {
        try {
            const data = await tmdbService.getPopularTV();
            this.contentCache.set('popular-tv', data.results);
            netflixUI.populateRow('popular-tv-content', data.results.slice(0, 20));
        } catch (error) {
            console.error('Error loading popular TV shows:', error);
            this.handleLoadError('popular-tv-content', 'Failed to load popular TV shows');
        }
    }

    // Load action movies
    async loadActionMovies() {
        try {
            const data = await tmdbService.getMoviesByGenre(GENRES.action);
            this.contentCache.set('action-movies', data.results);
            netflixUI.populateRow('action-movies-content', data.results.slice(0, 20));
        } catch (error) {
            console.error('Error loading action movies:', error);
            this.handleLoadError('action-movies-content', 'Failed to load action movies');
        }
    }

    // Load comedy movies
    async loadComedyMovies() {
        try {
            const data = await tmdbService.getMoviesByGenre(GENRES.comedy);
            this.contentCache.set('comedy-movies', data.results);
            netflixUI.populateRow('comedy-movies-content', data.results.slice(0, 20));
        } catch (error) {
            console.error('Error loading comedy movies:', error);
            this.handleLoadError('comedy-movies-content', 'Failed to load comedy movies');
        }
    }

    // Setup hero banner with featured content
    async setupHeroBanner() {
        try {
            // Get trending content for banner
            const trendingContent = this.contentCache.get('trending') || [];
            
            if (trendingContent.length > 0) {
                // Select a random popular item for the banner
                const featuredContent = trendingContent.find(item => 
                    item.backdrop_path && item.overview && (item.vote_average >= 7 || item.popularity > 100)
                ) || trendingContent[0];

                netflixUI.setBannerContent(featuredContent);
            }
        } catch (error) {
            console.error('Error setting up hero banner:', error);
            // Set a default banner if there's an error
            this.setDefaultBanner();
        }
    }

    // Set default banner content
    setDefaultBanner() {
        const defaultContent = {
            title: 'Welcome to Netflix Clone',
            overview: 'Discover thousands of movies and TV shows. Watch trending content, popular movies, and top-rated series all in one place.',
            backdrop_path: null
        };
        
        netflixUI.setBannerContent(defaultContent);
    }

    // Handle content loading errors
    handleLoadError(containerId, errorMessage) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 200px;
                    color: var(--netflix-light-gray);
                    font-size: 14px;
                ">
                    ${errorMessage}
                </div>
            `;
        }
    }

    // Show API key configuration error
    showAPIKeyError() {
        const errorMessage = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--netflix-dark-gray);
                color: var(--netflix-white);
                padding: 30px;
                border-radius: 8px;
                text-align: center;
                max-width: 500px;
                z-index: 10000;
                box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            ">
                <h2 style="color: var(--netflix-red); margin-bottom: 20px;">⚠️ API Key Required</h2>
                <p style="margin-bottom: 15px;">
                    To use this Netflix Clone, you need to configure your TMDB API key.
                </p>
                <ol style="text-align: left; margin: 20px 0; padding-left: 20px;">
                    <li>Visit <a href="https://www.themoviedb.org/" target="_blank" style="color: var(--netflix-red);">themoviedb.org</a></li>
                    <li>Create a free account</li>
                    <li>Go to Settings > API</li>
                    <li>Request an API key</li>
                    <li>Replace the API key in <code>js/config.js</code></li>
                </ol>
                <p style="font-size: 12px; color: var(--netflix-light-gray);">
                    Open <code>js/config.js</code> and replace <code>'YOUR_TMDB_API_KEY_HERE'</code> with your actual API key.
                </p>
                <button onclick="window.location.reload()" style="
                    background: var(--netflix-red);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    margin-top: 20px;
                    cursor: pointer;
                ">
                    Reload Page
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', errorMessage);
    }

    // Search functionality
    async searchContent(query) {
        try {
            const results = await tmdbService.search(query);
            return results.results;
        } catch (error) {
            console.error('Search error:', error);
            netflixUI.showError('Search failed. Please try again.');
            return [];
        }
    }

    // Get content by genre
    async getContentByGenre(genreId, page = 1) {
        try {
            const results = await tmdbService.getMoviesByGenre(genreId, page);
            return results.results;
        } catch (error) {
            console.error('Error fetching content by genre:', error);
            return [];
        }
    }

    // Refresh content
    async refreshContent() {
        try {
            netflixUI.showLoading();
            
            // Clear cache
            this.contentCache.clear();
            
            // Reload all content
            await this.init();
            
        } catch (error) {
            console.error('Error refreshing content:', error);
            netflixUI.hideLoading();
            netflixUI.showError('Failed to refresh content');
        }
    }

    // Get cached content
    getCachedContent(key) {
        return this.contentCache.get(key) || [];
    }

    // Preload more content for infinite scroll (future enhancement)
    async preloadMoreContent(category, page) {
        try {
            let results;
            
            switch (category) {
                case 'trending':
                    results = await tmdbService.getTrending();
                    break;
                case 'popular-movies':
                    results = await tmdbService.getPopularMovies(page);
                    break;
                case 'top-rated-movies':
                    results = await tmdbService.getTopRatedMovies(page);
                    break;
                case 'popular-tv':
                    results = await tmdbService.getPopularTV(page);
                    break;
                default:
                    return [];
            }
            
            return results.results || [];
            
        } catch (error) {
            console.error('Error preloading content:', error);
            return [];
        }
    }

    // Get app status
    getStatus() {
        return {
            initialized: this.isInitialized,
            cacheSize: this.contentCache.size,
            cachedCategories: Array.from(this.contentCache.keys())
        };
    }
}

// Error handling for uncaught exceptions
window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    if (window.netflixUI) {
        netflixUI.showError('An unexpected error occurred');
    }
});

// Initialize the application when DOM is loaded
let netflixApp;

document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for UI to initialize
    setTimeout(() => {
        netflixApp = new NetflixApp();
    }, 100);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Commented out for now - can be implemented later for offline functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export for debugging purposes
window.netflixApp = netflixApp;