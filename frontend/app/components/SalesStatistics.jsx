'use client';

import React from 'react';
import styles from './SalesStatistics.module.scss';

export default function SalesStatistics({ salesData, loading }) {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading statistics...</p>
      </div>
    );
  }

  if (!salesData) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load sales statistics</p>
      </div>
    );
  }

  const { total_sales, total_revenue, pending_count, completed_count, cancelled_count } = salesData;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className={styles.statisticsContainer}>
      <h2 className={styles.statisticsTitle}>Sales Overview</h2>
      
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.totalSales}`}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{total_sales}</h3>
            <p className={styles.statLabel}>Total Sales</p>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.totalRevenue}`}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{formatCurrency(total_revenue)}</h3>
            <p className={styles.statLabel}>Total Revenue</p>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.pendingSales}`}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{pending_count}</h3>
            <p className={styles.statLabel}>Pending Sales</p>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.completedSales}`}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{completed_count}</h3>
            <p className={styles.statLabel}>Completed Sales</p>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.cancelledSales}`}>
          <div className={styles.statIcon}>❌</div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{cancelled_count}</h3>
            <p className={styles.statLabel}>Cancelled Sales</p>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.avgSaleValue}`}>
          <div className={styles.statIcon}>📈</div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>
              {formatCurrency(total_sales > 0 ? total_revenue / total_sales : 0)}
            </h3>
            <p className={styles.statLabel}>Average Sale Value</p>
          </div>
        </div>
      </div>

      <div className={styles.statusBreakdown}>
        <h3 className={styles.breakdownTitle}>Sales Status Breakdown</h3>
        <div className={styles.breakdownChart}>
          <div className={styles.chartBar}>
            <div 
              className={styles.chartFill} 
              style={{ 
                width: `${total_sales > 0 ? (completed_count / total_sales) * 100 : 0}%`,
                backgroundColor: '#28a745'
              }}
            ></div>
            <span className={styles.chartLabel}>Completed ({completed_count})</span>
          </div>
          <div className={styles.chartBar}>
            <div 
              className={styles.chartFill} 
              style={{ 
                width: `${total_sales > 0 ? (pending_count / total_sales) * 100 : 0}%`,
                backgroundColor: '#ffc107'
              }}
            ></div>
            <span className={styles.chartLabel}>Pending ({pending_count})</span>
          </div>
          <div className={styles.chartBar}>
            <div 
              className={styles.chartFill} 
              style={{ 
                width: `${total_sales > 0 ? (cancelled_count / total_sales) * 100 : 0}%`,
                backgroundColor: '#dc3545'
              }}
            ></div>
            <span className={styles.chartLabel}>Cancelled ({cancelled_count})</span>
          </div>
        </div>
      </div>
    </div>
  );
}