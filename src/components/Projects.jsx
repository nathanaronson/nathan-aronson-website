import React, { useEffect, useRef } from 'react'

const Projects = () => {
  const projectsRef = useRef(null)

  const projectsData = [
    {
      id: 1,
      title: 'Apartment Rent Prediction and Classification',
      role: 'Data Scientist & ML Engineer',
      tech: 'Python, Pandas, Sklearn, PyTorch, NumPy',
      description: 'Multilabel predictor of apartment rent prices of 100,000+ apartments in the United States.',
      icon: 'fas fa-home',
      items: [
        'Modeled using Linear Regression, Gradient Boosting Regressor, Random Forest Regressor, and Neural Network (16 layers and 100 epochs).',
        'Achieved explained variance of 0.85 with Random Forest Regressor and Neural Network classification of 0.88.'
      ]
    },
    {
      id: 2,
      title: 'Ultimate Tic-Tac-Toe & AI',
      role: 'Software Developer',
      tech: 'Java, JSwing',
      description: 'Build Ultimate Tic-Tac-Toe from scratch following Model-View-Controller layout.',
      icon: 'fas fa-gamepad',
      items: [
        'Utilized inheritance and dynamic dispatch for board and tile moves; game history stored in dual-stack configration.',
        'Designed AI minimax algorithm with alpha-beta pruning and efficient heuristic capable of looking four moves into the future.'
      ]
    },
    {
      id: 3,
      title: 'WaterWatch',
      role: 'iOS Developer',
      tech: 'Swift, SwiftUI, WidgetKit',
      description: 'Developing hydration metric tracker and reminder application with custom UI interface.',
      icon: 'fas fa-tint',
      items: [
        'Implemented user authentication and metrics storage using Google Firebase; accurately calculated hydration needs by integrating location-based meteorological data through decoded JSON API responses.',
        'Create home-screen widget displaying daily water intake. Cached images using Kingfisher.'
      ]
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
              entry.target.style.opacity = '1'
              entry.target.style.transform = 'translateY(0)'
            }, index * 200)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const projectItems = document.querySelectorAll('.project-item')
    projectItems.forEach((item) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(30px)'
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-heading">projects.</h2>
        <p className="section-subheading">some of my work...</p>
        <div className="projects-list" ref={projectsRef}>
          {projectsData.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-icon">
                <i className={project.icon}></i>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-role">{project.role}</p>
                <p className="project-tech">{project.tech}</p>
                <p className="project-description">{project.description}</p>
                <ul>
                  {project.items.map((item, index) => (
                    <li key={index}>{item}</li>
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

export default Projects 