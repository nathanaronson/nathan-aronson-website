import { useEffect, useRef } from 'react'
import asteraImage from '../assets/astera.png'
import burnsImage from '../assets/burns.png'
import pennImage from '../assets/penn.png'
import perImage from '../assets/per.png'
import codelmImage from '../assets/codelm.png'
import firstImage from '../assets/first.png'

interface Experience {
  id: number
  title: string
  date: string
  image: string
  alt: string
  items: string[]
}

const Experiences = () => {
  const experiencesRef = useRef<HTMLDivElement>(null)

  const experiencesData: Experience[] = [
    {
      id: 1,
      title: 'Quantitative Engineer @ Astera Holdings',
      date: 'June 2025 - August 2025',
      image: asteraImage,
      alt: 'Astera Holdings',
      items: [
        'Infrastructure Team',
        'Rust and Python',
        'Built data acquisition pipeline and supported quantitative researchers.'
      ]
    },
    {
      id: 2,
      title: 'Software Engineer Intern @ Burns Engineering',
      date: 'May 2025 - August 2025',
      image: burnsImage,
      alt: 'Burns Engineering',
      items: [
        'Railroad & Transit Team',
        'Rust and Python',
        'Developed locomotive safety system software and server content verification tool.'
      ]
    },
    {
      id: 3,
      title: 'Teaching Assistant @ University of Pennsylvania',
      date: 'January 2025 - Present',
      image: pennImage,
      alt: 'University of Pennsylvania',
      items: [
        'CIS 1200: Programming Languages and Techniques I',
        'OCaml and Java',
        'Lead weekly recitation, hold office hours, grade homework, and reinforce key concepts in functional and object-oriented programming.'
      ]
    },
    {
      id: 4,
      title: 'Software Engineer @ Penn Electric Racing',
      date: 'September 2024 - Present',
      image: perImage,
      alt: 'Penn Electric Racing',
      items: [
        'Electrical Subteam',
        'Python, Rust, C++, and Altium Designer',
        'Improve quasi-static vehicle simulation tool and battery management system hardware.'
      ]
    },
    {
      id: 5,
      title: 'Captain @ FRC Team 1712',
      date: 'September 2021 - June 2024',
      image: firstImage,
      alt: 'FRC Team 1712',
      items: [
        'President for the 2024 season; Media & Recognitions Officer for the 2023 season.',
        'Managed competitive robotics team of 52, sponsorships, finances, summer camp, and outreach sessions.',
        'Awarded FIRST Impact Award and recognized as a Dean\'s List Semi-Finalist in 2023.'
      ]
    },
    {
      id: 6,
      title: 'Director @ CodeLM',
      date: 'Fall 2020 - Spring 2024',
      image: codelmImage,
      alt: 'CodeLM',
      items: [
        'Competitor (2021) → Organizer (2022) → Director (2023) → Advisor (2024)',
        'C++, Java, Python',
        'Led team to design 12 programming problems and organize in-person competition for 150+ high schoolers.'
      ]
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            
            setTimeout(() => {
              element.style.opacity = '1'
              element.style.transform = 'translateY(0)'
            }, index * 200)

            setTimeout(() => {
              element.classList.add('animate-icon')
            }, index * 200 + 300)

            setTimeout(() => {
              element.classList.add('animate-content')
            }, index * 200 + 500)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

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

    const experiencesItems = document.querySelectorAll('.experiences-item')
    experiencesItems.forEach((item) => {
      const element = item as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(30px)'
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
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