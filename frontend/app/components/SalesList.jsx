'use client';

import React, { useState, useEffect } from 'react';
import salesAPI from '../services/salesAPI';
import SalesForm from './SalesForm';
import styles from './SalesList.module.scss';

export default function SalesList({ refreshTrigger, onSaleUpdated, onSaleDeleted, onSaleSelected, selectedSales: externalSelectedSales, onSelectionChange }) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingSale, setEditingSale] = useState(null);
  const [selectedSales, setSelectedSales] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchSales();
  }, [refreshTrigger]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedSales);
    }
  }, [selectedSales, onSelectionChange]);

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError('');
      
      const filters = {};
      if (statusFilter) filters.status = statusFilter;
      if (searchTerm) filters.search = searchTerm;
      
      const data = await salesAPI.getSales(filters);
      setSales(data.sales);
    } catch (error) {
      setError('Failed to fetch sales. Please try again.');
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        await salesAPI.deleteSale(id);
        onSaleDeleted();
      } catch (error) {
        alert('Failed to delete sale. Please try again.');
        console.error('Error deleting sale:', error);
      }
    }
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
  };

  const handleSaveEdit = async (updatedSale) => {
    try {
      await salesAPI.updateSale(editingSale.id, updatedSale);
      setEditingSale(null);
      onSaleUpdated();
    } catch (error) {
      alert('Failed to update sale. Please try again.');
      console.error('Error updating sale:', error);
    }
  };

  const handleSaleSelect = (saleId) => {
    setSelectedSales(prev => {
      if (prev.includes(saleId)) {
        return prev.filter(id => id !== saleId);
      } else {
        return [...prev, saleId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedSales.length === sales.length) {
      setSelectedSales([]);
    } else {
      setSelectedSales(sales.map(sale => sale.id));
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedSales.length} sales?`)) {
      try {
        await Promise.all(selectedSales.map(id => salesAPI.deleteSale(id)));
        setSelectedSales([]);
        setShowBulkActions(false);
        onSaleDeleted();
      } catch (error) {
        alert('Failed to delete some sales. Please try again.');
        console.error('Error bulk deleting sales:', error);
      }
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    try {
      await Promise.all(selectedSales.map(id => salesAPI.updateSale(id, { status: newStatus })));
      setSelectedSales([]);
      setShowBulkActions(false);
      onSaleUpdated();
    } catch (error) {
      alert('Failed to update some sales. Please try again.');
      console.error('Error bulk updating sales:', error);
    }
  };

  const handleSaleClick = (sale) => {
    if (onSaleSelected) {
      onSaleSelected(sale);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'pending': styles.statusPending,
      'completed': styles.statusCompleted,
      'cancelled': styles.statusCancelled
    };
    return classes[status] || styles.statusDefault;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading sales...</p>
      </div>
    );
  }

  return (
    <div className={styles.salesListContainer}>
      <div className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={fetchSales} className={styles.searchButton}>
            🔍
          </button>
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.statusFilter}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        
        <button onClick={fetchSales} className={styles.refreshButton}>
          🔄 Refresh
        </button>
        
        {sales.length > 0 && (
          <button onClick={handleSelectAll} className={styles.selectAllButton}>
            {selectedSales.length === sales.length ? 'Deselect All' : 'Select All'}
          </button>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Bulk Actions */}
      {selectedSales.length > 0 && (
        <div className={styles.bulkActions}>
          <div className={styles.bulkInfo}>
            <span>{selectedSales.length} sale(s) selected</span>
          </div>
          <div className={styles.bulkButtons}>
            <button 
              onClick={() => handleBulkStatusUpdate('pending')}
              className={styles.bulkButton}
            >
              Set Pending
            </button>
            <button 
              onClick={() => handleBulkStatusUpdate('completed')}
              className={styles.bulkButton}
            >
              Set Completed
            </button>
            <button 
              onClick={() => handleBulkStatusUpdate('cancelled')}
              className={styles.bulkButton}
            >
              Set Cancelled
            </button>
            <button 
              onClick={handleBulkDelete}
              className={styles.bulkDeleteButton}
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {sales.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No sales found</h3>
          <p>Create your first sale to get started!</p>
        </div>
      ) : (
        <div className={styles.salesGrid}>
          {sales.map((sale) => (
            <div key={sale.id} className={`${styles.saleCard} ${selectedSales.includes(sale.id) ? styles.selected : ''}`}>
              <div className={styles.cardHeader}>
                <input
                  type="checkbox"
                  checked={selectedSales.includes(sale.id)}
                  onChange={() => handleSaleSelect(sale.id)}
                  className={styles.selectCheckbox}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className={styles.cardTitle}>{sale.title}</span>
              </div>
              <div className={styles.saleHeader}>
                <h3 className={styles.saleTitle}>{sale.title}</h3>
                <span className={`${styles.statusBadge} ${getStatusBadgeClass(sale.status)}`}>
                  {sale.status}
                </span>
              </div>
              
              {sale.description && (
                <p className={styles.saleDescription}>{sale.description}</p>
              )}
              
              <div className={styles.saleDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Price:</span>
                  <span className={styles.detailValue}>{sale.formatted_price}</span>
                </div>
                
                {sale.customer_name && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Customer:</span>
                    <span className={styles.detailValue}>{sale.customer_name}</span>
                  </div>
                )}
                
                {sale.customer_email && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Email:</span>
                    <span className={styles.detailValue}>{sale.customer_email}</span>
                  </div>
                )}
                
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Created:</span>
                  <span className={styles.detailValue}>{formatDate(sale.created_at)}</span>
                </div>
              </div>
              
              <div className={styles.saleActions}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(sale);
                  }}
                  className={styles.editButton}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(sale.id);
                  }}
                  className={styles.deleteButton}
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaleClick(sale);
                  }}
                  className={styles.viewButton}
                >
                  👁️ View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingSale && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Edit Sale</h2>
            <SalesForm
              sale={editingSale}
              onSubmit={handleSaveEdit}
              onCancel={() => setEditingSale(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}