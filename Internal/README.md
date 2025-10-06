# Netflix Clone Project

A feature-rich Netflix clone built with vanilla HTML, CSS, and JavaScript, integrating with The Movie Database (TMDB) API for real movie and TV show data.

## 🎬 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real Movie Data**: Fetches current movies and TV shows from TMDB API
- **Animated Content Rows**: Smooth horizontal scrolling with Netflix-style animations
- **Video Trailers**: Watch YouTube trailers in modal popups
- **Search Functionality**: Search for movies and TV shows
- **Multiple Categories**: 
  - Trending content
  - Popular movies
  - Top-rated movies
  - Popular TV shows
  - Genre-based content (Action, Comedy, etc.)

## 🚀 Setup Instructions

### 1. Get TMDB API Key

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings > API
4. Request an API key
5. Copy your API key

### 2. Configure the Project

1. Open `js/config.js`
2. Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key:
   ```javascript
   API_KEY: 'your_actual_api_key_here'
   ```

### 3. Install Dependencies (Optional)

If you want to use the development server:

```bash
npm install
npm start
```

### 4. Open the Project

Simply open `index.html` in your web browser, or use a local server.

## 📁 Project Structure

```
Netflix-Clone/
├── index.html          # Main HTML file
├── package.json        # Project dependencies
├── styles/
│   └── main.css       # All CSS styles
├── js/
│   ├── config.js      # API configuration
│   ├── api.js         # API service functions
│   ├── ui.js          # UI components and interactions
│   └── main.js        # Main application logic
└── assets/
    ├── netflix-logo.png
    ├── netflix-favicon.ico
    └── profile-avatar.png
```

## 🎯 Key Components

### Navigation Bar
- Netflix-style responsive navbar
- Search functionality
- Profile menu with dropdown

### Hero Banner
- Featured content with background image
- Play and More Info buttons
- Automatic content rotation

### Content Rows
- Horizontal scrolling containers
- Smooth animations
- Navigation arrows
- Responsive card layout

### Trailer Modal
- YouTube video integration
- Content details display
- Responsive design

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: The Movie Database (TMDB) API
- **Styling**: CSS Flexbox, CSS Grid, Custom animations
- **Icons**: Inline SVG icons
- **Fonts**: Google Fonts (Netflix Sans alternative)

## 🌐 Deployment

### Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in project directory:
   ```bash
   firebase init hosting
   ```

4. Deploy:
   ```bash
   firebase deploy
   ```

### GitHub Pages

1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

## 📝 Environment Variables

For production deployment, make sure to:

1. Keep your API key secure
2. Consider using environment variables for the API key
3. Set up proper CORS headers if needed

## 🐛 Troubleshooting

### Common Issues

1. **Movies not loading**: Check your API key in `config.js`
2. **CORS errors**: Ensure you're serving the files through a web server
3. **Videos not playing**: Check the YouTube video IDs and availability

### Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for learning purposes.

## 📄 License

This project is for educational purposes only. Not affiliated with Netflix Inc.

## 🙏 Acknowledgments

- The Movie Database (TMDB) for providing the API
- Netflix for design inspiration
- Google Fonts for typography

---

**Note**: This is a clone for educational purposes and is not affiliated with Netflix Inc.