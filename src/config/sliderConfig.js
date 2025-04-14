/**
 * Slider Configuration
 *
 * This file contains all the configurable options for the slider component.
 * Developers can modify these values to customize the slider behavior and appearance.
 */

// Titles for each slide
const titles =
    [
        "Newshub - A Newspaper Website",
        "Came - Cafe Management Website",
        "Abhishek Jha's portfolio",
        "Coming soon",
        "Coming soon",
        // "Sunlit Coastal Reverie",
        // "Veil of Forgotten Frames",
        // "Shades of Timeless Click",
        // "Enigma in Scarlet Glow",
        // "Molten Amber Vortex",
        // "The Revival Ensemble"
    ]

const exps =
    [
        "1",
        "3",
        "1",
        "x",
        "x",
        // "Sunlit Coastal Reverie",
        // "Veil of Forgotten Frames",
        // "Shades of Timeless Click",
        // "Enigma in Scarlet Glow",
        // "Molten Amber Vortex",
        // "The Revival Ensemble"
    ]

const sliderConfig = {
    // Number of slides in the slider
    totalSlides: titles.length,

    // Titles for each slide
    titles: titles,

    exps: exps,

    nav: [
        "Work",
        "About"
    ],

    // Animation timing configurations
    animation: {
        // Duration of the initial loading animation
        initialLoadDuration: 2.25,

        // Duration of slide transitions
        slideTransitionDuration: 1,

        // Duration of slide transitions
        aboveTransitionDuration: 1.25,

        // Duration of counter and title transitions
        counterTransitionDuration: 1,

        // Delay between staggered animations
        staggerDelay: 0.15,

        // Scale factor for the container during animation
        containerScale: 5
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
