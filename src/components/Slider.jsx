import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import sliderConfig from "../config/sliderConfig";
import "../styles/main.scss";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create(
  "hop",
  "M0,0 C0.071,0.505  0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
);

const Slider = () => {
  const [first, setFirst] = useState(false);
  const [currentImg, setCurrentImg] = useState(1);
  const [currentNav, setCurrentNav] = useState(1);
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
          // opacity: 0,
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
          zIndex: 1,
          top: "100%",
        });

        const tl = gsap.timeline({ delay: 0 });
        tl.to(".slider-images", {
          top: "-50vh",
          duration: 1,
          ease: "power4.out",
        });
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
          "-=1"
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
            duration: 1.5,
            ease: "expo.inOut",
          },
          "-=1.5"
        );
        tl.fromTo(
          ".about-wrapper .inner",
          {
            top: "5.6458vw",
          },
          { top: 0, duration: 1, ease: hop, stagger: 0.125 },
          "-=0.5"
        );
        tl.to(
          ".slider-title-wrapper, .preview img, .slider-counter>div",
          {
            top: `${sliderConfig.totalSlides * 100}%`,
            duration: 1.5,
            ease: "expo.inOut",
            delay: -1,
          },
          "-=2"
        );
        tl.to(
          ".preview, .slider-indicators",
          {
            "--opacity-prev": 0,
            duration: 1,
            ease: "expo.inOut",
          },
          "<"
        );
      });
      if (first && currentNav === sliderConfig.nav.indexOf("About") + 1)
        about();
    },
    { scope: [sliderRef, aboutRef], dependencies: [currentNav] }
  );

  useGSAP((context, contextSafe) => {
    const scroll = new LocomotiveScroll({
      el: aboutRef.current,
      smooth: true,
      mobile: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });
  });

  // Nav Work
  useGSAP(
    (context, contextSafe) => {
      const work = contextSafe(() => {
        console.log("Run work");
        gsap.set(".slider-images", {
          top: 0,
          scale: 1.5,
        });
        const tl = gsap.timeline({ delay: 0 });
        tl.to(".screen-alt", {
          opacity: 0,
          duration: 1.5,
          ease: hop,
        });
        tl.to(
          ".slider-title-wrapper, .preview img, .slider-counter>div",
          {
            top: "0",
            duration: 1,
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
        tl.to(
          ".slider-images",
          {
            top: 0,
            scale: 1,
            duration: 1.5,
            ease: hop,
          },
          "<"
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
          ".slider-title-wrapper p"
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
      nextImgIndex = currentImg - 1;
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

  // Helper function to get image path
  const getImagePath = (index) => {
    return `${sliderConfig.imagePaths.basePath}${index}${sliderConfig.imagePaths.extension}`;
  };

  const handleClickAbout = (event) => {
    const clickedNav = event.target.closest(".nav-item");
    if (clickedNav) {
      setCurrentNav(
        Array.from(document.querySelectorAll(".nav-item")).indexOf(clickedNav) +
          1
      );
    }
  };

  return (
    <div
      className="slider"
      ref={sliderRef}
      onClick={handleClick}
      data-scroll-container
    >
      <div className="screen screen-main"></div>
      <div className="screen screen-alt"></div>
      <div className="container" ref={containerRef}>
        {Array.from({ length: Math.min(5, sliderConfig.totalSlides) }).map(
          (_, colIndex) => (
            <div key={colIndex + 1} className={`col c-${colIndex + 1}`}>
              {Array.from({
                length: Math.min(5, sliderConfig.totalSlides),
              }).map((_, itemIndex) => {
                // For c-3, we want to show img1 in the third position
                if (colIndex === 2 && itemIndex === 2) {
                  // c-3, third item (index 2)
                  return (
                    <div key={itemIndex + 1} className="item">
                      <img src={getImagePath(currentImg)} alt="" />
                    </div>
                  );
                }
                return (
                  <div key={itemIndex + 1} className="item">
                    <img
                      src={getImagePath(
                        gsap.utils.random(
                          1,
                          sliderConfig.totalSlides,
                          1,
                          true
                        )()
                      )}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      <div className="slider-elem slider-images" ref={sliderImagesRef}>
        <div className="img">
          <img src={getImagePath(1)} alt="" />
        </div>
      </div>

      <div className="slider-elem slider-title">
        <div className="slider-title-wrapper" ref={titleWrapperRef}>
          {sliderConfig.titles.map((title, index) => (
            <p key={index}>{title}</p>
          ))}
        </div>
      </div>

      <div className="slider-elem slider-counter">
        <div className="counter" ref={counterRef}>
          {Array.from({ length: sliderConfig.totalSlides }).map((_, index) => (
            <p key={index + 1}>{index + 1}</p>
          ))}
        </div>
        <div>
          <p>&mdash;</p>
        </div>
        <div>
          <p>{sliderConfig.totalSlides}</p>
        </div>
      </div>

      <div className="slider-elem slider-preview">
        {Array.from({ length: sliderConfig.totalSlides }).map((_, index) => (
          <div
            key={index + 1}
            className={`preview ${currentImg === index + 1 ? "active" : ""}`}
          >
            <img src={getImagePath(index + 1)} alt="" />
          </div>
        ))}
      </div>

      <div className="slider-elem slider-indicators" ref={indicatorsRef}>
        <p>+</p>
        <p>+</p>
      </div>

      <div className="slider-elem nav" ref={navRef}>
        <nav>
          {sliderConfig.nav.map((item, index) => (
            <div className="nav-item" key={index}>
              <a
                href="#"
                className={`${item} ${
                  index + 1 === currentNav ? "active" : ""
                }`}
                onClick={handleClickAbout}
              >
                {item}
              </a>
            </div>
          ))}
        </nav>
      </div>

      <div className="about" ref={aboutRef}>
        <div className="about-wrapper" ref={scrollRef}>
          <section className="about-me">
            <p>
              <span className="outer">
                <span className="inner">I am a dedicated front-end</span>
              </span>
              <span className="outer">
                <span className="inner">developer intern with hands-on</span>
              </span>
              <span className="outer">
                <span className="inner">experience in React, JavaScript,</span>
              </span>
              <span className="outer">
                <span className="inner">and modern web technologies.</span>
              </span>
            </p>
            <p>
              <span className="outer">
                <span className="inner">
                  I am always striving to learn about
                </span>
              </span>
              <span className="outer">
                <span className="inner">
                  the field's newest and cutting edge
                </span>
              </span>
              <span className="outer">
                <span className="inner">technologies and frameworks.</span>
              </span>
            </p>
            <p>
              <span className="outer">
                <span className="inner">I am passionate about creating</span>
              </span>
              <span className="outer">
                <span className="inner">
                  user-friendly interfaces and eager
                </span>
              </span>
              <span className="outer">
                <span className="inner">to contribute to innovative web</span>
              </span>
              <span className="outer">
                <span className="inner">development initiatives.</span>
              </span>
            </p>
          </section>
          <section className="education">
            <div className="title">
              <span className="inner">Education</span>
            </div>
            <ul className="content">
              <li className="elem">
                <span className="outer">
                  <span className="inner">
                    Engineer of Information Technology
                  </span>
                </span>
                <span className="outer">
                  <span className="inner">HCMC University of Education</span>
                </span>
                <span className="outer">
                  <span className="inner">and Technology</span>
                </span>
                <span className="sub-text">
                  <span className="inner">2022 - 2026</span>
                </span>
              </li>
            </ul>
          </section>
          <section className="projects">
            <div className="title" data-scroll data-scroll-speed="-1.5">
              <span className="inner">Projects</span>
            </div>
            <ul className="content">
              <li className="elem">
                <span className="outer">
                  <span className="inner">Personal Portfolio</span>
                </span>
                <span className="outer">
                  <span className="inner">Based on </span>
                </span>
                <span className="sub-text">
                  <span className="inner">Apr 2025 - Present</span>
                </span>
              </li>
              <li className="elem">
                <span className="outer">
                  <span className="inner">Came</span>
                </span>
                <span className="outer">
                  <span className="inner">A Cafe Managements</span>
                </span>
                <span className="sub-text">
                  <span className="inner">Jan 2025 - Present</span>
                </span>
              </li>
              <li className="elem">
                <span className="outer">
                  <span className="inner">Newshub</span>
                </span>
                <span className="outer">
                  <span className="inner">Newspaper Hub</span>
                </span>
                <span className="sub-text">
                  <span className="inner">Nov 2024 - Dec 2024</span>
                </span>
              </li>
            </ul>
          </section>
          <section className="certifications">
            <div className="title">
              <span className="inner">Certifications</span>
            </div>
            <ul className="content">
              <li className="elem certification">
                <span className="outer">
                  <span className="inner">Full Stack Web Development</span>
                </span>
                <span className="outer">
                  <span className="inner">University of Helsinki</span>
                </span>
                <span className="sub-text">
                  <span className="inner">April 2025</span>
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Slider;
