const SliderCounter = ({ sliderCounterRef, totalSlides }) => {
  return (
    <div className="slider-elem slider-counter">
      <div className="counter" ref={sliderCounterRef}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <p key={index + 1}>{index + 1}</p>
        ))}
      </div>
      <div>
        <p>&mdash;</p>
      </div>
      <div>
        <p>{totalSlides}</p>
      </div>
    </div>
  );
};

export default SliderCounter;
