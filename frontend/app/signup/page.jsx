'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './signup.module.scss';

export default function SignUp() {
  const { signup } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await signup({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        password: formData.password,
        subscribe_newsletter: formData.subscribeNewsletter,
      });

      if (!result.success) {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialSignUp = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Implement social signup logic here
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 'Free',
      features: ['Up to 3 users', '1GB storage', 'Basic support', 'Core features'],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '$29/month',
      features: ['Up to 10 users', '10GB storage', 'Priority support', 'Advanced features', 'API access'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited users', 'Unlimited storage', '24/7 support', 'Custom features', 'Dedicated account manager'],
      popular: false
    }
  ];

  return (
    <div className={styles.signupPage}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <Image
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop"
          alt="Background"
          width={1920}
          height={1080}
          className={styles.bgImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.signupContainer}>
        <div className={styles.signupCard}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.logo}>🚀</div>
            <h1 className={styles.title}>Create Your Account</h1>
            <p className={styles.subtitle}>Start your journey with us today</p>
          </div>

          {/* Progress Steps */}
          <div className={styles.progressSteps}>
            <div className={`${styles.step} ${styles.active}`}>
              <div className={styles.stepNumber}>1</div>
              <span className={styles.stepText}>Account</span>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <span className={styles.stepText}>Verification</span>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <span className={styles.stepText}>Complete</span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className={styles.signupForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.formLabel}>First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                  placeholder="John"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.formLabel}>Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                  placeholder="Doe"
                />
              </div>
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
                  placeholder="Your Company (optional)"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>Password *</label>
                <div className={styles.passwordContainer}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password *</label>
                <div className={styles.passwordContainer}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            </div>

            {/* Plan Selection */}
            <div className={styles.planSection}>
              <h3 className={styles.planTitle}>Choose Your Plan</h3>
              <div className={styles.planGrid}>
                {plans.map((plan) => (
                  <div key={plan.id} className={`${styles.planCard} ${plan.popular ? styles.popular : ''}`}>
                    {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}
                    <div className={styles.planHeader}>
                      <h4 className={styles.planName}>{plan.name}</h4>
                      <div className={styles.planPrice}>{plan.price}</div>
                    </div>
                    <ul className={styles.planFeatures}>
                      {plan.features.map((feature, index) => (
                        <li key={index} className={styles.planFeature}>✓ {feature}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className={`${styles.planSelectButton} ${plan.popular ? styles.popularButton : ''}`}
                    >
                      {plan.price === 'Free' ? 'Start Free' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  I agree to the <Link href="/terms" className={styles.link}>Terms of Service</Link> and <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
                </span>
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  Subscribe to our newsletter for updates and tips
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Social Sign Up */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>or sign up with</span>
          </div>

          <div className={styles.socialSignup}>
            <button
              type="button"
              onClick={() => socialSignUp('google')}
              className={`${styles.socialButton} ${styles.googleButton}`}
            >
              <span className={styles.socialIcon}>🔍</span>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => socialSignUp('github')}
              className={`${styles.socialButton} ${styles.githubButton}`}
            >
              <span className={styles.socialIcon}>🐙</span>
              Continue with GitHub
            </button>
          </div>

          {/* Login Link */}
          <div className={styles.loginLink}>
            <span className={styles.loginText}>Already have an account?</span>
            <Link href="/login" className={styles.loginButton}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}