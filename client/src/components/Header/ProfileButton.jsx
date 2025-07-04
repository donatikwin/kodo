import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AuthService from '../../service/AuthService';
import { useAuth } from '../../hooks/useAuth';
import './ProfileButton.css';

export default function ProfileButton({ className = '', onClick, isMobile = false }) {
  const { setIsAuthenticated } = useAuth();
  const [username, setUsername] = useState('Профиль');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getMe()
      .then(data => setUsername(data.username))
      .catch(() => setUsername('Профиль'));
  }, []);

  const handleLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      toast.success('Вы успешно вышли из системы');
      navigate('/');
    }
  };

  if (isMobile) {
    return (
      <div className={`mobile-profile ${className}`}>
        <div className="mobile-profile__user">
          <FaUserCircle size={42} />
          <span className="mobile-profile__username">{username}</span>
        </div>
        <button 
          className="mobile-profile__btn" 
          onClick={() => {
            navigate('/profile/setting');
            onClick?.();
          }}
        >
          <FaCog className="icon" /> Настройки профиля
        </button>
        <button 
          className="mobile-profile__btn logout" 
          onClick={handleLogout}
        >
          <FaSignOutAlt className="icon" /> Выйти
        </button>
      </div>
    );
  }

  // Десктопная версия 
  return (
      <div className={`profile-button ${className}`}>
        <button
          className="profile-button__toggle"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Открыть меню профиля"
        >
          <FaUserCircle className="profile-button__avatar" size={24} />
          <span className="profile-button__username">{username}</span>
          <svg className={`profile-button__chevron ${isMenuOpen ? 'open' : ''}`} viewBox="0 0 20 20">
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </button>
        
        <div className={`profile-dropdown ${isMenuOpen ? 'active' : ''}`}>
          <button
            className="profile-dropdown__item"
            onClick={() => {
              navigate('/profile/setting');
              setIsMenuOpen(false);
            }}
          >
            <FaCog className="dropdown-icon" />
            Настройки
          </button>
          <button
            className="profile-dropdown__item logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="dropdown-icon" />
            Выйти
          </button>
        </div>
      </div>
  );
}
