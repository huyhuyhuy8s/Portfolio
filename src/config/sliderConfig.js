/**
 * Slider Configuration
 *
 * This file contains all the configurable options for the slider component.
 * Developers can modify these values to customize the slider behavior and appearance.
 */

const sliderConfig = {
    // Number of slides in the slider
    totalSlides: 8,

    // Titles for each slide
    titles: [
        "Lens of Eternity",
        "Crimson Dream Capture",
        "Mirrored Starlight Echoes",
        "Whispers of Departure",
        "Sunlit Coastal Reverie",
        "Veil of Forgotten Frames",
        "Shades of Timeless Click",
        "Enigma in Scarlet Glow",
        // "Molten Amber Vortex",
        // "The Revival Ensemble"
    ],

    // Animation timing configurations
    animation: {
        // Duration of the initial loading animation
        initialLoadDuration: 2.5,

        // Duration of slide transitions
        slideTransitionDuration: 1.5,

        // Duration of counter and title transitions
        counterTransitionDuration: 1,

        // Delay between staggered animations
        staggerDelay: 0.25,

        // Scale factor for the container during animation
        containerScale: 5.178
    },

    // Image paths (relative to public/assets)
    imagePaths: {
        // If you want to use different image paths, you can modify this
        // The format is used as: `${imagePaths.basePath}${index}${imagePaths.extension}`
        basePath: "/assets/img",
        extension: ".jpg"
    }
};

export default sliderConfig;
