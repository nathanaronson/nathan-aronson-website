import React, { useState } from 'react'

const Navigation = ({ isVisible }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '#hero', label: 'home' },
    { href: '#about', label: 'about' },
    { href: '#experiences', label: 'experiences' },
    { href: '#projects', label: 'projects' },
    { href: '#connect', label: 'connect' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <a 
            href="#hero" 
            onClick={(e) => { 
              e.preventDefault() 
              scrollToSection('#hero') 
            }}
          >
            Nathan Aronson
          </a>
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a 
                href={item.href} 
                onClick={(e) => { 
                  e.preventDefault() 
                  scrollToSection(item.href) 
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 