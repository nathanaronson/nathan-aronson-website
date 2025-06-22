# Nathan Aronson - Personal Website

A modern, responsive personal website built with React, featuring a dark theme with geometric background elements and smooth animations.

## Features

- **Modern React Architecture**: Built with React 18 and Vite for optimal performance
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark Theme**: Elegant dark design with layered geometric backgrounds
- **Smooth Animations**: Typing effects, slide-in animations, and interactive elements
- **Mobile-First**: Hamburger menu and touch-friendly interactions
- **Performance Optimized**: Fast loading with modern build tools

## Sections

- **Navigation**: Smart navbar that hides on scroll down, shows on scroll up
- **Hero**: Animated greeting with typing effect and profile image
- **About**: Personal introduction and background
- **Timeline**: Professional experience with animated timeline
- **Projects**: Portfolio of projects with hover effects
- **Footer**: Social links and contact information

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with animations and responsive design
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Playfair Display, Source Serif Pro)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Timeline.jsx
│   ├── Projects.jsx
│   └── Footer.jsx
├── css/
│   └── main.css        # Main stylesheet
├── assets/             # Images and static assets
├── App.jsx             # Main App component
└── main.jsx            # Application entry point
```

## Customization

### Content Updates

- **Personal Information**: Update content in individual component files
- **Images**: Replace images in `src/assets/` directory
- **Colors**: Modify CSS variables in `src/css/main.css`
- **Animations**: Adjust timing and effects in CSS animations

### Styling

The website uses a modular CSS approach with:
- Responsive grid layouts
- CSS animations and transitions
- Mobile-first media queries
- Geometric background patterns

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size with Vite
- Lazy loading for images
- Efficient CSS animations
- Mobile-optimized assets

## Deployment

The application can be deployed to any static hosting service:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

## License

MIT License - see LICENSE file for details

## Contact

Nathan Aronson
- Email: narons@seas.upenn.edu
- LinkedIn: [linkedin.com/in/nathanaronson](https://linkedin.com/in/nathanaronson)
- GitHub: [github.com/nathanaronson](https://github.com/nathanaronson) 