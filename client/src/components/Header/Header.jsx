import './Header.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Logo from '../Logo/Logo';
import HeaderNav from "./HeaderNav";
import AuthButtons from './AuthButtons';
import ProfileButton from './ProfileButton';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth(); 
  const menuClass = menuOpen ? 'open' : '';

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);
 
  return (
    <header className={`header`}>
      <div className="header__container container">
        <Link to="/">
          <Logo />
        </Link>

        {/* desktop */}
        <HeaderNav menuOpen={menuOpen}/>
        
        {!isAuthenticated ? (
          <AuthButtons />
        ) : (
          <ProfileButton />
        )}

        <div className="header__menu-btn-container">
          <button 
            className={`header__menu-btn ${menuClass}`} 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* mobile */}
      {menuOpen && (
        <div className={`mobile-menu ${menuClass}`}>
          <div className='mobile__menu-top'>
            <Link to='/'>
              <Logo />
            </Link>
            <button
              className='header__menu-btn mobile-menu__close'
              onClick={() => setMenuOpen(false)}
            >
              <IoClose />
            </button>
          </div>
          <HeaderNav
            className="mobile-menu__nav"
            onLinkClick={() => setMenuOpen(false)}
          />

          {!isAuthenticated ? (
            <AuthButtons
              className="mobile-menu__auth"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <ProfileButton
              className="mobile-menu__profile"
              isMobile={true}
              onClick={() => setMenuOpen(false)}
            />
          )}
        </div>
      )}
    </header>
  );
}