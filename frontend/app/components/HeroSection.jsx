import styles from './HeroSection.module.scss';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Welcome to Our Amazing Platform
          </h1>
          <p className={styles.subtitle}>
            Discover incredible features and boost your productivity with our innovative solutions
          </p>
          <div className={styles.buttons}>
            <button className={styles.primaryButton}>
              Get Started
            </button>
            <button className={styles.secondaryButton}>
              Learn More
            </button>
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Team collaboration"
              width={600}
              height={400}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}