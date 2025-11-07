'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FaRocket, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSearch, FaGithub } from 'react-icons/fa';
import styles from './login.module.scss';

export default function Login() {
  const { login, justSignedUp, setJustSignedUp, user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Show success message if user just signed up
  useEffect(() => {
    if (justSignedUp) {
      setSuccessMessage('Account created successfully! Please log in to continue.');
      setJustSignedUp(false);
    }
  }, [justSignedUp, setJustSignedUp]);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

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
    setSuccessMessage('');
    setIsSubmitting(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className={styles.loginPage}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop"
          alt="Background"
          width={1920}
          height={1080}
          className={styles.bgImage}
        />
        <div className={styles.overlay}></div>
      </div>

      {/* Login Container */}
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          {/* Logo/Brand */}
          <div className={styles.brandSection}>
            <div className={styles.logo}><FaRocket /></div>
            <h1 className={styles.brandTitle}>Welcome Back</h1>
            <p className={styles.brandSubtitle}>Sign in to your account to continue</p>
          </div>

          {/* Messages */}
          {successMessage && (
            <div className={styles.successMessage}>
              {successMessage}
            </div>
          )}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
              <div className={styles.inputContainer}>
                <span className={styles.inputIcon}><FaEnvelope /></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <div className={styles.inputContainer}>
                <span className={styles.inputIcon}><FaLock /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className={styles.formOptions}>
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                <span className={styles.rememberMeText}>Remember me</span>
              </label>
              <Link href="/forgot-password" className={styles.forgotPassword}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>or continue with</span>
          </div>

          {/* Social Login */}
          <div className={styles.socialLogin}>
            <button
              type="button"
              onClick={() => socialLogin('google')}
              className={`${styles.socialButton} ${styles.googleButton}`}
            >
              <span className={styles.socialIcon}><FaSearch /></span>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => socialLogin('github')}
              className={`${styles.socialButton} ${styles.githubButton}`}
            >
              <span className={styles.socialIcon}><FaGithub /></span>
              Continue with GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <div className={styles.signupLink}>
            <span className={styles.signupText}>Don't have an account?</span>
            <Link href="/signup" className={styles.signupButton}>
              Sign up
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className={styles.additionalInfo}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Why Choose Us?</h3>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>✅ Secure and reliable platform</li>
              <li className={styles.infoItem}>✅ 24/7 customer support</li>
              <li className={styles.infoItem}>✅ Easy integration with your tools</li>
              <li className={styles.infoItem}>✅ Scalable for any business size</li>
            </ul>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "This platform has transformed our business operations. The ease of use and powerful features make it an essential tool for our team."
              </p>
              <div className={styles.testimonialAuthor}>
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face"
                  alt="Sarah Johnson"
                  width={50}
                  height={50}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Sarah Johnson</div>
                  <div className={styles.authorTitle}>CEO, Tech Innovations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}