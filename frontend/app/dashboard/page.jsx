'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import SalesStatistics from '../components/SalesStatistics';
import SalesList from '../components/SalesList';
import SalesForm from '../components/SalesForm';
import SaleDetails from '../components/SaleDetails';
import salesAPI from '../services/salesAPI';
import styles from './dashboard.module.scss';
import { FaHome, FaChartBar, FaList, FaFileAlt, FaPlus } from 'react-icons/fa';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('list');
  const [refreshSales, setRefreshSales] = useState(0);
  const [salesData, setSalesData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedSales, setSelectedSales] = useState([]);
  const [editingSale, setEditingSale] = useState(null);

  const handleSaleCreated = async (saleData) => {
    await salesAPI.createSale(saleData);
    setRefreshSales(prev => prev + 1);
    setActiveTab('list');
  };

  const handleSaleUpdated = async (saleData) => {
    if (!editingSale) return;
    await salesAPI.updateSale(editingSale.id, saleData);
    setEditingSale(null);
    setRefreshSales(prev => prev + 1);
    setActiveTab('list');
  };

  const handleSaleDeleted = () => {
    setRefreshSales(prev => prev + 1);
  };

  const handleSaleSelected = (sale) => {
    setSelectedSale(sale);
    setActiveTab('details');
  };

  const handleBulkDelete = async (saleIds) => {
    if (window.confirm(`Are you sure you want to delete ${saleIds.length} sales?`)) {
      try {
        await Promise.all(saleIds.map(id => salesAPI.deleteSale(id)));
        setSelectedSales([]);
        setShowBulkActions(false);
        handleSaleDeleted();
      } catch (error) {
        alert('Failed to delete some sales. Please try again.');
        console.error('Error bulk deleting sales:', error);
      }
    }
  };

  const handleStatusUpdate = async (saleIds, newStatus) => {
    try {
      await Promise.all(saleIds.map(id => salesAPI.updateSale(id, { status: newStatus })));
      setSelectedSales([]);
      setShowBulkActions(false);
      handleSaleUpdated();
    } catch (error) {
      alert('Failed to update some sales. Please try again.');
      console.error('Error bulk updating sales:', error);
    }
  };

  const handleSaleSelectionChange = (selectedIds) => {
    setSelectedSales(selectedIds);
  };

  const handleCloseDetails = () => {
    setSelectedSale(null);
    setActiveTab('list');
  };

  const handleSaleStatusChange = (saleId, newStatus) => {
    // Update the selected sale status locally
    if (selectedSale && selectedSale.id === saleId) {
      setSelectedSale(prev => ({ ...prev, status: newStatus }));
    }
    // Trigger refresh
    handleSaleUpdated();
  };

  // Fetch sales statistics
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const data = await salesAPI.getSalesStatistics();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (user) {
      fetchSalesData();
    }
  }, [user, refreshSales]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show loading state during auth check
  if (loading || !user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.dashboardTitle}>Sales Dashboard</h1>
          <div className={styles.userInfo}>
            <button 
              onClick={() => router.push('/')}
              className={styles.homeButton}
            >
              <FaHome /> Home
            </button>
            <span className={styles.userName}>Welcome, {user.email}</span>
            <button 
              onClick={() => router.push('/logout')}
              className={styles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={styles.dashboardNav}>
        <button
          className={`${styles.navTab} ${activeTab === 'statistics' ? styles.active : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          <FaChartBar /> Statistics
        </button>
        <button 
            className={`${styles.tabButton} ${activeTab === 'list' ? styles.active : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <FaList /> Sales List {selectedSales.length > 0 && `(${selectedSales.length})`}
          </button>
          
          {selectedSale && (
            <button 
              className={`${styles.tabButton} ${activeTab === 'details' ? styles.active : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <FaFileAlt /> Sale Details
            </button>
          )}
        <button
          className={`${styles.navTab} ${activeTab === 'create' ? styles.active : ''}`}
          onClick={() => setActiveTab('create')}
        >
          <FaPlus /> Create Sale
        </button>
      </nav>

      {/* Content */}
      <main className={styles.dashboardContent}>
        {activeTab === 'statistics' && (
          <SalesStatistics salesData={salesData} loading={loadingData} />
        )}
        
        {activeTab === 'list' && (
            <SalesList 
              refreshTrigger={refreshSales}
              onSaleUpdated={handleSaleUpdated}
              onSaleDeleted={handleSaleDeleted}
              onSaleSelected={handleSaleSelected}
              selectedSales={selectedSales}
              onSelectionChange={handleSaleSelectionChange}
            />
          )}
          
          {activeTab === 'details' && selectedSale && (
            <SaleDetails
              sale={selectedSale}
              onClose={handleCloseDetails}
              onEdit={(sale) => {
                setEditingSale(sale);
                setActiveTab('create');
              }}
              onDelete={handleSaleDeleted}
              onStatusChange={handleSaleStatusChange}
            />
          )}
        
        {activeTab === 'create' && (
          <SalesForm 
            onSubmit={editingSale ? handleSaleUpdated : handleSaleCreated}
            onCancel={() => {
              setEditingSale(null);
              setActiveTab('list');
            }}
            sale={editingSale}
            isEdit={!!editingSale}
          />
        )}
      </main>
    </div>
  );
}