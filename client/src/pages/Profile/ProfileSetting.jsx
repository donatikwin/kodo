import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../service/AuthService';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';

import {
  FaUser, FaLock, FaTrash, FaCheck, FaTimes, FaSave,
  FaExclamationTriangle, FaEye, FaEyeSlash, FaEnvelope
} from 'react-icons/fa';

import styles from './ProfileSetting.module.css';

export default function ProfileSettings() {
    const [userInfo, setUserInfo] = useState({
    username: 'Гость',
    email: ''
  });


  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

    useEffect(() => {
    AuthService.getMe()
      .then(data => setUserInfo({
        username: data.username || 'Гость',
        email: data.email || ''
      }))
      .catch(() => setUserInfo({
        username: 'Гость',
        email: ''
      }));
    }, []);

    const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    try {
      setIsLoading(true);
      await AuthService.changePassword(currentPassword, newPassword);
      toast.success("Пароль успешно изменён");

      localStorage.removeItem('token');
      toast.info("Пожалуйста, войдите снова");

      logout();
      navigate('/auth/login');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error?.message || "Ошибка при смене пароля");
      console.error("Ошибка при смене пароля:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError('Пожалуйста, введите ваш пароль');
      return;
    }

    try {
      setIsLoading(true);
      await AuthService.deleteAccount(deletePassword);

      toast.success('Ваш аккаунт удалён. До новых встреч!');

      logout(); 
      navigate('/'); 
      
    } catch (error) {
      console.error('Ошибка удаления:', error);
      setDeleteError(error?.response?.data?.message || 'Ошибка при удалении аккаунта');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.profileSettings}>
      <div className={styles.settingsHeader}>
        <h1 className={styles.sectionTitle}>
          <FaUser /> Настройки профиля
          <span className={styles.titleUnderline}></span>
        </h1>
        <p className={styles.sectionSubtitle}>Управление вашей учетной записью</p>
      </div>
      <div className={styles.settingsCard}>
        <div className={styles.cardGlow}></div>
        <h2><FaUser /> Мои данные</h2>
        
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfoItem}>
            <div className={styles.userInfoLabel}>
              <FaUser className={styles.infoIcon} />
              <span>Имя пользователя:</span>
            </div>
            <div className={styles.userInfoValue}>
              {userInfo.username}
            </div>
          </div>
          
          <div className={styles.userInfoItem}>
            <div className={styles.userInfoLabel}>
              <FaEnvelope className={styles.infoIcon} />
              <span>Email:</span>
            </div>
            <div className={styles.userInfoValue}>
              {userInfo.email || 'Не указан'}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.settingsCard}>
        <div className={styles.cardGlow}></div>
        <h2><FaLock /> Изменить пароль</h2>

      <form onSubmit={handlePasswordSubmit}>
        {/* 1. Текущий пароль */}
        <div className={styles.formGroup}>
          <label>Текущий пароль</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Введите текущий пароль"
            />
            <button 
              type="button" 
              onClick={() => setShowCurrent(!showCurrent)} 
              className={styles.eyeBtn}
              aria-label={showCurrent ? "Скрыть пароль" : "Показать пароль"}
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* 2. Новый пароль */}
        <div className={styles.formGroup}>
          <label>Новый пароль</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength="6"
              required
              placeholder="Придумайте новый пароль"
            />
            <button 
              type="button" 
              onClick={() => setShowNew(!showNew)} 
              className={styles.eyeBtn}
              aria-label={showNew ? "Скрыть пароль" : "Показать пароль"}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <span className={styles.inputHint}>Минимум 6 символов</span>
        </div>

        {/* 3. Подтверждение нового пароля */}
        <div className={styles.formGroup}>
          <label>Подтвердите новый пароль</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Повторите новый пароль"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirm(!showConfirm)} 
              className={styles.eyeBtn}
              aria-label={showConfirm ? "Скрыть пароль" : "Показать пароль"}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <span className={styles.errorText}>Пароли не совпадают</span>
          )}
        </div>

        <button
          type="submit"
          className={`${styles.saveBtn} ${styles.activeBtn}`}
          disabled={isLoading || !currentPassword || !newPassword || newPassword !== confirmPassword}
        >
          <FaSave /> {isLoading ? 'Сохранение...' : 'Изменить пароль'}
        </button>
      </form>
      </div>

      <div className={`${styles.settingsCard} ${styles.dangerZone}`}>
        <div className={styles.cardGlow}></div>
        <h2><FaTrash /> Удаление аккаунта</h2>
        <p>Это действие невозможно отменить. Все ваши данные будут безвозвратно удалены.</p>

        {!isDeleteConfirm ? (
          <button
            className={styles.deleteBtn}
            onClick={() => setIsDeleteConfirm(true)}
            disabled={isLoading}
          >
            Удалить аккаунт
          </button>
        ) : (
          <div className={styles.confirmDelete}>
            <div className={styles.deleteWarning}>
              <FaExclamationTriangle className={styles.warningIcon} />
              <p>Для подтверждения введите ваш текущий пароль:</p>
            </div>

            <div className={styles.formGroup}>
              <label>Текущий пароль</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showDelete ? 'text' : 'password'}
                  value={deletePassword}
                  onChange={(e) => {
                    setDeletePassword(e.target.value);
                    setDeleteError('');
                  }}
                  required
                  className={deleteError ? styles.errorInput : ''}
                />
                <button type="button" onClick={() => setShowDelete(!showDelete)} className={styles.eyeBtn}>
                  {showDelete ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {deleteError && <span className={styles.errorText}>{deleteError}</span>}
            </div>

            <div className={styles.confirmButtons}>
              <button
                className={styles.confirmBtn}
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                <FaCheck /> {isLoading ? 'Удаление...' : 'Подтвердить удаление'}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setIsDeleteConfirm(false);
                  setDeletePassword('');
                  setDeleteError('');
                }}
                disabled={isLoading}
              >
                <FaTimes /> Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
