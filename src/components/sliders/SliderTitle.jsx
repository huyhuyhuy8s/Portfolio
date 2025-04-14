const SliderTitle = ({ titleWrapperRef, titles, exps, setCurrentExp }) => {
  const handleExpEnter = (event) => {
    const targetEvent = event.target.closest(".slider-title-wrapper-title");
    if (targetEvent) {
      setCurrentExp(
        Array.from(
          document.querySelectorAll(".slider-title-wrapper-title")
        ).indexOf(targetEvent) + 1
      );
    }
  };

  return (
    <div className="slider-elem slider-title">
      <div className="slider-title-wrapper" ref={titleWrapperRef}>
        {titles.map((title, index) => (
          <div className="slider-title-wrapper-elem" key={index}>
            <div
              key={index}
              className="slider-title-wrapper-title"
              onMouseEnter={handleExpEnter}
              onMouseLeave={() => setCurrentExp(0)}
            >
              {title}
              <span
                key={`exp_${index}`}
                className="slider-title-wrapper-exp-wrapper"
              >
                <p className="exp">{exps[index]}</p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderTitle;
