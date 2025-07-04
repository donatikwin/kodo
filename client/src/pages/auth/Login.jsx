import './auth.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthService from "../../service/AuthService";
import Button from "../../components/Button/Button";
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

import { toast } from 'react-toastify';
import './auth.css'

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
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

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {

      const response = await login(formData.email, formData.password);
      console.log("Успешный вход:", response.data);
      toast.success("Добро пожаловать!");
      navigate("/welcome");
    } catch (error) {
      console.error("Ошибка при входе:", error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Неверный email или пароль";
      
      setErrors({
        email: "",
        password: "",
        form: errorMessage
      });
      toast.error(errorMessage); 
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="auth">
      <h1 className="auth__title">Вход</h1>
      
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
          <RiLockPasswordFill className="auth__input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="*Пароль"
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

        <Button 
          type="submit" 
          variant="login"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="auth__spinner" />
              Вход...
            </>
          ) : (
            "Войти"
          )}
        </Button>
      </form>

      <p className="auth__link">
        Нет аккаунта?{" "}
        <Link to="/auth/register">Зарегистрироваться</Link>
      </p>
    </section>
  );
}