import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { aiAPI } from '../../services/api';
import { toast } from '../../components/Toast';
import { validateField } from '../../utils/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const { user, refreshUser } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [profileData, setProfileData] = useState({
    name: '',
    companyName: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // Initialize profile data when user loads
  useState(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        companyName: user.companyName || ''
      });
    }
  }, [user]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const response = await aiAPI.updateProfile(profileData.name, profileData.companyName);
      await refreshUser();
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {
      currentPassword: validateField('currentPassword', passwordData.currentPassword),
      newPassword: validateField('newPassword', passwordData.newPassword),
      confirmPassword: validateField('confirmPassword', passwordData.confirmPassword)
    };

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = 'New password must be different from current password';
    }

    setPasswordErrors(errors);

    if (Object.values(errors).some(err => err)) {
      toast.error('Please fix the errors');
      return;
    }

    setLoading(true);
    try {
      await aiAPI.changePassword(passwordData.currentPassword, passwordData.newPassword);
      toast.success('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: 'clamp(16px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: '600' }}>
          Settings
        </h1>
        <p style={{ color: '#999', fontSize: '16px' }}>
          Manage your account settings and preferences
        </p>
      </div>

      {/* Account Settings */}
      <div className="glass" style={{ padding: '40px', marginBottom: '30px', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Account</h2>
        <p style={{ color: '#999', marginBottom: '30px', fontSize: '14px' }}>
          Manage your account information
        </p>
        
        <div style={{ display: 'grid', gap: '20px', maxWidth: '400px', margin: '0 auto' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="input"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={profileData.companyName}
              onChange={handleProfileChange}
              className="input"
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ''}
              className="input"
              disabled
              style={{ background: 'rgba(255,255,255,0.02)', width: '100%' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-primary" 
              style={{ width: 'fit-content' }}
              onClick={handleProfileSubmit}
              disabled={profileLoading}
            >
              {profileLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button className="btn btn-secondary" style={{ width: 'fit-content' }} onClick={() => setShowPasswordModal(true)}>
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass" style={{
            padding: '30px',
            maxWidth: '400px',
            width: '90%',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowPasswordModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                color: '#999',
                cursor: 'pointer',
                fontSize: '20px'
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Change Password</h2>
            
            <form onSubmit={handlePasswordSubmit}>
              {/* Hidden username field for accessibility */}
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={user?.email || ''}
                readOnly
                style={{ display: 'none' }}
                aria-hidden="true"
              />
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  Current Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.currentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="input"
                    autoComplete="current-password"
                    style={{ 
                      width: '100%',
                      paddingRight: '40px',
                      borderColor: passwordErrors.currentPassword ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, currentPassword: !prev.currentPassword }))}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer'
                    }}
                  >
                    <FontAwesomeIcon icon={showPasswords.currentPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
                    {passwordErrors.currentPassword}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="input"
                    autoComplete="new-password"
                    style={{ 
                      width: '100%',
                      paddingRight: '40px',
                      borderColor: passwordErrors.newPassword ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, newPassword: !prev.newPassword }))}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer'
                    }}
                  >
                    <FontAwesomeIcon icon={showPasswords.newPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
                    {passwordErrors.newPassword}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="input"
                    autoComplete="new-password"
                    style={{ 
                      width: '100%',
                      paddingRight: '40px',
                      borderColor: passwordErrors.confirmPassword ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer'
                    }}
                  >
                    <FontAwesomeIcon icon={showPasswords.confirmPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
                    {passwordErrors.confirmPassword}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
