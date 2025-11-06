'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './contact.module.scss';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Office Address',
      content: '123 Business Street, Suite 100\nNew York, NY 10001',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop'
    },
    {
      icon: '📞',
      title: 'Phone Numbers',
      content: 'Sales: +1 (555) 123-4567\nSupport: +1 (555) 987-6543',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop'
    },
    {
      icon: '✉️',
      title: 'Email Addresses',
      content: 'sales@company.com\nsupport@company.com',
      image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=200&fit=crop'
    },
    {
      icon: '🕐',
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop'
    }
  ];

  const faqs = [
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.'
    },
    {
      question: 'Do you offer custom solutions?',
      answer: 'Yes, we provide customized solutions tailored to your specific business needs. Contact our sales team to discuss your requirements.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'We offer flexible pricing plans based on your team size and feature requirements. Visit our products page for detailed pricing information.'
    },
    {
      question: 'Do you provide training and onboarding?',
      answer: 'Absolutely! We offer comprehensive training programs and onboarding assistance to ensure your team gets the most out of our platform.'
    }
  ];

  return (
    <div className={styles.contactPage}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            We'd love to hear from you. Whether you have questions about our products, need support, or want to discuss custom solutions.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className={styles.contactInfoSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <div className={styles.infoGrid}>
            {contactInfo.map((info, index) => (
              <div key={index} className={styles.infoCard}>
                <div className={styles.infoImage}>
                  <Image
                    src={info.image}
                    alt={info.title}
                    width={400}
                    height={200}
                    className={styles.image}
                  />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoIcon}>{info.icon}</div>
                  <h3 className={styles.infoTitle}>{info.title}</h3>
                  <div className={styles.infoContentText}>
                    {info.content.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className={styles.infoLine}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className={styles.contactFormSection}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Send us a Message</h2>
              <p className={styles.formSubtitle}>
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                    placeholder="John Doe"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.formLabel}>Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Your Company Name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={styles.formSelect}
                  >
                    <option value="">Select a subject</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="custom">Custom Solution</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={styles.formTextarea}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              {submitMessage && (
                <div className={styles.submitMessage}>
                  {submitMessage}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className={styles.faqCta}>
            <p className={styles.faqCtaText}>Have more questions?</p>
            <Link href="/products" className={styles.faqCtaButton}>
              View All FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Find Us</h2>
          <div className={styles.mapContainer}>
            <Image
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=400&fit=crop"
              alt="Office Location"
              width={1200}
              height={400}
              className={styles.mapImage}
            />
            <div className={styles.mapOverlay}>
              <div className={styles.overlayContent}>
                <h3 className={styles.overlayTitle}>Our Headquarters</h3>
                <p className={styles.overlayText}>
                  123 Business Street<br />
                  Suite 100<br />
                  New York, NY 10001
                </p>
                <button className={styles.directionsButton}>
                  Get Directions
                </button>
              </div>
            </div>
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
            <Link href="/products" className={styles.secondaryButton}>
              View Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}