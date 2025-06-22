import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Experiences from './components/Experiences'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        // Scrolling down - hide navbar
        setIsNavVisible(false)
      } else {
        // Scrolling up or at top - show navbar
        setIsNavVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className="App">
      <Navigation isVisible={isNavVisible} />
      <Hero />
      <About />
      <Experiences />
      <Projects />
      <Footer />
    </div>
  )
}

export default App 