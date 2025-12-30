import { useState, useEffect } from 'react';
import headshotImage from '../assets/headshot.png';

interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

const Hero = () => {
  const [greeting1, setGreeting1] = useState<string>('');
  const [greeting2, setGreeting2] = useState<string>('');
  const [gradientText, setGradientText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [currentTypingPhase, setCurrentTypingPhase] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(false);

  const socialLinks: SocialLink[] = [
    {
      href: 'https://linkedin.com/in/nathanaronson',
      icon: 'fab fa-linkedin-in',
      label: 'LinkedIn',
    },
    {
      href: 'https://github.com/nathanaronson',
      icon: 'fab fa-github',
      label: 'GitHub',
    },
    {
      href: 'mailto:narons@seas.upenn.edu',
      icon: 'fas fa-envelope',
      label: 'Email',
    },
  ];

  useEffect(() => {
    const typeWriter = (
      text: string,
      setText: (value: string) => void,
      onComplete: (() => void) | null,
      phase: number,
      speed: number
    ): void => {
      let i = 0;
      setCurrentTypingPhase(phase);

      const timer = setInterval(() => {
        if (i < text.length) {
          setText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          if (onComplete) onComplete();
        }
      }, speed);
    };

    setTimeout(() => {
      setShowCursor(true);
      typeWriter(
        'Hey,',
        setGreeting1,
        () => {
          setTimeout(() => {
            typeWriter(
              "I'm ",
              setGreeting2,
              () => {
                setTimeout(() => {
                  const typeWriterFast = (
                    text: string,
                    setText: (value: string) => void,
                    onComplete: (() => void) | null,
                    phase: number
                  ): void => {
                    let i = 0;
                    setCurrentTypingPhase(phase);

                    const timer = setInterval(() => {
                      if (i < text.length) {
                        setText(text.substring(0, i + 1));
                        i++;
                      } else {
                        clearInterval(timer);
                        if (onComplete) onComplete();
                      }
                    }, 75);
                  };
                  typeWriterFast(
                    'Nathan',
                    setGradientText,
                    () => {
                      setTimeout(() => {
                        setIsTypingComplete(true);
                        setCurrentTypingPhase(-1);
                        setShowCursor(false);
                      }, 500);
                    },
                    2
                  );
                }, 0);
              },
              1,
              100
            );
          }, 500);
        },
        0,
        125
      );
    }, 400);
  }, []);

  const scrollToAbout = (): void => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="profile-image">
              <img src={headshotImage} alt="Nathan Aronson" />
            </div>
          </div>

          <div className="hero-right">
            <div className="greeting">
              <h1 className={isTypingComplete ? 'typing-complete' : ''}>
                {greeting1}
                {currentTypingPhase === 0 && showCursor && (
                  <span className="cursor">|</span>
                )}
              </h1>
              <h2 className={isTypingComplete ? 'typing-complete' : ''}>
                {greeting2}
                <span className="gradient-text">{gradientText}</span>
                {(currentTypingPhase === 1 || currentTypingPhase === 2) &&
                  showCursor && <span className="cursor">|</span>}
              </h2>
            </div>

            <div className="social-icons">
              {socialLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>

            <div className="scroll-indicator" onClick={scrollToAbout}>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
