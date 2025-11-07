'use client';

import React from 'react';
import salesAPI from '../services/salesAPI';
import styles from './SaleDetails.module.scss';

export default function SaleDetails({ sale, onClose, onEdit, onDelete, onStatusChange }) {
  if (!sale) return null;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        await salesAPI.deleteSale(sale.id);
        onDelete(sale.id);
        onClose();
      } catch (error) {
        alert('Failed to delete sale. Please try again.');
        console.error('Error deleting sale:', error);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await salesAPI.updateSale(sale.id, { status: newStatus });
      onStatusChange(sale.id, newStatus);
    } catch (error) {
      alert('Failed to update sale status. Please try again.');
      console.error('Error updating sale status:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'pending': styles.statusPending,
      'completed': styles.statusCompleted,
      'cancelled': styles.statusCancelled
    };
    return classes[status] || styles.statusDefault;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Sale Details</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <div className={styles.saleDetails}>
          <div className={styles.detailSection}>
            <h3>Basic Information</h3>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Title:</span>
              <span className={styles.detailValue}>{sale.title}</span>
            </div>
            
            {sale.description && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Description:</span>
                <span className={styles.detailValue}>{sale.description}</span>
              </div>
            )}

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status:</span>
              <span className={`${styles.statusBadge} ${getStatusBadgeClass(sale.status)}`}>
                {sale.status}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Price:</span>
              <span className={styles.detailValue}>{sale.formatted_price}</span>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h3>Customer Information</h3>
            {sale.customer_name && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Name:</span>
                <span className={styles.detailValue}>{sale.customer_name}</span>
              </div>
            )}
            
            {sale.customer_email && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Email:</span>
                <span className={styles.detailValue}>{sale.customer_email}</span>
              </div>
            )}
            
            {sale.customer_phone && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Phone:</span>
                <span className={styles.detailValue}>{sale.customer_phone}</span>
              </div>
            )}
          </div>

          <div className={styles.detailSection}>
            <h3>Timeline</h3>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Created:</span>
              <span className={styles.detailValue}>{formatDate(sale.created_at)}</span>
            </div>
            
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Last Updated:</span>
              <span className={styles.detailValue}>{formatDate(sale.updated_at)}</span>
            </div>
          </div>
        </div>

        <div className={styles.modalActions}>
          <div className={styles.statusActions}>
            <span className={styles.actionLabel}>Change Status:</span>
            <button 
              onClick={() => handleStatusChange('pending')}
              className={`${styles.statusButton} ${sale.status === 'pending' ? styles.active : ''}`}
              disabled={sale.status === 'pending'}
            >
              Pending
            </button>
            <button 
              onClick={() => handleStatusChange('completed')}
              className={`${styles.statusButton} ${sale.status === 'completed' ? styles.active : ''}`}
              disabled={sale.status === 'completed'}
            >
              Completed
            </button>
            <button 
              onClick={() => handleStatusChange('cancelled')}
              className={`${styles.statusButton} ${sale.status === 'cancelled' ? styles.active : ''}`}
              disabled={sale.status === 'cancelled'}
            >
              Cancelled
            </button>
          </div>

          <div className={styles.mainActions}>
            <button onClick={() => onEdit(sale)} className={styles.editButton}>
              ✏️ Edit Sale
            </button>
            <button onClick={handleDelete} className={styles.deleteButton}>
              🗑️ Delete Sale
            </button>
            <button onClick={onClose} className={styles.cancelButton}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}