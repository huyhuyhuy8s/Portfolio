const Nav = ({ className, navRef, nav, currentNav, setCurrentNav }) => {
  const handleClickAbout = (event) => {
    const clickedNav = event.target.closest(".nav-item");
    if (clickedNav) {
      setCurrentNav(
        Array.from(document.querySelectorAll(".nav-item")).indexOf(clickedNav) +
          1
      );
    }
  };
  return (
    <div className={`slider-elem ${className}`} ref={navRef}>
      <nav>
        {nav.map((item, index) => (
          <div className="nav-item" key={index}>
            <a
              href="#"
              className={`${item} ${index + 1 === currentNav ? "active" : ""}`}
              onClick={handleClickAbout}
            >
              {item}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
