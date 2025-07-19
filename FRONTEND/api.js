const API_BASE_URL = 'http://localhost:5000/api/v1';

// Helper function to handle API responses
async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const error = (data && data.error) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}

// Set auth token for requests
function setAuthToken(token) {
  localStorage.setItem('token', token);
}

// Get auth token
function getAuthToken() {
  return localStorage.getItem('token');
}

// Remove auth token
function removeAuthToken() {
  localStorage.removeItem('token');
}

// API request wrapper with auth
async function apiRequest(url, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include', // For cookies
  });

  return handleResponse(response);
}

// Auth API
export const authApi = {
  register: (userData) => 
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getMe: () => 
    apiRequest('/auth/me'),

  updateDetails: (userData) => 
    apiRequest('/auth/updatedetails', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  updatePassword: (passwords) => 
    apiRequest('/auth/updatepassword', {
      method: 'PUT',
      body: JSON.stringify(passwords),
    }),

  logout: () => 
    apiRequest('/auth/logout', { method: 'GET' }),
};

// Tasks API
export const tasksApi = {
  getTasks: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/tasks?${query}`);
  },

  getTask: (id) => 
    apiRequest(`/tasks/${id}`),

  createTask: (taskData) => 
    apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),

  updateTask: (id, taskData) => 
    apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    }),

  deleteTask: (id) => 
    apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};

// Events API
export const eventsApi = {
  getEvents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/events?${query}`);
  },

  getEvent: (id) => 
    apiRequest(`/events/${id}`),

  createEvent: (eventData) => 
    apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),

  updateEvent: (id, eventData) => 
    apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),

  deleteEvent: (id) => 
    apiRequest(`/events/${id}`, {
      method: 'DELETE',
    }),
};

// Moods API
export const moodsApi = {
  getMoods: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/moods?${query}`);
  },

  getMood: (id) => 
    apiRequest(`/moods/${id}`),

  createMood: (moodData) => 
    apiRequest('/moods', {
      method: 'POST',
      body: JSON.stringify(moodData),
    }),

  updateMood: (id, moodData) => 
    apiRequest(`/moods/${id}`, {
      method: 'PUT',
      body: JSON.stringify(moodData),
    }),

  deleteMood: (id) => 
    apiRequest(`/moods/${id}`, {
      method: 'DELETE',
    }),

  getMoodStats: () => 
    apiRequest('/moods/stats'),
};

// Users API
export const usersApi = {
  getUser: (id) => 
    apiRequest(`/users/${id}`),

  updateUser: (id, userData) => 
    apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  deleteUser: (id) => 
    apiRequest(`/users/${id}`, {
      method: 'DELETE',
    }),

  uploadPhoto: (id, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    
    return fetch(`${API_BASE_URL}/users/${id}/photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    }).then(handleResponse);
  },
};
