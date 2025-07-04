import API from "../http"; 

export default class AuthService {
  static async register(email, username, password) {
    const response = await API.post('/registration', { email, username, password });
    localStorage.setItem('token', response.data.accessToken);
    return response;
  }

  static async login(email, password) {
    try {
      const response = await API.post('/login', { email, password });
      console.log("Ответ сервера:", response.data); 
      localStorage.setItem('token', response.data.accessToken);
      return response;
    } catch (error) {
      console.error("Ошибка в AuthService.login:", error.response?.data);
      throw error;
    }
  }

  static async logout() {
    await API.post('/logout');
    localStorage.removeItem('token');
  }

  static async refresh() {
    try {
      const response = await API.get('/refresh');
      localStorage.setItem('token', response.data.accessToken);
      return response;
    } catch (error) {
      localStorage.removeItem('token');

      window.location.href = '/';
      throw error;
    }
  }

  static async checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token');
    }
    return this.refresh();
  }


  static async getUserProfile() {
    try {
      const response = await API.get('/profile');
      return response.data;
    } catch (error) {
      console.error("Ошибка получения профиля:", error);
      throw error;
    }
  }

  static async getMe() {
    try {
      const response = await API.get('/me');
      console.log('Данные пользователя:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка в getMe:', error);
      throw error;
    }
  }

  static async changePassword(currentPassword, newPassword) {
    try {
      const response = await API.patch('/change-password', {
          currentPassword,
          newPassword
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при смене пароля:", error.response?.data);
      throw error;
    }
  }

  static async deleteAccount(password) {
    const response = await API.delete('/delete-account', {
      data: { password }
    });
    return response;
  }
}