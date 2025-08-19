
interface SocialLink {
  href: string
  label: string
}

const Footer = () => {
  const socialLinks: SocialLink[] = [
    {
      href: 'https://linkedin.com/in/nathanaronson',
      label: 'LinkedIn'
    },
    {
      href: 'https://github.com/nathanaronson',
      label: 'GitHub'
    },
    {
      href: 'mailto:narons@seas.upenn.edu',
      label: 'Email'
    },
    {
      href: 'https://www.seas.upenn.edu/~narons/assets/files/Resume',
      label: 'Resume'
    }
  ]

  return (
    <footer id="connect" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>Connect With Me...</h3>
            <div className="footer-socials">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="footer-social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-right">
            <p>&copy; 2025 Nathan Aronson</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer