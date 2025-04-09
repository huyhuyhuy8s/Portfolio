import { useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import sliderConfig from "../config/sliderConfig";
import "../styles/main.scss";

gsap.registerPlugin(CustomEase);

const Slider = () => {
  const [currentImg, setCurrentImg] = useState(1);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const sliderImagesRef = useRef(null);
  const counterRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const indicatorsRef = useRef(null);
  const indicatorRotation = useRef(0);

  // Use GSAP with contextSafe for better performance and cleanup
  useGSAP(
    (context, contextSafe) => {
      // Create custom ease
      CustomEase.create(
        "hop",
        "M0,0 C0.071,0.505  0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
      );

      // Initial loader animation
      const loader = contextSafe(() => {
        gsap.set(".slider-title-wrapper, .preview img, .slider-counter>div", {
          top: "200%",
        });
        gsap.set(".slider-indicators p", { top: 60 });

        let tl = gsap.timeline({ delay: 0 });

        tl.to(".col", {
          top: "-5%",
          duration: sliderConfig.animation.initialLoadDuration,
          ease: "power2.inOut",
        });
        tl.to(
          ".c-3 .item",
          {
            top: 0,
            stagger: sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "power2.inOut",
          },
          "-=2.5"
        );
        tl.to(
          ".c-1 .item",
          {
            top: 0,
            stagger: sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "power2.inOut",
          },
          "-=2.75"
        );
        tl.to(
          ".c-5 .item",
          {
            top: 0,
            stagger: sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "power2.inOut",
          },
          "<"
        );
        tl.to(
          ".c-2 .item",
          {
            top: 0,
            stagger: -sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "power2.inOut",
          },
          "-=3.25"
        );
        tl.to(
          ".c-4 .item",
          {
            top: 0,
            stagger: -sliderConfig.animation.staggerDelay,
            duration: sliderConfig.animation.initialLoadDuration,
            ease: "power2.inOut",
          },
          "<"
        );

        tl.to(
          ".container",
          {
            scale: sliderConfig.animation.containerScale,
            duration: 4,
            ease: "power4.inOut",
          },
          "-=3"
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

        tl.from(".preview", { "--opacity-prev": 0 }, "-=1.2");

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

      // Run the loader animation
      loader();
    },
    { scope: sliderRef }
  );

  // Update counter and title position when currentImg changes
  useGSAP(
    (context, contextSafe) => {
      const updateCounterAndTitlePosition = contextSafe(() => {
        const counterY = -40 * (currentImg - 1);
        const titleY = -60 * (currentImg - 1);

        gsap.to(counterRef.current, {
          y: counterY,
          duration: sliderConfig.animation.counterTransitionDuration,
          ease: "hop",
        });

        gsap.to(titleWrapperRef.current, {
          y: titleY,
          duration: sliderConfig.animation.counterTransitionDuration,
          ease: "hop",
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
      ease: "hop",
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

    if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
      setCurrentImg((prev) => prev - 1);
      animateSlide("left");
    } else if (
      clickPosition > sliderWidth / 2 &&
      currentImg !== sliderConfig.totalSlides
    ) {
      setCurrentImg((prev) => prev + 1);
      animateSlide("right");
    }
  };

  // Helper function to get image path
  const getImagePath = (index) => {
    return `${sliderConfig.imagePaths.basePath}${index}${sliderConfig.imagePaths.extension}`;
  };

  return (
    <div className="slider" ref={sliderRef} onClick={handleClick}>
      <div className="container" ref={containerRef}>
        {Array.from({ length: Math.min(5, sliderConfig.totalSlides) }).map(
          (_, colIndex) => (
            <div key={colIndex + 1} className={`col c-${colIndex + 1}`}>
              {Array.from({
                length: Math.min(5, sliderConfig.totalSlides),
              }).map((_, itemIndex) => {
                // For c-3, we want to show img1 in the third position
                let imgIndex = itemIndex + 1;
                if (colIndex === 2 && itemIndex === 2) {
                  // c-3, third item (index 2)
                  imgIndex = 1;
                }
                return (
                  <div key={itemIndex + 1} className="item">
                    <img src={getImagePath(imgIndex)} alt="" />
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      <div className="slider-images" ref={sliderImagesRef}>
        <div className="img">
          <img src={getImagePath(1)} alt="" />
        </div>
      </div>

      <div className="slider-title">
        <div className="slider-title-wrapper" ref={titleWrapperRef}>
          {sliderConfig.titles.map((title, index) => (
            <p key={index}>{title}</p>
          ))}
        </div>
      </div>

      <div className="slider-counter">
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

      <div className="slider-preview">
        {Array.from({ length: sliderConfig.totalSlides }).map((_, index) => (
          <div
            key={index + 1}
            className={`preview ${currentImg === index + 1 ? "active" : ""}`}
          >
            <img src={getImagePath(index + 1)} alt="" />
          </div>
        ))}
      </div>

      <div className="slider-indicators" ref={indicatorsRef}>
        <p>+</p>
        <p>+</p>
      </div>

      <div className="nav">
        <nav>
          <div className="nav-item">
            <a href="#" className="active">
              Work
            </a>
          </div>
          <div className="nav-item">
            <a href="#">About</a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Slider;
