// UI Components and Interactions
class NetflixUI {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.searchBtn = document.getElementById('search-btn');
        this.searchInput = document.getElementById('search-input');
        this.heroBanner = document.getElementById('hero-banner');
        this.bannerTitle = document.getElementById('banner-title');
        this.bannerDescription = document.getElementById('banner-description');
        this.modal = document.getElementById('trailer-modal');
        this.modalOverlay = document.getElementById('modal-overlay');
        this.modalClose = document.getElementById('modal-close');
        this.trailerIframe = document.getElementById('trailer-iframe');
        this.loadingScreen = document.getElementById('loading-screen');

        this.currentBannerContent = null;
        this.searchTimeout = null;

        this.initializeEventListeners();
        this.initializeNavbar();
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Search functionality
        this.searchBtn.addEventListener('click', () => this.toggleSearch());
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('blur', () => this.hideSearch());

        // Modal events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', () => this.closeModal());

        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Row navigation
        this.initializeRowNavigation();

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    // Handle navbar scroll effect
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    // Toggle search input
    toggleSearch() {
        this.searchInput.classList.toggle('active');
        if (this.searchInput.classList.contains('active')) {
            this.searchInput.focus();
        }
    }

    // Hide search input
    hideSearch() {
        setTimeout(() => {
            this.searchInput.classList.remove('active');
            this.searchInput.value = '';
        }, 150);
    }

    // Handle search input
    handleSearch(query) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(async () => {
            if (query.length > 2) {
                try {
                    const results = await tmdbService.search(query);
                    this.displaySearchResults(results.results);
                } catch (error) {
                    console.error('Search error:', error);
                }
            }
        }, 300);
    }

    // Display search results
    displaySearchResults(results) {
        // For now, log results. In a full implementation, you'd create a search results overlay
        console.log('Search results:', results);
    }

    // Handle keyboard events
    handleKeyPress(e) {
        if (e.key === 'Escape') {
            this.closeModal();
            this.hideSearch();
        }
    }

    // Initialize row navigation
    initializeRowNavigation() {
        const rows = document.querySelectorAll('.row');
        
        rows.forEach(row => {
            const prevBtn = row.querySelector('.prev-btn');
            const nextBtn = row.querySelector('.next-btn');
            const rowContent = row.querySelector('.row-content');

            if (prevBtn && nextBtn && rowContent) {
                prevBtn.addEventListener('click', () => this.scrollRow(rowContent, 'prev'));
                nextBtn.addEventListener('click', () => this.scrollRow(rowContent, 'next'));
            }
        });
    }

    // Scroll row content
    scrollRow(rowContent, direction) {
        const cardWidth = 208; // Card width + gap
        const scrollAmount = cardWidth * 4; // Scroll 4 cards at a time
        
        if (direction === 'prev') {
            rowContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            rowContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    // Create content card
    createContentCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.setAttribute('data-id', item.id);
        card.setAttribute('data-type', item.media_type || (item.title ? 'movie' : 'tv'));

        const imageUrl = tmdbService.getImageUrl(item.poster_path, 'medium', 'poster');
        const title = item.title || item.name;
        const rating = tmdbService.getContentRating(item.vote_average);
        const releaseDate = tmdbService.formatReleaseDate(item.release_date || item.first_air_date);

        card.innerHTML = `
            <img src="${imageUrl}" alt="${title}" class="card-image" loading="lazy">
            <div class="card-overlay">
                <h3 class="card-title">${title}</h3>
                <div class="card-info">
                    <span class="card-rating">${rating}</span>
                    <span class="card-year">${releaseDate}</span>
                </div>
            </div>
        `;

        // Add click event for modal
        card.addEventListener('click', () => this.openModal(item));

        return card;
    }

    // Populate content row
    populateRow(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Create and append cards
        items.forEach(item => {
            const card = this.createContentCard(item);
            container.appendChild(card);
        });
    }

    // Set hero banner content
    setBannerContent(item) {
        if (!item) return;

        this.currentBannerContent = item;
        const backgroundUrl = tmdbService.getImageUrl(item.backdrop_path, 'original', 'backdrop');
        const title = item.title || item.name;
        const description = tmdbService.truncateText(item.overview, 200);

        // Set background image
        this.heroBanner.style.backgroundImage = `url(${backgroundUrl})`;
        
        // Set text content
        this.bannerTitle.textContent = title;
        this.bannerDescription.textContent = description;

        // Add event listeners to banner buttons
        const playBtn = document.getElementById('play-btn');
        const infoBtn = document.getElementById('info-btn');

        playBtn.onclick = () => this.openModal(item);
        infoBtn.onclick = () => this.openModal(item);
    }

    // Open trailer modal
    async openModal(item) {
        try {
            this.showLoading();

            const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
            let details, videos;

            if (mediaType === 'movie') {
                details = await tmdbService.getMovieDetails(item.id);
                videos = await tmdbService.getMovieVideos(item.id);
            } else {
                details = await tmdbService.getTVDetails(item.id);
                videos = await tmdbService.getTVVideos(item.id);
            }

            this.hideLoading();
            this.displayModal(details, videos);

        } catch (error) {
            console.error('Error opening modal:', error);
            this.hideLoading();
            this.showError('Failed to load content details');
        }
    }

    // Display modal with content
    displayModal(details, videos) {
        const trailerUrl = tmdbService.getTrailerUrl(videos);
        const title = details.title || details.name;
        const description = details.overview;
        const rating = tmdbService.getContentRating(details.vote_average);
        const releaseDate = tmdbService.formatReleaseDate(details.release_date || details.first_air_date);
        const runtime = tmdbService.formatRuntime(details.runtime || details.episode_run_time?.[0]);
        const genres = tmdbService.getGenresString(details.genres);

        // Set modal content
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = description;
        document.getElementById('modal-rating').textContent = `★ ${rating}`;
        document.getElementById('modal-release-date').textContent = releaseDate;
        document.getElementById('modal-runtime').textContent = runtime;

        // Set genres
        const genresContainer = document.getElementById('modal-genres');
        genresContainer.innerHTML = '';
        if (details.genres) {
            details.genres.forEach(genre => {
                const genreTag = document.createElement('span');
                genreTag.className = 'genre-tag';
                genreTag.textContent = genre.name;
                genresContainer.appendChild(genreTag);
            });
        }

        // Set trailer
        if (trailerUrl) {
            this.trailerIframe.src = trailerUrl;
        } else {
            this.trailerIframe.src = '';
            this.showError('No trailer available for this content');
        }

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    closeModal() {
        this.modal.classList.remove('active');
        this.trailerIframe.src = '';
        document.body.style.overflow = 'auto';
    }

    // Show loading screen
    showLoading() {
        this.loadingScreen.classList.remove('hidden');
    }

    // Hide loading screen
    hideLoading() {
        this.loadingScreen.classList.add('hidden');
    }

    // Show error message
    showError(message) {
        // Create a simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--netflix-red);
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        errorDiv.textContent = message;

        document.body.appendChild(errorDiv);

        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Handle window resize
    handleResize() {
        // Recalculate card positions if needed
        // This is useful for responsive behavior
    }

    // Initialize navbar behavior
    initializeNavbar() {
        // Add active state to current page link
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Utility method to format numbers
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Lazy load images when they enter viewport
    initializeLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize UI when DOM is loaded
let netflixUI;

document.addEventListener('DOMContentLoaded', () => {
    netflixUI = new NetflixUI();
});