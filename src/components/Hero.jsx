import React, { useState, useEffect } from 'react'
import headshotImage from '../assets/headshot.png'

const Hero = () => {
  const [greeting1, setGreeting1] = useState('')
  const [greeting2, setGreeting2] = useState('')
  const [gradientText, setGradientText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [currentTypingPhase, setCurrentTypingPhase] = useState(0) // 0: greeting1, 1: greeting2, 2: gradientText

  const socialLinks = [
    {
      href: 'https://linkedin.com/in/nathanaronson',
      icon: 'fab fa-linkedin-in',
      label: 'LinkedIn'
    },
    {
      href: 'https://github.com/nathanaronson',
      icon: 'fab fa-github',
      label: 'GitHub'
    },
    {
      href: 'mailto:narons@seas.upenn.edu',
      icon: 'fas fa-envelope',
      label: 'Email'
    }
  ]

  useEffect(() => {
    const typeWriter = (text, setText, onComplete, phase) => {
      let i = 0
      setCurrentTypingPhase(phase)
      
      const timer = setInterval(() => {
        if (i < text.length) {
          setText(text.substring(0, i + 1))
          i++
        } else {
          clearInterval(timer)
          if (onComplete) onComplete()
        }
      }, 80) // Faster typing speed
    }

    // Start typing animations with shorter delays
    setTimeout(() => {
      typeWriter('Hello,', setGreeting1, () => {
        setTimeout(() => {
          typeWriter('I\'m ', setGreeting2, () => {
            setTimeout(() => {
              typeWriter('Nathan', setGradientText, () => {
                setIsTypingComplete(true)
                setCurrentTypingPhase(-1) // No more typing
              }, 2)
            }, 150) // Shorter delay
          }, 1)
        }, 200) // Shorter delay
      }, 0)
    }, 300) // Shorter initial delay
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

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
                {currentTypingPhase === 0 && <span className="cursor">|</span>}
              </h1>
              <h2 className={isTypingComplete ? 'typing-complete' : ''}>
                {greeting2}
                <span className="gradient-text">{gradientText}</span>
                {currentTypingPhase === 2 && <span className="cursor">|</span>}
              </h2>
            </div>
            
            <div className="social-icons">
              {socialLinks.map((link) => (
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
  )
}

export default Hero 