import { useAuth } from '../contexts/AuthContext';

// Create a custom fetch wrapper that handles token refresh
export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  let response = await fetch(url, options);

  // If token is expired (401), try to refresh it
  if (response.status === 401) {
    try {
      // Try to refresh the token
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const refreshResponse = await fetch('http://localhost:8000/api/auth/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem('token', data.access);
          
          // Retry the original request with new token
          options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${data.access}`,
          };
          response = await fetch(url, options);
        } else {
          // Refresh failed, logout
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
  }

  return response;
};