import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './features.module.scss';

const mainFeatures = [
  {
    title: 'Advanced Analytics',
    description: 'Get deep insights into your business performance with our powerful analytics dashboard. Track metrics, identify trends, and make data-driven decisions.',
    icon: '📊',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    details: [
      'Real-time data visualization',
      'Custom report generation',
      'Predictive analytics',
      'Performance benchmarking'
    ]
  },
  {
    title: 'Team Collaboration',
    description: 'Enhance team productivity with our collaboration tools. Share files, communicate in real-time, and manage projects seamlessly.',
    icon: '👥',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop',
    details: [
      'Real-time messaging',
      'File sharing and version control',
      'Project management tools',
      'Video conferencing integration'
    ]
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise-grade security to protect your data and ensure compliance with industry standards and regulations.',
    icon: '🔒',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=300&fit=crop',
    details: [
      'End-to-end encryption',
      'Multi-factor authentication',
      'Regular security audits',
      'GDPR and SOC 2 compliance'
    ]
  }
];

const additionalFeatures = [
  {
    category: 'Automation',
    features: [
      {
        title: 'Workflow Automation',
        description: 'Automate repetitive tasks and streamline your processes',
        icon: '⚙️'
      },
      {
        title: 'Smart Notifications',
        description: 'Intelligent alerts based on your preferences and behavior',
        icon: '🔔'
      },
      {
        title: 'Integration Hub',
        description: 'Connect with 1000+ third-party applications',
        icon: '🔗'
      }
    ]
  },
  {
    category: 'Performance',
    features: [
      {
        title: 'Lightning Fast',
        description: 'Optimized for speed with 99.9% uptime guarantee',
        icon: '⚡'
      },
      {
        title: 'Scalable Infrastructure',
        description: 'Grow without limits with our cloud-native architecture',
        icon: '📈'
      },
      {
        title: 'Global CDN',
        description: 'Fast loading times anywhere in the world',
        icon: '🌍'
      }
    ]
  },
  {
    category: 'Support',
    features: [
      {
        title: '24/7 Support',
        description: 'Round-the-clock assistance from our expert team',
        icon: '💬'
      },
      {
        title: 'Knowledge Base',
        description: 'Comprehensive documentation and tutorials',
        icon: '📚'
      },
      {
        title: 'Training Programs',
        description: 'Onboarding and training for your team',
        icon: '🎓'
      }
    ]
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'Tech Innovations Inc.',
    role: 'CEO',
    content: 'This platform has transformed how we manage our business. The analytics alone have increased our efficiency by 40%.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Michael Chen',
    company: 'Global Solutions',
    role: 'Operations Director',
    content: 'The collaboration features are outstanding. Our team communication has never been better.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Emily Rodriguez',
    company: 'Creative Agency',
    role: 'Project Manager',
    content: 'Security and compliance features give us peace of mind when handling sensitive client data.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

export default function Features() {
  return (
    <div className={styles.featuresPage}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Powerful Features</h1>
          <p className={styles.subtitle}>
            Discover the comprehensive set of features that make our platform the perfect choice for your business
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className={styles.mainFeatures}>
        <div className={styles.container}>
          {mainFeatures.map((feature, index) => (
            <div key={index} className={`${styles.featureRow} ${index % 2 === 1 ? styles.reverse : ''}`}>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h2 className={styles.featureTitle}>{feature.title}</h2>
                <p className={styles.featureDescription}>{feature.description}</p>
                <ul className={styles.detailsList}>
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className={styles.detailItem}>
                      <span className={styles.checkIcon}>✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link href="/products" className={styles.learnMoreButton}>
                  Learn More
                </Link>
              </div>
              <div className={styles.featureImage}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={500}
                  height={300}
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className={styles.additionalFeatures}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>More Features</h2>
          {additionalFeatures.map((category, categoryIndex) => (
            <div key={categoryIndex} className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <div className={styles.categoryGrid}>
                {category.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={styles.categoryFeatureCard}>
                    <div className={styles.categoryFeatureIcon}>{feature.icon}</div>
                    <h4 className={styles.categoryFeatureTitle}>{feature.title}</h4>
                    <p className={styles.categoryFeatureDescription}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialText}>"{testimonial.content}"</p>
                  <div className={styles.testimonialAuthor}>
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className={styles.authorAvatar}
                    />
                    <div className={styles.authorInfo}>
                      <div className={styles.authorName}>{testimonial.name}</div>
                      <div className={styles.authorRole}>{testimonial.role}</div>
                      <div className={styles.authorCompany}>{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Experience These Features?</h2>
          <p className={styles.ctaDescription}>
            Start your free trial today and see how our features can transform your business
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/signup" className={styles.primaryButton}>
              Start Free Trial
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}