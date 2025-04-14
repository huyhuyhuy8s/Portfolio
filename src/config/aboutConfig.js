/**
 * About Me Configuration
 *
 * This file contains all the configurable options for the About Me section.
 * Developers can modify these values to customize the content and appearance
 * of the About Me and related sections on the website.
 */

const aboutMe = {
  // Class name for the About Me section
  className: "about-me",

  // Content for the About Me section, structured as an array of arrays
  // Each inner array represents a group of text lines for display
  content: [
    [
      "I am a dedicated front-end",
      "developer intern with hands-on",
      "experience in React, JavaScript,",
      "and modern web technologies.",
    ],
    [
      "I am always striving to learn about",
      "the field's newest and cutting edge",
      "technologies and frameworks.",
    ],
    [
      "I am passionate about creating",
      "user-friendly interfaces and eager",
      "to contribute to innovative web",
      "development initiatives.",
    ],
  ],
};

const aboutSections = [
  {
    // Class name for the Education section
    className: "education",

    // Title of the section
    title: "Education",

    // Content for the Education section
    content: [
      {
        outer: [
          "Engineer of Information Technology",
          "HCMC University of Education",
          "and Technology",
        ],
        subText: "2022 - 2026",
      },
    ],
  },
  {
    // Class name for the Projects section
    className: "projects",

    // Title of the section
    title: "Projects",

    // Content for the Projects section
    content: [
      {
        outer: ["Personal Portfolio", "Based on Camille Mormal"],
        subText: "Apr 2025 - Present",
      },
      {
        outer: ["Came", "A Cafe Managements"],
        subText: "Jan 2025 - Present",
      },
      {
        outer: ["Newshub", "Newspaper Hub"],
        subText: "Nov 2024 - Dec 2024",
      },
    ],
  },
  {
    // Class name for the Certifications section
    className: "certifications",

    // Title of the section
    title: "Certifications",

    // Content for the Certifications section
    content: [
      {
        outer: ["Full Stack Web Development", "University of Helsinki"],
        subText: "April 2025",
      },
    ],
  },
  {
    // Class name for the References section
    className: "references",

    // Title of the section
    title: "References",

    // Content for the References section
    content: [
      {
        outer: ["Ideal and Motion Portfolio", "inspired by"],
        subText: "Camille Mormal's Portfolio",
        link: "https://camillemormal.com",
      },
    ],
  },
];

const aboutConfig = {
  aboutMe: aboutMe,
  aboutSections: aboutSections
}

export default aboutConfig;
