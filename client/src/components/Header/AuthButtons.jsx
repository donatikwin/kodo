// AuthButtons.jsx
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export default function AuthButtons({ className = "", onClick }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (onClick) onClick(); 
    navigate(path);
  };

  return (
    <div className={`header__auth ${className}`}>
      <Button variant="login" onClick={() => handleNavigate("/auth/login")}>
        Войти
      </Button>
      <Button variant="reg" onClick={() => handleNavigate("/auth/register")}>
        Зарегистрироваться
      </Button>
    </div>
  );
}
