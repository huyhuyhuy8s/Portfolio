import getImagePath from "../../helper/helper";

const SliderImages = ({ sliderImagesRef }) => {
  return (
    <div className="slider-elem slider-images" ref={sliderImagesRef}>
      <div className="img">
        <img src={getImagePath(1)} alt="" />
      </div>
    </div>
  );
};

export default SliderImages;
