import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      background: 'linear-gradient(180deg, #1e3a8a 0%, #172554 100%)',
      width: '100%',
    },
    container: {
      maxWidth: '60rem',
      margin: '0 auto',
      padding: '1rem 1.5rem 2rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
      textAlign: 'center', // Center the content
    },
    logoSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.1rem',
      alignItems: 'center', // Center the logo
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center the logo horizontally
    },
    logo: {
      height: '4rem',
      width: '4rem',
      borderRadius: '9999px',
      backgroundColor: 'white',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
      // cursor: 'pointer',
    },
    logoText: {
      display: 'flex',
      color: '#2563eb',
      fontWeight: '700',
      fontSize: '1rem',
      letterSpacing: '-0.025em',
      flexDirection: 'column',
    },
    description: {
      fontSize: '0.875rem',
      lineHeight: '1.2rem',
      color: '#d1d5db',
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center', // Center the social icons
      gap: '0.5rem',
    },
    socialIcon: {
      color: '#9ca3af',
      transition: 'color 0.2s ease',
    },
    bottomSection: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '1rem',
      paddingTop: '1rem',
    },
    bottomContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'center',
      '@media (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    copyright: {
      color: '#9ca3af',
      fontSize: '0.75rem',
      lineHeight: '1.25rem',
    },
    legalLinks: {
      display: 'flex',
      gap: '1rem',
    },
    legalLink: {
      color: '#9ca3af',
      fontSize: '0.875rem',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },
  };

  const [isLogoHovered, setIsLogoHovered] = React.useState(false);

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.logoSection}>
            <div style={styles.logoContainer}>
              <div 
                style={{
                  ...styles.logo,
                  transform: isLogoHovered ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                <span style={styles.logoText}>NICE
                  247</span>
              </div>
            </div>
            <p style={styles.description}>
              Your premier destination for online gaming and entertainment.
            </p>
            {/* <div style={styles.socialLinks}>
              <a 
                href="#" 
                style={styles.socialIcon}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div> */}
          </div>
        </div>

        <div style={styles.bottomSection}>
          <div style={styles.bottomContent}>
            <p style={styles.copyright}>
              © {new Date().getFullYear()} Nice 247. All rights reserved.
            </p>
            <div style={styles.legalLinks}>
              <a 
                href="/privacy" 
                style={styles.legalLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                style={styles.legalLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
