import getImagePath from "../../helper/helper";

const SliderPreview = ({ totalSlides, currentImg }) => {
  return (
    <div className="slider-elem slider-preview">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index + 1}
          className={`preview ${currentImg === index + 1 ? "active" : ""}`}
        >
          <img src={getImagePath(index + 1)} alt="" />
        </div>
      ))}
    </div>
  );
};

export default SliderPreview;
