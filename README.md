# Nathan Aronson - Personal Website

A modern, responsive single-page personal website built with HTML, CSS, and JavaScript. Features a high-contrast dark theme with elegant typography and geometric background elements.

**Live Site**: [https://www.seas.upenn.edu/~narons/](https://www.seas.upenn.edu/~narons/)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern Dark Theme**: High-contrast dark color scheme with elegant typography
- **Geometric Backgrounds**: Subtle geometric arcs and lines for visual interest
- **Smooth Scrolling**: Smooth navigation between sections
- **Interactive Elements**: Hover effects, animations, and mobile navigation
- **Accessibility**: Semantic HTML and accessibility best practices
- **Performance Optimized**: Lightweight and fast loading

## 📁 File Structure

```
website/
├── index.html          # Main HTML structure
├── src/
│   ├── css/
│   │   └── main.css    # CSS styling and responsive design
│   ├── js/
│   │   └── main.js     # JavaScript functionality
│   └── assets/         # Images and media files
│       ├── headshot.jpeg
│       ├── burns.png
│       ├── penn.png
│       └── per.png
├── package.json        # Project configuration
├── README.md           # This file
├── LICENSE             # MIT License
└── .gitignore          # Git ignore rules
```

## 🎨 Design Specifications

### Color Scheme
- **Background**: #181818 (Dark gray)
- **Primary Text**: #ffffff (White)
- **Secondary Text**: #cccccc (Light gray)
- **Accent**: #888888 (Medium gray)
- **Cards**: #222222 (Dark card background)
- **Footer**: #111111 (Darker footer background)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body Text**: Source Serif Pro (Serif)
- **Font Weights**: 400 (Regular), 600 (Semi-bold), 700 (Bold)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (version 14 or higher) - Optional, for development server
- npm or yarn - Optional, for development dependencies

### Quick Start
1. **Clone or Download**: Download all files to your local directory
2. **Open in Browser**: Simply open `index.html` in your web browser

### Development Setup
1. **Install Dependencies** (Optional):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:8000`

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with live reload
- `npm run build` - Build for deployment
- `npm run deploy` - Prepare for deployment

## 📱 Sections

### 1. Navigation Bar
- Fixed top navigation with Nathan's name on the left
- Navigation links on the right (home, about, timeline, projects, socials)
- Mobile hamburger menu for responsive design

### 2. Hero Section
- Large circular profile image on the left
- Greeting text and social icons on the right
- Animated scroll indicator
- Geometric background elements

### 3. About Section
- Large "about." heading
- Subheading about education
- Two paragraphs with styled text (bold, italic)
- Geometric background overlays

### 4. Timeline Section
- Vertical timeline with company icons
- Work experience entries with dates and details
- Connected timeline with dots and lines

### 5. Projects Section
- Project cards with icons and descriptions
- Technology stack information
- Bullet points for project details

### 6. Footer
- Dark background with social icons
- Copyright information
- "Let's Connect..." heading

## 🎯 Customization

### Updating Content
1. **Profile Image**: Replace `src/assets/headshot.jpeg` with your actual image
2. **Personal Information**: Update the text content in `index.html` with your information
3. **Social Links**: Update the href attributes in social icon links
4. **Projects**: Modify the project entries with your own projects
5. **Timeline**: Update work experience and education entries

### Styling Changes
1. **Colors**: Modify the CSS custom properties in `src/css/main.css`
2. **Fonts**: Change the Google Fonts import in `index.html`
3. **Layout**: Adjust grid layouts and spacing in `src/css/main.css`

### Adding New Sections
1. Add new section HTML in `index.html`
2. Add corresponding CSS styles in `src/css/main.css`
3. Update navigation menu if needed
4. Add any JavaScript functionality in `src/js/main.js`

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎨 Geometric Background Elements

The website features subtle geometric elements:
- **Arcs**: Semi-transparent curved borders
- **Lines**: Gradient lines with varying angles
- **Positioning**: Strategically placed for visual balance
- **Animation**: Subtle parallax effect on scroll

## 🚀 Performance Features

- **Optimized Images**: Use WebP format when possible
- **Minimal Dependencies**: Only Font Awesome for icons
- **Efficient CSS**: Optimized selectors and properties
- **Smooth Animations**: Hardware-accelerated transforms

## 📝 Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper alt text and ARIA labels
- **Color Contrast**: High contrast ratios for readability
- **Focus Indicators**: Visible focus states for interactive elements

## 🚀 Deployment

### Penn SEAS Hosting

This website is hosted on the University of Pennsylvania School of Engineering and Applied Science (SEAS) web server at [https://www.seas.upenn.edu/~narons/](https://www.seas.upenn.edu/~narons/).

### Alternative Hosting Options

1. **GitHub Pages**:
   - Push your code to a GitHub repository
   - Go to Settings > Pages
   - Select source branch (usually `main`)
   - Your site will be available at `https://username.github.io/repository-name`

2. **Netlify**:
   - Drag and drop the entire project folder to Netlify
   - Or connect your GitHub repository for automatic deployments

3. **Vercel**:
   - Connect your GitHub repository
   - Vercel will automatically deploy your site

4. **Custom Domain**:
   - Update the domain in your hosting provider settings
   - Update meta tags in `index.html` if needed

## 🔄 Future Enhancements

Potential improvements for the website:
- [ ] Add a blog section
- [ ] Implement a contact form
- [ ] Add portfolio gallery
- [ ] Include testimonials section
- [ ] Add dark/light theme toggle
- [ ] Implement lazy loading for images
- [ ] Add more interactive animations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this website.

---

**Built with ❤️ for Nathan Aronson's personal brand**

**Live Site**: [https://www.seas.upenn.edu/~narons/](https://www.seas.upenn.edu/~narons/) 