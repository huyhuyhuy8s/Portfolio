import SliderImages from "./SliderImages";
import SliderTitle from "./SliderTitle";
import SliderPreview from "./SliderPreview";
import SliderIndicators from "./SliderIndicators";
import SliderCounter from "./SliderCounter";

const Sliders = ({
  sliderImagesRef,
  titleWrapperRef,
  sliderConfig,
  setCurrentExp,
  counterRef,
  currentImg,
  indicatorsRef,
}) => {
  return (
    <>
      <SliderImages sliderImagesRef={sliderImagesRef} />
      <SliderTitle
        titleWrapperRef={titleWrapperRef}
        titles={sliderConfig.titles}
        exps={sliderConfig.exps}
        setCurrentExp={setCurrentExp}
      />
      <SliderCounter
        sliderCounterRef={counterRef}
        totalSlides={sliderConfig.totalSlides}
      />
      <SliderPreview
        totalSlides={sliderConfig.totalSlides}
        currentImg={currentImg}
      />
      <SliderIndicators SliderIndicatorsRef={indicatorsRef} />
    </>
  );
};

export default Sliders;
