import { useEffect, useRef } from 'react';
import asteraImage from '../assets/astera.png';
import burnsImage from '../assets/burns.png';
import pennImage from '../assets/penn.png';
import perImage from '../assets/per.png';
import codelmImage from '../assets/codelm.png';
import firstImage from '../assets/first.png';
import labsImage from '../assets/labs.png';

interface Experience {
  id: number;
  title: string;
  location: string;
  skills: string[];
  date: string;
  image: string;
  alt: string;
  items: string[];
}

const Experiences = () => {
  const experiencesRef = useRef<HTMLDivElement>(null);

  const experiencesData: Experience[] = [
    {
      id: 1,
      title: 'iOS Mobile Engineer',
      location: 'Penn Labs',
      date: 'September 2025 - Present',
      image: labsImage,
      alt: 'Penn Labs',
      skills: ['Swift', 'SwiftUI'],
      items: [
        'Penn Mobile',
        "Maintaining and improving Penn's mobile app used by 10,000 students monthly.",
      ],
    },
    {
      id: 2,
      title: 'Lead Quantitative Engineer',
      location: 'Astera Holdings',
      date: 'June 2025 - August 2025',
      image: asteraImage,
      alt: 'Astera Holdings',
      skills: ['Rust', 'Python'],
      items: [
        'Infrastructure Team',
        'Led team of three to build data pipeline and support quantitative researchers.',
      ],
    },
    {
      id: 3,
      title: 'Software Engineer Intern',
      location: 'Burns Engineering',
      date: 'May 2025 - August 2025',
      image: burnsImage,
      alt: 'Burns Engineering',
      skills: ['Rust', 'Python'],
      items: [
        'Railroad & Transit Team',
        'Developed locomotive safety system software and server-content verification tool.',
      ],
    },
    {
      id: 4,
      title: 'Teaching Assistant',
      location: 'University of Pennsylvania',
      date: 'January 2025 - Present',
      image: pennImage,
      alt: 'University of Pennsylvania',
      skills: ['OCaml', 'Java'],
      items: [
        'CIS 1200: Programming Languages and Techniques I',
        'Leading weekly recitation, holding office hours, grading homework, and reinforcing key concepts in functional and object-oriented programming.',
      ],
    },
    {
      id: 5,
      title: 'Software Engineer',
      location: 'Penn Electric Racing',
      date: 'September 2024 - Present',
      image: perImage,
      alt: 'Penn Electric Racing',
      skills: ['C++', 'Python', 'Rust', 'Altium Designer'],
      items: [
        'Electrical Subteam',
        'Spearheading embedded board debugging and improving quasi-static vehicle simulation.',
      ],
    },
    {
      id: 6,
      title: 'President',
      location: 'FRC Team 1712',
      date: 'September 2021 - June 2024',
      image: firstImage,
      alt: 'FRC Team 1712',
      skills: ['Java', 'LabVIEW', 'OnShape'],
      items: [
        'Software Developer (2022) -> Business Lead (2023) -> President (2024)',
        "Awarded FIRST Impact Award and recognized as a Dean's List Semi-Finalist during tenure.",
      ],
    },
    {
      id: 7,
      title: 'Director',
      location: 'CodeLM',
      date: 'September 2020 - June 2024',
      image: codelmImage,
      alt: 'CodeLM',
      skills: ['C++', 'Java', 'Python'],
      items: [
        'Competitor (2021) → Organizer (2022) → Director (2023) → Advisor (2024)',
        'Led team to design 12 programming problems and organize in-person competition for 150+ high schoolers.',
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;

            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }, index * 200);

            setTimeout(
              () => {
                element.classList.add('animate-icon');
              },
              index * 200 + 300
            );

            setTimeout(
              () => {
                element.classList.add('animate-content');
              },
              index * 200 + 500
            );
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const experiencesContainer = experiencesRef.current;
    if (experiencesContainer) {
      const lineObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-line');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      lineObserver.observe(experiencesContainer);
    }

    const experiencesItems = document.querySelectorAll('.experiences-item');
    experiencesItems.forEach(item => {
      const element = item as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
      if (experiencesContainer) {
        const lineObserver = new IntersectionObserver(() => {});
        lineObserver.disconnect();
      }
    };
  }, []);

  return (
    <section id="experiences" className="experiences">
      <div className="container">
        <h2 className="section-heading">experiences.</h2>
        <p className="section-subheading">my story so far...</p>
        <div className="experiences-container" ref={experiencesRef}>
          {experiencesData.map(item => (
            <div key={item.id} className="experiences-item">
              <div className="experiences-icon">
                <img src={item.image} alt={item.alt} />
              </div>
              <div className="experiences-content">
                <h3>
                  {item.title} @
                  <span className="experiences-location">{item.location}</span>
                </h3>
                <p className="experiences-date">{item.date}</p>
                <ul>
                  <li>
                    {item.skills.map((skill, i) => {
                      const isLast = i === item.skills.length - 1;
                      const isSecondLast = i === item.skills.length - 2;
                      return (
                        <span key={i}>
                          <span className="experience-skill">{skill}</span>
                          {!isLast &&
                            (isSecondLast && item.skills.length > 1
                              ? ' and '
                              : ', ')}
                        </span>
                      );
                    })}
                  </li>
                  {item.items.map((listItem, index) => (
                    <li key={index + item.skills.length}>{listItem}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
