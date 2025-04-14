import AboutMe from "./AboutMe";
import AboutSection from "./AboutSection";

const About = ({ aboutRef, aboutWrapperRef, aboutMe, aboutSections }) => {
  return (
    <div className="about" ref={aboutRef}>
      <div className="about-wrapper" ref={aboutWrapperRef}>
        <AboutMe className={aboutMe.className} content={aboutMe.content} />
        {aboutSections.map((aboutSection, index) => {
          return (
            <AboutSection
              key={index}
              className={aboutSection.className}
              title={aboutSection.title}
              content={aboutSection.content}
            />
          );
        })}
      </div>
    </div>
  );
};

export default About;
