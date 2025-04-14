import getImagePath from "../../helper/helper";
import gsap from "gsap";

const Container = ({
  containerRef,
  totalSlides,
  basePath,
  extension,
  currentImg,
}) => {
  return (
    <div className="container" ref={containerRef}>
      {Array.from({ length: Math.min(5, totalSlides) }).map((_, colIndex) => (
        <div key={colIndex + 1} className={`col c-${colIndex + 1}`}>
          {Array.from({
            length: Math.min(5, totalSlides),
          }).map((_, itemIndex) => {
            // For c-3, we want to show img1 in the third position
            if (colIndex === 2 && itemIndex === 2) {
              // c-3, third item (index 2)
              return (
                <div key={itemIndex + 1} className="item">
                  <img
                    src={getImagePath(currentImg, basePath, extension)}
                    alt=""
                  />
                </div>
              );
            }
            return (
              <div key={itemIndex + 1} className="item">
                <img
                  src={getImagePath(
                    gsap.utils.random(1, totalSlides, 1, true)(),
                    basePath,
                    extension
                  )}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Container;
