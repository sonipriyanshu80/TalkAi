import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EmptyState } from '../../components/EmptyState';
import { Card, Button, Input, Modal } from '../../components';
import { toast } from '../../components/Toast';
import { aiAPI } from '../../services/api';

const PhoneNumbers = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [formData, setFormData] = useState({
    accountSid: '',
    authToken: ''
  });

  useEffect(() => {
    fetchPhoneNumbers();
  }, []);

  const fetchPhoneNumbers = async () => {
    try {
      const response = await aiAPI.getPhoneNumbers();
      setPhoneNumbers(response.data.phoneNumbers);
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImportTwilio = async () => {
    if (!formData.accountSid || !formData.authToken) {
      toast.error('Please enter both Account SID and Auth Token');
      return;
    }

    setImporting(true);
    try {
      const response = await aiAPI.importTwilio(formData.accountSid, formData.authToken);
      toast.success(`${response.data.count} phone number(s) imported successfully`);
      setShowImportModal(false);
      setFormData({ accountSid: '', authToken: '' });
      fetchPhoneNumbers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to import');
    } finally {
      setImporting(false);
    }
  };

  const handleActivate = async (id) => {
    try {
      await aiAPI.activatePhoneNumber(id);
      toast.success('Phone number activated');
      fetchPhoneNumbers();
    } catch (error) {
      toast.error('Failed to activate phone number');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await aiAPI.deactivatePhoneNumber(id);
      toast.success('Using TalkAi default number for calls');
      fetchPhoneNumbers();
    } catch (error) {
      toast.error('Failed to update phone number');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this phone number?')) return;
    
    try {
      await aiAPI.deletePhoneNumber(id);
      toast.success('Phone number deleted');
      fetchPhoneNumbers();
    } catch (error) {
      toast.error('Failed to delete phone number');
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: 'clamp(16px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: '600' }}>
          Phone Numbers
        </h1>
        <p style={{ color: '#999', fontSize: '16px' }}>
          Manage your phone numbers and attached bots
        </p>
      </div>

      {/* Get Phone Number Section */}
      <Card style={{ padding: 'clamp(20px, 4vw, 40px)', marginBottom: '30px' }}>
        <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', marginBottom: '16px' }}>
          Get Your Phone Number
        </h2>
        <p style={{ color: '#999', marginBottom: '20px', lineHeight: '1.6', fontSize: 'clamp(14px, 2vw, 16px)' }}>
          Import your Twilio phone numbers to use for AI calls.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button onClick={() => setShowImportModal(true)}>
            Import from Twilio
          </Button>
          <Button variant="secondary" onClick={() => toast.info('Exotel integration coming soon!')}>
            Import from Exotel
          </Button>
        </div>
      </Card>

      {/* Phone Numbers List */}
      <Card style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
        <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', marginBottom: '30px' }}>
          Your Phone Numbers
        </h2>
        
        {loading ? (
          <p style={{ color: '#999', textAlign: 'center' }}>Loading...</p>
        ) : phoneNumbers.length === 0 ? (
          <EmptyState
            icon={faPhone}
            title="No phone numbers yet"
            description="Import your first phone number from Twilio to enable voice capabilities and start making AI-powered calls."
            actionText="Import from Twilio"
            onAction={() => setShowImportModal(true)}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {phoneNumbers.map((phone) => (
              <div
                key={phone._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'clamp(15px, 3vw, 20px)',
                  border: phone.isActive ? '2px solid #667eea' : '1px solid #333',
                  borderRadius: '8px',
                  backgroundColor: phone.isActive ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1', minWidth: '200px' }}>
                  <input
                    type="checkbox"
                    checked={phone.isActive}
                    onChange={() => phone.isActive ? handleDeactivate(phone._id) : handleActivate(phone._id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', flexShrink: 0 }}
                  />
                  <div style={{ flex: '1', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <FontAwesomeIcon icon={faPhone} style={{ color: '#667eea', fontSize: '14px' }} />
                      <span style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: '500', wordBreak: 'break-all' }}>
                        {phone.phoneNumber}
                      </span>
                      {phone.isActive && (
                        <span style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          backgroundColor: '#667eea',
                          borderRadius: '4px',
                          color: '#fff'
                        }}>
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleDelete(phone._id)}
                  style={{ padding: '8px 16px', color: '#ef4444', flexShrink: 0 }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
      </div>

      {/* Import Twilio Modal */}
      {showImportModal && (
        <Modal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          title="Import Twilio Account"
        >
          <form onSubmit={(e) => { e.preventDefault(); handleImportTwilio(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ color: '#999', fontSize: '14px' }}>
              Enter your Twilio credentials to import your phone numbers. You can find these in your Twilio Console.
            </p>
            
            <Input
              label="Account SID"
              placeholder="Enter your Twilio Account SID (starts with AC)"
              value={formData.accountSid}
              onChange={(e) => setFormData({ ...formData, accountSid: e.target.value })}
              autoComplete="username"
            />
            
            <Input
              label="Auth Token"
              type="password"
              placeholder="Enter your Twilio Auth Token (32 characters)"
              value={formData.authToken}
              onChange={(e) => setFormData({ ...formData, authToken: e.target.value })}
              autoComplete="current-password"
            />

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowImportModal(false)}
                disabled={importing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={importing}
              >
                {importing ? 'Importing...' : 'Import'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default PhoneNumbers;
