import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import "../sass/main.sass";
import LocomotiveScroll from "locomotive-scroll";

// Configs
import sliderConfig from "../config/sliderConfig";
import aboutConfig from "../config/aboutConfig";

// Components
import About from "./about/About";
import Screen from "./screens/Screen";
import Container from "./container/Container";

// Helper
import Nav from "./nav/Nav";
import Sliders from "./sliders/Sliders";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create(
  "hop",
  "M0,0 C0.071,0.505  0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
);

const Slider = () => {
  const [first, setFirst] = useState(false);
  const [currentImg, setCurrentImg] = useState(1);
  const [currentNav, setCurrentNav] = useState(1);
  const [currentExp, setCurrentExp] = useState(1);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const sliderImagesRef = useRef(null);
  const counterRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const indicatorsRef = useRef(null);
  const indicatorRotation = useRef(0);
  const navRef = useRef(null);
  const aboutRef = useRef(null);
  const scrollRef = React.createRef();

  // Use GSAP with contextSafe for better performance and cleanup
  useGSAP(
    (context, contextSafe) => {
      //#region Loader animation timeline
      const loader = contextSafe(() => {
        console.log("Run loader");
        gsap.set(".about", { zIndex: -1 });
        gsap.set(".screen-main", {
          zIndex: 89,
          top: 0,
        });
        gsap.set(".container", {
          scale: 1,
          opacity: 1,
          zIndex: 90,
        });
        gsap.set(".col", { opacity: 0 });

        let tl = gsap.timeline({ delay: 0 });
        tl.to(
          ".container",
          { zIndex: 90, duration: 1, ease: "expo.inOut" },
          "<"
        );
        tl.to(".col", { duration: 0, opacity: 1 }, ">");
        tl.to(".slider-elem", { duration: 0, opacity: 1 }, "<");
        tl.to(
          ".col",
          {
            left: "-2em",
            top: "-2em",
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "expo.inOut",
          },
          "-=1"
        );
        tl.to(
          ".c-3 .item",
          {
            top: 0,
            stagger: sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "expo.inOut",
          },
          "-=2"
        );
        tl.to(
          ".c-1 .item",
          {
            top: 0,
            stagger: sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "expo.inOut",
          },
          "-=2.5"
        );
        tl.to(
          ".c-5 .item",
          {
            top: 0,
            stagger: sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "expo.inOut",
          },
          "<"
        );
        tl.to(
          ".c-2 .item",
          {
            top: 0,
            stagger: -sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "expo.inOut",
          },
          "-=2.5"
        );
        tl.to(
          ".c-4 .item",
          {
            top: 0,
            stagger: -sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "expo.inOut",
          },
          "<"
        );
        tl.set(".slider-title-wrapper, .preview img, .slider-counter>div", {
          top: "200%",
        });
        tl.set(".slider-indicators p, .nav-item a", { top: 60 });

        tl.to(
          ".container",
          {
            scale: sliderConfig.animation.containerScale,
            duration: 4,
            ease: "power4.inOut",
          },
          "-=2.75"
        );

        tl.to(
          ".screen-main",
          {
            opacity: 0,
            zIndex: -1,
            duration: 0.2,
            ease: "expo.inOut",
          },
          "-=0.8"
        );

        tl.to(
          ".container",
          {
            opacity: 0,
            zIndex: -1,
            ease: "power3.out",
          },
          "-=0.5"
        );

        tl.to(
          ".slider-title-wrapper, .nav-item a, .slider-indicators p, .preview img, .slider-counter>div",
          {
            top: 0,
            stagger: 0.075,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );

        tl.from(
          ".preview",
          { "--opacity-prev": 0, duration: 1, ease: "expo.inOut" },
          "-=1"
        );

        tl.to(
          ".slider-indicators p",
          {
            scale: 1,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=1"
        );
      });
      //#endregion

      // Run the loader animation
      if (!first) {
        setFirst(true);
        loader();
      }
    },
    { scope: sliderRef, dependencies: [first] }
  );

  useGSAP(() => {
    new LocomotiveScroll({
      el: aboutRef.current,
      smooth: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });
  });

  // Nav update
  useGSAP(
    (context, contextSafe) => {
      const updateNav = contextSafe(() => {
        console.log("run nav");
        const tl = gsap.timeline({ delay: 0 });
        tl.to(
          ".nav-item a",
          {
            opacity: 0.35,
            duration: 0.5,
            ease: "expo.inOut",
          },
          "<"
        );
        tl.to(
          ".active",
          {
            opacity: 1,
            duration: 0.5,
            ease: "expo.inOut",
          },
          "<"
        );
      });
      updateNav();
    },
    { scope: sliderRef, dependencies: [currentNav] }
  );

  // Nav About
  useGSAP(
    (context, contextSafe) => {
      const about = contextSafe(() => {
        console.log("Run About");
        gsap.set(".about", { opacity: 1, zIndex: 2 });
        gsap.set(".screen-alt", {
          opacity: 1,
          zIndex: 2,
          top: "100%",
        });

        const tl = gsap.timeline({ delay: 0 });
        tl.to(".slider-images", {
          top: "-50vh",
          duration: 1,
          ease: "power4.out",
        });
        tl.to(
          ".slider-title-wrapper, .preview img, .slider-counter>div",
          {
            top: `${sliderConfig.totalSlides * 100}%`,
            duration: 1.5,
            ease: "expo.inOut",
          },
          "<"
        );
        tl.to(
          ".preview, .slider-indicators",
          {
            "--opacity-prev": 0,
            duration: 1,
            ease: "expo.inOut",
          },
          "-=2"
        );
        tl.fromTo(
          ".screen-alt",
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%,  100% 100%, 0% 100%)",
            duration: sliderConfig.animation.aboveTransitionDuration,
            ease: "power4.out",
          },
          "-=1.5"
        );
        tl.to(
          ".screen-alt",
          {
            top: 0,
            duration: sliderConfig.animation.aboveTransitionDuration,
            ease: "power4.out",
          },
          "-=2"
        );
        tl.to(
          ".about",
          {
            top: 0,
            duration: 1.25,
            ease: "expo.inOut",
          },
          "-=1.5"
        );
        tl.fromTo(
          ".about-wrapper .inner",
          {
            top: "5.6458vw",
          },
          { top: 0, duration: 0.75, ease: hop, stagger: 0.1 },
          "-=0.5"
        );
      });
      if (first && currentNav === sliderConfig.nav.indexOf("About") + 1)
        about();
    },
    { scope: [sliderRef, aboutRef], dependencies: [currentNav] }
  );

  // Nav Work
  useGSAP(
    (context, contextSafe) => {
      const work = contextSafe(() => {
        console.log("Run work");
        const tl = gsap.timeline({ delay: 0 });
        tl.to(".screen-alt", {
          opacity: 0,
          duration: 1,
          zIndex: -1,
          ease: "power2.inOut",
        });
        tl.fromTo(
          ".slider-title-wrapper, .preview img, .slider-counter>div",
          {
            top: "-200%",
          },
          {
            top: "0",
            duration: 0.75,
            ease: "expo.inOut",
          },
          "<"
        );
        tl.to(
          ".preview, .slider-indicators",
          {
            "--opacity-prev": 1,
            duration: 1,
            ease: "expo.inOut",
          },
          "<"
        );
        tl.fromTo(
          ".slider-images",
          {
            top: 0,
            scale: 2,
          },
          {
            top: 0,
            scale: 1,
            duration: 1,
            ease: hop,
          },
          "-=1.5"
        );
        tl.to(
          ".about",
          {
            zIndex: -1,
            opacity: 0,
            top: "100%",
            duration: 1.5,
            ease: hop,
          },
          "-=2"
        );
      });
      if (first && currentNav === sliderConfig.nav.indexOf("Work") + 1) work();
    },
    { scope: sliderRef, dependencies: [currentNav] }
  );

  // Update counter and title position when currentImg changes
  useGSAP(
    (context, contextSafe) => {
      const updateCounterAndTitlePosition = contextSafe(() => {
        const titleHeight = document.querySelector(
          ".slider-title-wrapper .slider-title-wrapper-title"
        ).offsetHeight;
        const counterY = -40 * (currentImg - 1);
        const titleY = -titleHeight * (currentImg - 1);

        gsap.to(counterRef.current, {
          y: counterY,
          duration: sliderConfig.animation.counterTransitionDuration,
          ease: hop,
        });

        gsap.to(titleWrapperRef.current, {
          y: titleY,
          duration: sliderConfig.animation.counterTransitionDuration,
          ease: hop,
        });
      });

      updateCounterAndTitlePosition();
    },
    { dependencies: [currentImg], scope: sliderRef }
  );

  // Hover Exp title
  useGSAP(
    (context, contextSafe) => {
      const updateExp = contextSafe(() => {
        const wrappers = gsap.utils.toArray(".slider-title-wrapper-title");
        const elem = wrappers[currentExp - 1].children[0].children[0];
        gsap.to(elem, {
          top: 0,
          duration: 0.4,
          ease: "power4.inOut",
        });
      });
      const resetExp = contextSafe(() => {
        const wrappers = gsap.utils.toArray(".slider-title-wrapper-title");
        wrappers.forEach((wrapper) => {
          const elem = wrapper.children[0].children[0];
          gsap.to(elem, {
            top: -elem.offsetHeight,
            duration: 0.4,
            ease: "power4.inOut",
          });
        });
      });
      if (currentExp === 0) resetExp();
      else updateExp();
    },
    { dependencies: [currentExp] }
  );

  const cleanupSlides = () => {
    const imgElements = document.querySelectorAll(".slider-images .img");
    if (imgElements.length > sliderConfig.totalSlides) {
      imgElements[0].remove();
    }
  };

  const handleClick = (event) => {
    const sliderWidth = sliderRef.current.clientWidth;
    const clickPosition = event.clientX;
    const sliderPreview = document.querySelector(".slider-preview");

    if (sliderPreview.contains(event.target)) {
      const clickedPrev = event.target.closest(".preview");
      if (clickedPrev) {
        const clickedIndex =
          Array.from(document.querySelectorAll(".preview")).indexOf(
            clickedPrev
          ) + 1;
        if (clickedIndex !== currentImg) {
          if (clickedIndex < currentImg) {
            setCurrentImg(clickedIndex);
            animateSlide("left");
          } else {
            setCurrentImg(clickedIndex);
            animateSlide("right");
          }
        }
      }
      return;
    }

    if (
      clickPosition < sliderWidth / 2 &&
      currentImg !== 1 &&
      event.target.tagName !== "A"
    ) {
      setCurrentImg((prev) => prev - 1);
      animateSlide("left");
    } else if (
      clickPosition > sliderWidth / 2 &&
      currentImg !== sliderConfig.totalSlides &&
      event.target.tagName !== "A"
    ) {
      setCurrentImg((prev) => prev + 1);
      animateSlide("right");
    }
  };

  // Handle slide animation
  const animateSlide = (direction) => {
    const currentSlide =
      document.querySelectorAll(".img")[
        document.querySelectorAll(".img").length - 1
      ];
    const sliderImages = sliderImagesRef.current;

    // Calculate the next image index based on direction
    let nextImgIndex;
    if (direction === "left") {
      console.log("currentImg", currentImg);
      nextImgIndex = currentImg - 1;
      console.log("currentImg", currentImg);
    } else {
      nextImgIndex = currentImg + 1;
    }

    const slideImg = document.createElement("div");
    slideImg.classList.add("img");

    const slideImgElem = document.createElement("img");
    slideImgElem.src = `${sliderConfig.imagePaths.basePath}${nextImgIndex}${sliderConfig.imagePaths.extension}`;
    gsap.set(slideImgElem, { x: direction === "left" ? -300 : 300 });

    slideImg.appendChild(slideImgElem);
    sliderImages.appendChild(slideImg);

    gsap.to(currentSlide.querySelector("img"), {
      x: direction === "left" ? 300 : -300,
      duration: sliderConfig.animation.slideTransitionDuration,
      ease: "power4.out",
    });

    gsap.fromTo(
      slideImg,
      {
        clipPath:
          direction === "left"
            ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%,  100% 100%, 0% 100%)",
        duration: sliderConfig.animation.slideTransitionDuration,
        ease: "power4.out",
      }
    );

    gsap.to(slideImgElem, {
      x: 0,
      duration: sliderConfig.animation.slideTransitionDuration,
      ease: "power4.out",
    });

    cleanupSlides();

    indicatorRotation.current += direction === "left" ? -90 : 90;
    gsap.to(indicatorsRef.current.querySelectorAll("p"), {
      rotate: indicatorRotation.current,
      duration: 1,
      ease: hop,
    });
  };

  return (
    <div
      className="slider"
      ref={sliderRef}
      onClick={handleClick}
      data-scroll-container
    >
      <Screen className="screen-main" />
      <Screen className="screen-alt" />
      <Container
        containerRef={containerRef}
        totalSlides={sliderConfig.totalSlides}
        basePath={sliderConfig.imagePaths.basePath}
        extension={sliderConfig.imagePaths.extension}
        currentImg={currentImg}
      />

      <Sliders
        sliderImagesRef={sliderImagesRef}
        titleWrapperRef={titleWrapperRef}
        sliderConfig={sliderConfig}
        setCurrentExp={setCurrentExp}
        counterRef={counterRef}
        currentImg={currentImg}
        indicatorsRef={indicatorsRef}
      />

      <Nav
        className="nav"
        navRef={navRef}
        nav={sliderConfig.nav}
        currentNav={currentNav}
        setCurrentNav={setCurrentNav}
      />

      <About
        aboutRef={aboutRef}
        aboutWrapperRef={scrollRef}
        aboutMe={aboutConfig.aboutMe}
        aboutSections={aboutConfig.aboutSections}
      />
    </div>
  );
};

export default Slider;
