import { Link, useLocation } from "react-router-dom";

export default function HeaderNav({className, onLinkClick }) { 
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };
  return (
      <nav className={`header__nav ${className}`}>
         <ul className='header__nav-list'>

           <li>
              <Link 
              to="/courses" 
              onClick={onLinkClick}
              className={`${isActive('/courses') ? 'active' : ''}`}
              >
                Курсы
              </Link>
           </li>

           <li>
              <Link 
              to="/vacancy-search" 
              onClick={onLinkClick}
              className={`${isActive('/vacancy-search') ? 'active' : ''}`}
              >
              Вакансии
              </Link>
           </li>

           <li>
              <Link 
              to="/career-track" 
              onClick={onLinkClick}
              className={`${isActive('/career-track') ? 'active' : ''}`}
              >
              Карьерный трек
              </Link>
           </li>

           <li>
              <Link 
              to="/about" 
              onClick={onLinkClick}
              className={`${isActive('/about') ? 'active' : ''}`}
              >
                О платформе
              </Link>
           </li>

         </ul>
      </nav>
  )
}