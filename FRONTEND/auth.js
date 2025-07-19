import { authApi } from './api.js';

class AuthService {
  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Set current user in localStorage
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  // Register a new user
  async register(userData) {
    try {
      const response = await authApi.register(userData);
      this.setCurrentUser(response.data.user);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await authApi.login(credentials);
      this.setCurrentUser(response.data.user);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      await authApi.logout();
      this.setCurrentUser(null);
      window.location.href = '/login.html';
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await authApi.getMe();
      this.setCurrentUser(response.data);
      return response;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw error;
    }
  }

  // Update user details
  async updateDetails(userData) {
    try {
      const response = await authApi.updateDetails(userData);
      this.setCurrentUser(response.data.user);
      return response;
    } catch (error) {
      console.error('Failed to update details:', error);
      throw error;
    }
  }

  // Update password
  async updatePassword(passwords) {
    try {
      const response = await authApi.updatePassword(passwords);
      return response;
    } catch (error) {
      console.error('Failed to update password:', error);
      throw error;
    }
  }

  // Check if user has specific role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }
}

export const authService = new AuthService();
