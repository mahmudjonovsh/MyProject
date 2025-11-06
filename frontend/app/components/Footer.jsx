import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>MyProject</h3>
            <p className={styles.brandDescription}>
              Building the future with innovative solutions
            </p>
          </div>
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Product</h4>
              <ul className={styles.linkList}>
                <li><a href="#features" className={styles.link}>Features</a></li>
                <li><a href="#pricing" className={styles.link}>Pricing</a></li>
                <li><a href="#integrations" className={styles.link}>Integrations</a></li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Company</h4>
              <ul className={styles.linkList}>
                <li><a href="#about" className={styles.link}>About</a></li>
                <li><a href="#team" className={styles.link}>Team</a></li>
                <li><a href="#careers" className={styles.link}>Careers</a></li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Support</h4>
              <ul className={styles.linkList}>
                <li><a href="#help" className={styles.link}>Help Center</a></li>
                <li><a href="#contact" className={styles.link}>Contact</a></li>
                <li><a href="#status" className={styles.link}>Status</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.legal}>
            <p className={styles.copyright}>
              © 2024 MyProject. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <a href="#privacy" className={styles.legalLink}>Privacy Policy</a>
              <a href="#terms" className={styles.legalLink}>Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}