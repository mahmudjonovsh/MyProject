'use client';

import React, { useState, useEffect } from 'react';
import salesAPI from '../services/salesAPI';
import styles from './SalesForm.module.scss';

export default function SalesForm({ sale = null, onSubmit, onCancel, isEdit = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    status: 'pending',
    customer_name: '',
    customer_email: '',
    customer_phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEditing = isEdit || !!sale;

  useEffect(() => {
    if (sale) {
      setFormData({
        title: sale.title || '',
        description: sale.description || '',
        price: sale.price || '',
        status: sale.status || 'pending',
        customer_name: sale.customer_name || '',
        customer_email: sale.customer_email || '',
        customer_phone: sale.customer_phone || ''
      });
    }
  }, [sale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      
      if (!formData.price || parseFloat(formData.price) <= 0) {
        throw new Error('Price must be greater than 0');
      }

      const submitData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      await onSubmit(submitData);
      
      // Reset form if creating new sale
      if (!sale) {
        setFormData({
          title: '',
          description: '',
          price: '',
          status: 'pending',
          customer_name: '',
          customer_email: '',
          customer_phone: ''
        });
      }
    } catch (error) {
      setError(error.message || 'Failed to save sale. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.salesForm}>
        <div className={styles.formHeader}>
          <h3>{isEditing ? 'Edit Sale' : 'Create New Sale'}</h3>
          {onCancel && (
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              ✕
            </button>
          )}
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.formInput}
            placeholder="Enter sale title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={styles.formTextarea}
            placeholder="Enter sale description (optional)"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className={styles.formInput}
              placeholder="0.00"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.formSelect}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className={styles.formSection}>
          <h4>Customer Information</h4>
          
          <div className={styles.formGroup}>
            <label htmlFor="customer_name">Customer Name</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter customer name (optional)"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="customer_email">Customer Email</label>
              <input
                type="email"
                id="customer_email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="customer@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="customer_phone">Customer Phone</label>
              <input
                type="tel"
                id="customer_phone"
                name="customer_phone"
                value={formData.customer_phone}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Sale' : 'Create Sale')}
          </button>
        </div>
      </form>
    </div>
  );
}