const AboutContent = ({ elem }) => {
  if (elem) {
    return (
      <ul className="content">
        {elem.map(({ outer, subText }, index) => {
          return (
            <li className="elem" key={index}>
              {outer.map((e, index) => {
                return (
                  <span className="outer" key={index}>
                    <span className="inner">{e}</span>
                  </span>
                );
              })}
              <span className="sub-text">
                <span className="inner">{subText}</span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default AboutContent;
