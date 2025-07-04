import { useEffect, useRef } from 'react';
import styles from './TechBackground.module.css';

const techLogos = [
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    position: { left: '20%', top: '30%' },
    size: 60
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    position: { left: '40%', top: '10%' },
    size: 50
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    position: { left: '40%', top: '70%' },
    size: 55
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    position: { left: '85%', top: '20%' },
    size: 45
  }
];

const TechBackground = () => {
  const containerRef = useRef(null);
  const logoRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      logoRefs.current.forEach(logo => {
        if (!logo) return;
        
        const rect = logo.getBoundingClientRect();
        const logoX = rect.left + rect.width / 2;
        const logoY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(logoX - clientX, 2) + 
          Math.pow(logoY - clientY, 2)
        );
        
        const maxDistance = 400;
        const moveFactor = distance < maxDistance 
          ? (1 - distance / maxDistance) * 20
          : 0;
        
        const angle = Math.atan2(logoY - clientY, logoX - clientX);
        const moveX = moveFactor * Math.cos(angle);
        const moveY = moveFactor * Math.sin(angle);
        
        logo.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={styles.techBackground}>
      {techLogos.map((tech, index) => (
        <img
          key={index}
          ref={el => logoRefs.current[index] = el}
          src={tech.src}
          className={styles.techLogo}
          style={{
            width: `${tech.size}px`,
            height: `${tech.size}px`,
            left: tech.position.left,
            top: tech.position.top,
            opacity: 0.6,
            transition: 'transform 0.2s ease-out'
          }}
          alt="Tech logo"
        />
      ))}
    </div>
  );
};

export default TechBackground;