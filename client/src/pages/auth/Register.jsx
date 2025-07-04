import './auth.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import Button from "../../components/Button/Button";
import { MdEmail } from 'react-icons/md';
import { FaUser, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    form: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (username) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      form: ""
    };

    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email обязателен";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Некорректный email";
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = "Имя пользователя обязательно";
      isValid = false;
    } else if (!validateUsername(formData.username)) {
      newErrors.username = "Только латинские буквы и цифры";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Минимум 6 символов";
      isValid = false;
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Пароли не совпадают";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name] || errors.form) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
        form: ""
      }));
    }
  };

  const parseServerError = (errorMessage) => {
    if (errorMessage.includes('email') || errorMessage.includes('почт') || errorMessage.includes('почта')) {
      return { field: 'email', message: errorMessage };
    } else if (errorMessage.includes('username') || errorMessage.includes('имя пользователя') || errorMessage.includes('логин')) {
      return { field: 'username', message: errorMessage };
    }
    return { field: 'form', message: errorMessage };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await AuthService.register(
        formData.email,
        formData.username,
        formData.password
      );
      console.log("Успешная регистрация:", response.data);
      navigate("/auth/login");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      const errorMessage = error.response?.data?.message || error.message;
      const { field, message } = parseServerError(errorMessage);
      
      setErrors(prev => ({ 
        ...prev, 
        [field]: message,
        form: field === 'form' ? message : ''
      }));

      if (field !== 'form') {
        setTimeout(() => {
          document.querySelector(`[name="${field}"]`)?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 100);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      
      {errors.form && (
        <div className="auth__form-error">
          {errors.form}
        </div>
      )}
      
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-wrapper">
          <MdEmail className="auth__input-icon" />
          <input
            type="email"
            name="email"
            placeholder="*Электронная почта"
            className={`auth__input ${errors.email ? 'auth__input--error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="auth__error">{errors.email}</span>}
        </div>

        <div className="auth__input-wrapper">
          <FaUser className="auth__input-icon" />
          <input
            type="text"
            name="username"
            placeholder="*Имя пользователя (только латиница)"
            className={`auth__input ${errors.username ? 'auth__input--error' : ''}`}
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className="auth__error">{errors.username}</span>}
        </div>

        <div className="auth__input-wrapper">
          <RiLockPasswordFill className="auth__input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="*Пароль (минимум 6 символов)"
            className={`auth__input ${errors.password ? 'auth__input--error' : ''}`}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="auth__password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <span className="auth__error">{errors.password}</span>}
        </div>

        <div className="auth__input-wrapper">
          <RiLockPasswordFill className="auth__input-icon" />
          <input
            type={showRepeatPassword ? "text" : "password"}
            name="repeatPassword"
            placeholder="*Повторите пароль"
            className={`auth__input ${errors.repeatPassword ? 'auth__input--error' : ''}`}
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="auth__password-toggle"
            onClick={toggleRepeatPasswordVisibility}
          >
            {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.repeatPassword && <span className="auth__error">{errors.repeatPassword}</span>}
        </div>

        <Button 
          type="submit" 
          variant="reg" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="auth__spinner" />
              Загрузка...
            </>
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
      </form>

      <p className="auth__link">
        Уже есть аккаунт?{" "}
        <Link to="/auth/login">Войти</Link>
      </p>
    </section>
  );
}