import { useEffect, useRef, useState } from 'react';

interface ProjectItem {
  id: number;
  title: string;
  role: string;
  tech: string;
  description: string;
  icon: string;
  items: string[];
  url: string;
}

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [hasShownMore, setHasShownMore] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const projectsData: ProjectItem[] = [
    {
      id: 1,
      title: 'Apartment Rent Prediction and Classification',
      role: 'Data Scientist & ML Engineer',
      tech: 'Python, Pandas, Sklearn, PyTorch, NumPy',
      description:
        'Multilabel predictor of apartment rent prices of 100,000+ real listings in the contiguous United States.',
      icon: 'fas fa-home',
      url: 'https://github.com/nathanaronson/Apartment-Fair-Rental-Prediction',
      items: [
        'Modeled using Linear Regression, Gradient Boosting Regressor, Random Forest Regressor, and Neural Network.',
        '0.85 explained variance on regression tasks using a Random Forest Regressor and 0.87 F1 score on classification tasks using a Neural Network.',
      ],
    },
    {
      id: 2,
      title: 'Ultimate Tic-Tac-Toe & AI',
      role: 'Software Developer',
      tech: 'Java, JSwing',
      description:
        'Build Ultimate Tic-Tac-Toe from scratch following Model-View-Controller layout.',
      icon: 'fas fa-gamepad',
      url: 'https://github.com/nathanaronson/Ultimate-TicTacToe',
      items: [
        'Utilized inheritance and dynamic dispatch for board and tile moves; game history stored in dual-stack configration.',
        'Designed AI minimax algorithm with alpha-beta pruning and efficient heuristic capable of looking four moves into the future.',
      ],
    },
    {
      id: 3,
      title: 'WaterWatch',
      role: 'iOS Developer',
      tech: 'Swift, SwiftUI, WidgetKit',
      description:
        'Developing hydration metric tracker and reminder application with custom UI interface.',
      icon: 'fas fa-tint',
      url: 'https://github.com/nathanaronson/Water-Watch',
      items: [
        'Implemented user authentication and metrics storage using Google Firebase; accurately calculated hydration needs by integrating location-based meteorological data through decoded JSON API responses.',
        'Create home-screen widget displaying daily water intake. Cached images using Kingfisher.',
      ],
    },
    {
      id: 4,
      title: 'ThermaHax',
      role: 'Hardware Engineer & Embedded Systems Developer',
      tech: 'Arduino, C++',
      description:
        'Temperature control system to manipulate nearby thermometer readings.',
      icon: 'fas fa-thermometer-half',
      url: 'https://devpost.com/software/thermahax',
      items: [
        'Designed dual NMOS/PMOS H-bridge configuration to control Peltier junctions for precise heating and cooling.',
        'Implemented Arduino-based control system with DHT11 temperature sensor and relay modules to create a "temperature hacker" that can trick nearby thermometers.',
      ],
    },
    {
      id: 5,
      title: 'Discord Bots',
      role: 'Software Developer',
      tech: 'Python, Discord.py',
      description: 'Interactive Discord chatbots with multiplayer support.',
      icon: 'fas fa-robot',
      url: 'https://github.com/nathanaronson/discord-bots',
      items: [
        'Developed Hangman bot with word categories, scoring system, and interactive visual states.',
        'Created Blackjack bot with deck management, betting system, and performance analytics.',
      ],
    },
  ];

  const initialProjectsCount = 3;
  const displayedProjects = hasShownMore
    ? projectsData
    : projectsData.slice(0, initialProjectsCount);

  const handleShowMore = (): void => {
    setIsAnimating(true);
    setHasShownMore(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, [hasShownMore]);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-heading">projects.</h2>
        <p className="section-subheading">some of my work...</p>
        <div className="projects-list" ref={projectsRef}>
          {displayedProjects.map(project => (
            <div key={project.id} className="project-item">
              <div className="project-icon">
                <i className={project.icon}></i>
              </div>
              <div className="project-content">
                <h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-title-link"
                  >
                    {project.title}
                  </a>
                </h3>
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

        {!hasShownMore && (
          <div className="projects-toggle">
            <button
              className="show-more-btn"
              onClick={handleShowMore}
              disabled={isAnimating}
            >
              <span>Show More Projects</span>
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
