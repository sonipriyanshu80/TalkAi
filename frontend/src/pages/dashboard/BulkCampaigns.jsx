import DashboardLayout from '../../layouts/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

const BulkCampaigns = () => {
  return (
    <DashboardLayout>
      <div style={{ padding: 'clamp(16px, 4vw, 40px)' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: '600' }}>
            Bulk Call Campaigns
          </h1>
          <p style={{ color: '#999', fontSize: '16px' }}>
            Manage and monitor your bulk call campaigns.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="glass" style={{ padding: '60px 40px', textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(102, 126, 234, 0.1)',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <FontAwesomeIcon icon={faBullhorn} style={{ fontSize: '32px', color: '#667eea' }} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>Coming Soon</h2>
          <p style={{ color: '#999', fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
            Bulk Call Campaigns is currently under development. This feature will allow you to reach hundreds of customers automatically with AI-powered conversations.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BulkCampaigns;