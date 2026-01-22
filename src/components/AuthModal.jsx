import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../redux/slices/authSlice'
import { FiX, FiMail, FiLock, FiUser } from 'react-icons/fi'
import './AuthModal.css'

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.auth)
  const [isLogin, setIsLogin] = useState(initialMode === 'login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [formError, setFormError] = useState('')

  // Reset to initial mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login')
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
      setFormError('')
    }
  }, [isOpen, initialMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setFormError('Please fill all fields')
        return
      }

      const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password,
      }))

      if (result.payload?.success) {
        onClose()
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setFormError('Please fill all fields')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match')
        return
      }

      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters')
        return
      }

      const result = await dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }))

      if (result.payload?.success) {
        // Automatically switch to login form after successful registration
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
        setIsLogin(true)
        setFormError('')
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-close-btn" onClick={onClose}>
          <FiX size={24} />
        </button>

        {/* Header */}
        <div className="auth-header">
          <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
          <p>{isLogin ? 'Welcome back to Baroque' : 'Join Baroque Fashion'}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Error Message */}
          {(formError || error) && (
            <div className="auth-error">
              {formError || error}
            </div>
          )}

          {/* Name Field (Register Only) */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" size={18} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Confirm Password (Register Only) */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" size={18} />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        {/* Toggle Auth Type */}
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                setIsLogin(!isLogin)
                setFormError('')
                setFormData({ name: '', email: '', password: '', confirmPassword: '' })
              }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Divider */}
        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Guest Login */}
        <button
          type="button"
          className="auth-guest-btn"
          onClick={onClose}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  )
}

export default AuthModal
