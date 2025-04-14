const AboutContentLinked = ({ elem }) => {
  if (elem) {
    return (
      <ul className="content">
        {elem.map(({ outer, subText, link }, index) => {
          return (
            <li className="elem" key={index}>
              <a href={link}>
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
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default AboutContentLinked;
