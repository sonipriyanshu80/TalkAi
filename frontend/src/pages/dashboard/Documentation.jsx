import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Documentation = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn how to install and set up the TalkAi SDK',
      content: (
        <div style={{ color: '#ccc', lineHeight: '1.8' }}>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Installation</h4>
          <p style={{ marginBottom: '15px' }}>Install the TalkAi SDK using npm:</p>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            marginBottom: '20px'
          }}>
            <code>npm install @talkai/sdk</code>
          </pre>

          <h4 style={{ color: '#fff', marginBottom: '15px', marginTop: '25px' }}>Authentication</h4>
          <p style={{ marginBottom: '15px' }}>Initialize the client with your API key:</p>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            marginBottom: '20px'
          }}>
            <code>{`import { TalkAiClient } from '@talkai/sdk';

const client = new TalkAiClient({
  apiKey: 'your-api-key-here'
});`}</code>
          </pre>

          <h4 style={{ color: '#fff', marginBottom: '15px', marginTop: '25px' }}>Quick Start</h4>
          <p style={{ marginBottom: '15px' }}>Create your first AI agent:</p>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            <code>{`const agent = await client.agents.create({
  name: 'Customer Support Agent',
  voice: 'en-US-Neural',
  prompt: 'You are a helpful customer support agent.'
});`}</code>
          </pre>
        </div>
      )
    },
    {
      id: 'client',
      title: 'Client',
      description: 'Initialize and configure the TalkAi client',
      content: (
        <div style={{ color: '#ccc', lineHeight: '1.8' }}>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Client Configuration</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            marginBottom: '20px'
          }}>
            <code>{`const client = new TalkAiClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.talkai.com',
  timeout: 30000
});`}</code>
          </pre>

          <h4 style={{ color: '#fff', marginBottom: '15px', marginTop: '25px' }}>Available Methods</h4>
          <ul style={{ marginLeft: '20px' }}>
            <li>client.agents - Manage AI agents</li>
            <li>client.calls - Handle call operations</li>
            <li>client.knowledge - Manage knowledge base</li>
            <li>client.phoneNumbers - Manage phone numbers</li>
          </ul>
        </div>
      )
    },
    {
      id: 'agent',
      title: 'Agent',
      description: 'Create, manage, and customize AI agents',
      content: (
        <div style={{ color: '#ccc', lineHeight: '1.8' }}>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Create Agent</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            marginBottom: '20px'
          }}>
            <code>{`const agent = await client.agents.create({
  name: 'Sales Agent',
  voice: 'en-US-Neural',
  prompt: 'You are a sales representative.',
  language: 'en-US'
});`}</code>
          </pre>

          <h4 style={{ color: '#fff', marginBottom: '15px', marginTop: '25px' }}>Update Agent</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            <code>{`await client.agents.update(agentId, {
  prompt: 'Updated prompt'
});`}</code>
          </pre>
        </div>
      )
    },
    {
      id: 'call',
      title: 'Call',
      description: 'Manage call logs and dispatch calls',
      content: (
        <div style={{ color: '#ccc', lineHeight: '1.8' }}>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Dispatch Call</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            marginBottom: '20px'
          }}>
            <code>{`const call = await client.calls.dispatch({
  agentId: 'agent-id',
  phoneNumber: '+1234567890',
  message: 'Hello, this is a test call.'
});`}</code>
          </pre>

          <h4 style={{ color: '#fff', marginBottom: '15px', marginTop: '25px' }}>Get Call Logs</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            <code>{`const logs = await client.calls.getLogs({
  page: 1,
  limit: 25
});`}</code>
          </pre>
        </div>
      )
    },
    {
      id: 'knowledge',
      title: 'Knowledge Base',
      description: 'Manage files and knowledge for your agents',
      content: (
        <div style={{ color: '#ccc', lineHeight: '1.8' }}>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Upload File</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            marginBottom: '20px'
          }}>
            <code>{`const file = await client.knowledge.upload({
  file: pdfFile,
  title: 'Product Manual'
});`}</code>
          </pre>

          <h4 style={{ color: '#fff', marginBottom: '15px', marginTop: '25px' }}>List Files</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            <code>{`const files = await client.knowledge.list();`}</code>
          </pre>
        </div>
      )
    },
    {
      id: 'phone',
      title: 'Phone Number',
      description: 'Manage phone numbers for your agents',
      content: (
        <div style={{ color: '#ccc', lineHeight: '1.8' }}>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Get Available Numbers</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            marginBottom: '20px'
          }}>
            <code>{`const numbers = await client.phoneNumbers.getAvailable({
  areaCode: '415'
});`}</code>
          </pre>

          <h4 style={{ color: '#fff', marginBottom: '15px', marginTop: '25px' }}>Purchase Number</h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            <code>{`const number = await client.phoneNumbers.purchase({
  phoneNumber: '+14155551234'
});`}</code>
          </pre>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div style={{ padding: 'clamp(20px, 4vw, 40px)', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(30px, 6vw, 40px)', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)', marginBottom: '16px', fontWeight: '700' }}>
            TalkAi Documentation
          </h1>
          <p style={{ color: '#999', fontSize: 'clamp(14px, 3vw, 18px)' }}>
            Developer Documentation & SDK
          </p>
        </div>

        {/* SDK Section */}
        <div className="glass" style={{ padding: 'clamp(30px, 5vw, 50px)', marginBottom: 'clamp(30px, 5vw, 40px)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', marginBottom: '16px' }}>TalkAi SDK</h2>
          <p style={{ color: '#999', fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '30px' }}>
            Build powerful AI voice agents with our easy-to-use SDK
          </p>
          
          <div style={{ display: 'flex', gap: 'clamp(10px, 3vw, 20px)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: 'clamp(12px, 3vw, 16px) clamp(20px, 4vw, 32px)', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>
              Get Started
            </button>
            <button className="btn btn-secondary" style={{ padding: 'clamp(12px, 3vw, 16px) clamp(20px, 4vw, 32px)', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>
              View SDK on GitHub
            </button>
          </div>
        </div>

        {/* Documentation Sections */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(15px, 3vw, 20px)'
        }}>
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="glass" 
              style={{ 
                padding: 'clamp(20px, 4vw, 30px)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => toggleSection(section.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 'clamp(18px, 4vw, 20px)', marginBottom: 'clamp(8px, 2vw, 10px)' }}>{section.title}</h3>
                  <p style={{ color: '#999', fontSize: 'clamp(13px, 2.5vw, 14px)', lineHeight: '1.5', margin: 0 }}>
                    {section.description}
                  </p>
                </div>
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  style={{ 
                    color: '#667eea', 
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    transition: 'transform 0.3s ease',
                    transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {expandedSection && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: 'clamp(15px, 3vw, 20px)',
              animation: 'fadeIn 0.3s ease'
            }}
            onClick={() => setExpandedSection(null)}
          >
            <div 
              className="glass"
              style={{
                maxWidth: '900px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
                padding: 'clamp(25px, 5vw, 40px)',
                position: 'relative',
                animation: 'slideUp 0.3s ease'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedSection(null)}
                style={{
                  position: 'absolute',
                  top: 'clamp(15px, 3vw, 20px)',
                  right: 'clamp(15px, 3vw, 20px)',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: 'clamp(35px, 7vw, 40px)',
                  height: 'clamp(35px, 7vw, 40px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 'clamp(18px, 4vw, 20px)',
                  color: '#fff'
                }}
              >
                ×
              </button>
              
              <h3 style={{ fontSize: 'clamp(24px, 5vw, 32px)', marginBottom: '16px', paddingRight: '40px' }}>
                {sections.find(s => s.id === expandedSection)?.title}
              </h3>
              <p style={{ color: '#999', marginBottom: '30px', fontSize: 'clamp(14px, 3vw, 16px)' }}>
                {sections.find(s => s.id === expandedSection)?.description}
              </p>
              
              {sections.find(s => s.id === expandedSection)?.content}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="glass" style={{ padding: 'clamp(30px, 5vw, 50px)', marginTop: 'clamp(30px, 5vw, 40px)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', marginBottom: '16px' }}>Ready to build your AI voice agent?</h2>
          <p style={{ color: '#999', fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '30px' }}>
            Get started with TalkAi SDK today and create powerful AI voice experiences for your users.
          </p>
          <button className="btn btn-primary" style={{ padding: 'clamp(12px, 3vw, 16px) clamp(20px, 4vw, 32px)', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>
            Start Building
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documentation;