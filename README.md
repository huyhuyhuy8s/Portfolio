# React GSAP Slider

A customizable image slider built with React and GSAP animations.

## Features

- Smooth GSAP animations
- Configurable number of slides
- Customizable titles and images
- Responsive design
- Developer-friendly configuration

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd react_gsap

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Customization

The slider can be easily customized by modifying the configuration file at `src/config/sliderConfig.js`.

### Available Configuration Options

#### Number of Slides

```javascript
// Change the total number of slides
totalSlides: 5,
```

#### Slide Titles

```javascript
// Modify the titles for each slide
titles: [
  "The Revival Ensemble",
  "Above The Canvas",
  "Harmony in Every Note",
  "Redefining Imagination",
  "From Earth to Expression"
],
```

#### Animation Settings

```javascript
// Adjust animation timing and effects
animation: {
  // Duration of the initial loading animation
  initialLoadDuration: 3,

  // Duration of slide transitions
  slideTransitionDuration: 1.5,

  // Duration of counter and title transitions
  counterTransitionDuration: 1,

  // Delay between staggered animations
  staggerDelay: 0.25,

  // Scale factor for the container during animation
  containerScale: 5.178
},
```

#### Image Paths

```javascript
// Configure image paths
imagePaths: {
  // Base path for images (relative to public/assets)
  basePath: "/assets/img",

  // File extension
  extension: ".jpg"
}
```

### Adding or Removing Slides

1. Update the `totalSlides` value in `sliderConfig.js`
2. Add or remove corresponding titles in the `titles` array
3. Add or remove image files in the `public/assets` directory

## Performance Optimization

The slider uses GSAP's `useGSAP` hook with `contextSafe` for better performance and proper cleanup. This helps prevent memory leaks and ensures smooth animations.

## License

MIT
