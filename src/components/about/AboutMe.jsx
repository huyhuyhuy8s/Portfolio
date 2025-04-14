const AboutMe = ({ className, content }) => {
  return (
    <section className={className}>
      {content.map((c, index) => {
        return (
          <p key={index}>
            {c.map((e, index) => {
              return (
                <span key={index} className="outer">
                  <span className="inner">{e}</span>
                </span>
              );
            })}
          </p>
        );
      })}
    </section>
  );
};

export default AboutMe;
