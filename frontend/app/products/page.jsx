import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCloud, FaUsers, FaChartBar, FaShieldAlt } from 'react-icons/fa';
import styles from './products.module.scss';

const products = [
  {
    id: 1,
    title: 'Basic Package',
    price: '$29/month',
    description: 'Perfect for individuals and small teams',
    features: ['Up to 5 users', '10GB storage', 'Basic support', 'Mobile app'],
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    popular: false
  },
  {
    id: 2,
    title: 'Professional Package',
    price: '$79/month',
    description: 'Ideal for growing businesses',
    features: ['Up to 50 users', '100GB storage', 'Priority support', 'Advanced analytics', 'API access'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 3,
    title: 'Enterprise Package',
    price: '$199/month',
    description: 'For large organizations',
    features: ['Unlimited users', '1TB storage', '24/7 support', 'Custom integrations', 'Advanced security'],
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    popular: false
  }
];

const additionalFeatures = [
  {
    title: 'Cloud Storage',
    description: 'Secure and scalable cloud storage solutions',
    icon: <FaCloud />,
    price: 'Starting at $9/month'
  },
  {
    title: 'Collaboration Tools',
    description: 'Advanced team collaboration and communication',
    icon: <FaUsers />,
    price: 'Starting at $15/month'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics and reporting',
    icon: <FaChartBar />,
    price: 'Starting at $25/month'
  },
  {
    title: 'Security Suite',
    description: 'Enterprise-grade security features',
    icon: <FaShieldAlt />,
    price: 'Starting at $35/month'
  }
];

export default function Products() {
  return (
    <div className={styles.productsPage}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Our Products</h1>
          <p className={styles.subtitle}>
            Discover our comprehensive suite of solutions designed to help your business thrive
          </p>
        </div>
      </section>

      {/* Main Products */}
      <section className={styles.mainProducts}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Choose Your Plan</h2>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={`${styles.productCard} ${product.popular ? styles.popular : ''}`}>
                {product.popular && <div className={styles.popularBadge}>Most Popular</div>}
                <div className={styles.productImage}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={300}
                    className={styles.image}
                  />
                </div>
                <div className={styles.productContent}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <div className={styles.price}>{product.price}</div>
                  <ul className={styles.featuresList}>
                    {product.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.checkIcon}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`${styles.ctaButton} ${product.popular ? styles.popularButton : ''}`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className={styles.additionalFeatures}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Additional Features</h2>
          <div className={styles.featuresGrid}>
            {additionalFeatures.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <div className={styles.featurePrice}>{feature.price}</div>
                <button className={styles.featureButton}>Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of satisfied customers who trust our solutions
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/signup" className={styles.primaryButton}>
              Start Free Trial
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}