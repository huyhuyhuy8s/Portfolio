import AboutContent from "./AboutContent";
import AboutContentLinked from "./AboutContentLinked";

const AboutSection = ({ title, content, className }) => {
  return (
    <section className={className}>
      <div className="title" data-scroll data-scroll-speed="-1.5">
        <span className="inner">{title}</span>
      </div>
      {content[0].link ? (
        <AboutContentLinked elem={content} />
      ) : (
        <AboutContent elem={content} />
      )}
    </section>
  );
};

export default AboutSection;
