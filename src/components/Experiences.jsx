import React, { useEffect, useRef } from 'react'

const Experiences = () => {
  const experiencesRef = useRef(null)

  const experiencesData = [
    {
      id: 1,
      title: 'Software Engineer Intern @ Burns Engineering',
      date: 'May 2025 - Present',
      image: '/src/assets/burns.png',
      alt: 'Burns Engineering',
      items: [
        'Railroad & Transit Team',
        'Rust, Python',
        'Architecting communication protocol, state machine, and OS-image of safety-critical embedded system.'
      ]
    },
    {
      id: 2,
      title: 'Teaching Assistant @ UPenn',
      date: 'Jan 2025 - Present',
      image: '/src/assets/penn.png',
      alt: 'University of Pennsylvania',
      items: [
        'CIS 1200: Programming Languages and Techniques I',
        'OCaml, Java',
        'Lead weekly recitation, hold office hours, grade homeworks, answer questions on Ed Discussions.'
      ]
    },
    {
      id: 3,
      title: 'Hardware Engineer @ Penn Electric Racing',
      date: 'Sep 2024 - Present',
      image: '/src/assets/per.png',
      alt: 'Penn Electric Racing',
      items: [
        'Altium Designer, LTSpice',
        'Created Accumulator Management System Hardware-in-the-Loop PCB.',
        'Designed Brake System Implausibility Device PCB.'
      ]
    },
    {
      id: 4,
      title: 'Director @ CodeLM',
      date: 'Sep 2020 - June 2024',
      image: '/src/assets/codelm.png',
      alt: 'CodeLM',
      items: [
        'C++, Java, Python',
        'Led team of 12 to create programming competition for 150+ high schoolers'
      ]
    },
    {
      id: 5,
      title: 'Captain @ FRC Team 1712',
      date: 'Sep 2021 - June 2024',
      image: '/src/assets/first.png',
      alt: 'FRC Team 1712',
      items: [
        'Java',
        'Captain/President of Team in 2024 Season, Media & Recognitions Officer in 2023 Season',
        'Won FIRST Impact Award in 2023'
      ]
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered animation delay for the main item
            setTimeout(() => {
              entry.target.style.opacity = '1'
              entry.target.style.transform = 'translateY(0)'
            }, index * 200)

            // Animate the icon with a slight delay
            setTimeout(() => {
              entry.target.classList.add('animate-icon')
            }, index * 200 + 300)

            // Animate the content with another delay
            setTimeout(() => {
              entry.target.classList.add('animate-content')
            }, index * 200 + 500)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Animate the experiences line
    const experiencesContainer = experiencesRef.current
    if (experiencesContainer) {
      const lineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-line')
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )
      lineObserver.observe(experiencesContainer)
    }

    // Animate individual experiences items
    const experiencesItems = document.querySelectorAll('.experiences-item')
    experiencesItems.forEach((item) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(30px)'
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(item)
    })

    return () => {
      observer.disconnect()
      if (experiencesContainer) {
        const lineObserver = new IntersectionObserver(() => {})
        lineObserver.disconnect()
      }
    }
  }, [])

  return (
    <section id="experiences" className="experiences">
      <div className="container">
        <h2 className="section-heading">experiences.</h2>
        <p className="section-subheading">my story so far...</p>
        <div className="experiences-container" ref={experiencesRef}>
          {experiencesData.map((item) => (
            <div key={item.id} className="experiences-item">
              <div className="experiences-icon">
                <img src={item.image} alt={item.alt} />
              </div>
              <div className="experiences-content">
                <h3>{item.title}</h3>
                <p className="experiences-date">{item.date}</p>
                <ul>
                  {item.items.map((listItem, index) => (
                    <li key={index}>{listItem}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experiences 