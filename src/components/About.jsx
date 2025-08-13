import React, { useEffect, useRef } from 'react'

const About = () => {
  const aboutRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const aboutContent = document.querySelector('.about-content')
    if (aboutContent) {
      aboutContent.style.opacity = '0'
      aboutContent.style.transform = 'translateY(30px)'
      aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      observer.observe(aboutContent)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-heading">about.</h2>
        <div className="about-content" ref={aboutRef}>
          <p className="subheading">
            I study computer science at the University of Pennsylvania School of Engineering and Applied Science.
          </p>
          <p>
            I have a <strong>strong algorithmic background</strong> and chase <strong>hard problems</strong>. In college, I push myself <span className="underline">as deeply as possible</span> into almost every corner of computer science.
          </p>
          <p>
            I manage a development team and lead multiple projects, and I have a strong understanding of the entire software development lifecycle. Currently, my interests lie in low-latency programming, distributed systems, and machine learning.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About 