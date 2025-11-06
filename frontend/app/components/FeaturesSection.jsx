import styles from './FeaturesSection.module.scss';

const features = [
  {
    id: 1,
    title: 'Fast Performance',
    description: 'Lightning-fast performance optimized for the best user experience',
    icon: '⚡'
  },
  {
    id: 2,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security to keep your data safe and protected',
    icon: '🔒'
  },
  {
    id: 3,
    title: 'Easy Integration',
    description: 'Seamlessly integrate with your existing tools and workflows',
    icon: '🔗'
  },
  {
    id: 4,
    title: '24/7 Support',
    description: 'Round-the-clock support from our dedicated team of experts',
    icon: '🎧'
  }
];

export default function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Us?</h2>
          <p className={styles.subtitle}>
            We provide the best solutions for your business needs
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <div className={styles.icon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>
                {feature.title}
              </h3>
              <p className={styles.featureDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}