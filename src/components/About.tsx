import { useEffect, useRef } from 'react';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const aboutContent = document.querySelector(
      '.about-content'
    ) as HTMLElement;
    if (aboutContent) {
      aboutContent.style.opacity = '0';
      aboutContent.style.transform = 'translateY(30px)';
      aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(aboutContent);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-heading">about.</h2>
        <div className="about-content" ref={aboutRef}>
          <p className="subheading">
            I study computer science at the University of Pennsylvania School of
            Engineering and Applied Science.
          </p>
          <p>
            I have a <strong>strong engineering background</strong> and chase{' '}
            <strong>hard problems</strong>. In college, I{' '}
            <span className="underline">push myself</span> across diverse areas of
            computer science, including systems programming, machine learning, iOS
            development.
          </p>
          <p>
            I've led multiple projects and have a solid grasp of the
            full software development lifecycle. Currently, I'm diving into compiler design
            by building a programming language in Rust.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
