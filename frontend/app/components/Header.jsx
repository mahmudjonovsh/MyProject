'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <h1>MyProject</h1>
          </Link>
        </div>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/products" className={styles.navLink}>Products</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/features" className={styles.navLink}>Features</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.actions}>
          {user ? (
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
          ) : (
            <>
              <Link href="/login" className={styles.loginButton}>Login</Link>
              <Link href="/signup" className={styles.signupButton}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}