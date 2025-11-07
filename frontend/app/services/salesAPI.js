import { apiFetch } from './api';

const API_BASE_URL = 'http://localhost:8000/api';

// Sales API service
export const salesAPI = {
  // Get all sales with optional filtering
  getSales: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.search) queryParams.append('search', filters.search);
      
      const url = `${API_BASE_URL}/sales/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const response = await apiFetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch sales');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }
  },

  // Get a single sale by ID
  getSale: async (id) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/sales/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch sale');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching sale:', error);
      throw error;
    }
  },

  // Create a new sale
  createSale: async (saleData) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/sales/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create sale');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  },

  // Update an existing sale
  updateSale: async (id, saleData) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/sales/${id}/update/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update sale');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating sale:', error);
      throw error;
    }
  },

  // Delete a sale
  deleteSale: async (id) => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/sales/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete sale');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting sale:', error);
      throw error;
    }
  },

  // Get sales statistics
  getSalesStatistics: async () => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/sales/statistics/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch sales statistics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching sales statistics:', error);
      throw error;
    }
  },
};

export default salesAPI;