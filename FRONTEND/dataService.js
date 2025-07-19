import { tasksApi, eventsApi, moodsApi } from './api.js';

class DataService {
  // Tasks
  async getTasks(filters = {}) {
    try {
      const response = await tasksApi.getTasks(filters);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(taskData) {
    try {
      const response = await tasksApi.createTask(taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id, taskData) {
    try {
      const response = await tasksApi.updateTask(id, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      await tasksApi.deleteTask(id);
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // Events
  async getEvents(filters = {}) {
    try {
      const response = await eventsApi.getEvents(filters);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async createEvent(eventData) {
    try {
      const response = await eventsApi.createEvent(eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async updateEvent(id, eventData) {
    try {
      const response = await eventsApi.updateEvent(id, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      await eventsApi.deleteEvent(id);
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  // Moods
  async getMoods(filters = {}) {
    try {
      const response = await moodsApi.getMoods(filters);
      return response.data;
    } catch (error) {
      console.error('Error fetching moods:', error);
      throw error;
    }
  }

  async createMood(moodData) {
    try {
      const response = await moodsApi.createMood(moodData);
      return response.data;
    } catch (error) {
      console.error('Error creating mood:', error);
      throw error;
    }
  }

  async updateMood(id, moodData) {
    try {
      const response = await moodsApi.updateMood(id, moodData);
      return response.data;
    } catch (error) {
      console.error('Error updating mood:', error);
      throw error;
    }
  }

  async deleteMood(id) {
    try {
      await moodsApi.deleteMood(id);
      return true;
    } catch (error) {
      console.error('Error deleting mood:', error);
      throw error;
    }
  }

  async getMoodStats() {
    try {
      const response = await moodsApi.getMoodStats();
      return response.data;
    } catch (error) {
      console.error('Error fetching mood stats:', error);
      throw error;
    }
  }

  // Helper to format date for API
  formatDate(date) {
    return new Date(date).toISOString().split('T')[0];
  }
}

export const dataService = new DataService();
