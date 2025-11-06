import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
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
          <Link href="/login" className={styles.loginButton}>Login</Link>
          <Link href="/signup" className={styles.signupButton}>Sign Up</Link>
        </div>
      </div>
    </header>
  );
}