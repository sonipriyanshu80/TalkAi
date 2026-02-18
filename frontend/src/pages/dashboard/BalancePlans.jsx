import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Modal, Button, Input } from '../../components';
import { toast } from '../../components/Toast';
import { aiAPI } from '../../services/api';

const BalancePlans = () => {
  const [balance, setBalance] = useState(null);
  const [plans, setPlans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Check cache first
      const cachedBalance = localStorage.getItem('balance');
      const cachedPlans = localStorage.getItem('plans');
      const cachedTime = localStorage.getItem('balanceCacheTime');
      
      const cacheValid = cachedTime && (Date.now() - parseInt(cachedTime)) < 60000; // 1 min cache
      
      if (cacheValid && cachedBalance && cachedPlans) {
        setBalance(JSON.parse(cachedBalance));
        setPlans(JSON.parse(cachedPlans));
        setLoading(false);
      }
      
      const [balanceRes, plansRes, transactionsRes] = await Promise.all([
        aiAPI.getBalance(),
        aiAPI.getPlans(),
        aiAPI.getTransactions(1, 10)
      ]);
      
      setBalance(balanceRes.data);
      setPlans(plansRes.data.plans);
      setTransactions(transactionsRes.data.transactions);
      
      // Cache data
      localStorage.setItem('balance', JSON.stringify(balanceRes.data));
      localStorage.setItem('plans', JSON.stringify(plansRes.data.plans));
      localStorage.setItem('balanceCacheTime', Date.now().toString());
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load balance data');
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = async () => {
    const amount = parseInt(topupAmount);
    
    if (!amount || amount < 100) {
      toast.error('Minimum topup amount is ₹100');
      return;
    }

    setProcessing(true);
    try {
      const orderRes = await aiAPI.createOrder(amount, 'topup');
      const { orderId, keyId } = orderRes.data;

      const options = {
        key: keyId,
        amount: amount * 100,
        currency: 'INR',
        name: 'TalkAi',
        description: 'Add Credits',
        order_id: orderId,
        handler: async function(response) {
          try {
            await aiAPI.verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            toast.success('Payment successful! Balance updated.');
            setShowTopupModal(false);
            setTopupAmount('');
            fetchData();
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          email: localStorage.getItem('userEmail') || ''
        },
        theme: { color: '#667eea' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Failed to create payment order');
    } finally {
      setProcessing(false);
    }
  };

  const handleUpgrade = async (plan) => {
    if (processing) return;
    
    console.log('handleUpgrade called for:', plan.planName);
    setProcessing(true);
    try {
      const orderRes = await aiAPI.createOrder(plan.monthlyPrice, 'subscription', plan._id);
      const { orderId, keyId } = orderRes.data;

      const options = {
        key: keyId,
        amount: plan.monthlyPrice * 100,
        currency: 'INR',
        name: 'TalkAi',
        description: `${plan.planName} Plan`,
        order_id: orderId,
        handler: async function(response) {
          try {
            await aiAPI.verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              plan._id
            );
            toast.success(`Upgraded to ${plan.planName} plan!`);
            fetchData();
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          email: localStorage.getItem('userEmail') || ''
        },
        theme: { color: '#667eea' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Failed to create payment order');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ padding: 'clamp(16px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 32px)', marginBottom: '8px', fontWeight: '600' }}>
          Balance & Plans
        </h1>
        <p style={{ color: '#999', fontSize: 'clamp(14px, 2vw, 16px)' }}>
          View your balance and choose right plan
        </p>
      </div>

      {/* Current Balance */}
      <div className="glass" style={{ padding: 'clamp(20px, 4vw, 40px)', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 'clamp(20px, 4vw, 30px)' }}>
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Current Balance</h3>
            <div style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '600', color: balance?.balance < 50 ? '#ef4444' : '#10b981', marginBottom: '10px' }}>
              ₹{balance?.balance?.toFixed(2) || '0.00'}
            </div>
            <div style={{ fontSize: '14px', color: '#999' }}>
              <p>Minutes used: {balance?.minutesUsed?.toFixed(2) || 0}</p>
              <p>KB used: {balance?.kbUsedMB || 0} MB</p>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Active Plan</h3>
            <div style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '600', color: '#667eea', marginBottom: '10px' }}>
              {balance?.currentPlan?.planName || 'Free Trial'}
            </div>
            <button 
              className="btn btn-primary" 
              style={{ marginTop: '10px' }}
              onClick={() => setShowTopupModal(true)}
            >
              Top Up Credits
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="glass" style={{ padding: 'clamp(20px, 4vw, 40px)', marginBottom: '30px' }}>
        <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', marginBottom: '10px' }}>Pricing Plans</h2>
        <p style={{ color: '#999', fontSize: '14px', marginBottom: '30px' }}>Choose the plan that fits your needs</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(15px, 3vw, 20px)' }}>
          {plans.map((plan) => {
            const isCurrentPlan = balance?.currentPlan?._id === plan._id;
            return (
            <div 
              key={plan._id} 
              className="glass" 
              style={{ 
                padding: '30px', 
                textAlign: 'center',
                border: isCurrentPlan ? '2px solid #10b981' : (plan.planName === 'Jump Starter' ? '2px solid #667eea' : undefined)
              }}
            >
              {isCurrentPlan && (
                <div style={{ 
                  background: '#10b981', 
                  color: '#fff', 
                  padding: '4px 12px', 
                  borderRadius: '4px', 
                  fontSize: '12px', 
                  fontWeight: '600',
                  marginBottom: '10px',
                  display: 'inline-block'
                }}>
                  Current Plan
                </div>
              )}
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{plan.planName}</h3>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '5px' }}>
                ₹{plan.monthlyPrice}
              </div>
              <p style={{ color: '#999', fontSize: '14px', marginBottom: '20px' }}>per month</p>
              
              <div style={{ marginBottom: '20px', fontSize: '14px', textAlign: 'left' }}>
                <p style={{ marginBottom: '8px' }}>
                  <strong>With TalkAi Number:</strong><br/>
                  ~{Math.floor(plan.credits / plan.ratePerMinTalkAi)} mins (₹{plan.ratePerMinTalkAi}/min)
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong>With Your Number:</strong><br/>
                  ~{Math.floor(plan.credits / plan.ratePerMinOwn)} mins (₹{plan.ratePerMinOwn}/min)
                </p>
                <p style={{ color: '#999', fontSize: '12px' }}>KB Storage: {plan.kbStorageMB} MB</p>
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (plan.planName === 'Enterprise') {
                    toast.info('Contact us at support@talkai.com for Enterprise pricing');
                  } else {
                    handleUpgrade(plan);
                  }
                }}
                disabled={processing || isCurrentPlan}
              >
                {isCurrentPlan ? 'Active' : (plan.planName === 'Enterprise' ? 'Contact Us' : (processing ? 'Processing...' : 'Upgrade'))}
              </button>
            </div>
          )})}
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass" style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
        <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', marginBottom: '20px' }}>Recent Transactions</h2>
        
        {transactions.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>No transactions yet</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#999' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#999' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#999' }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', color: '#999' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', color: '#999' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id} style={{ borderBottom: '1px solid #222' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        backgroundColor: txn.type === 'call_deduction' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: txn.type === 'call_deduction' ? '#ef4444' : '#10b981'
                      }}>
                        {txn.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#999' }}>
                      {txn.description}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      fontSize: '14px', 
                      textAlign: 'right',
                      color: txn.amount < 0 ? '#ef4444' : '#10b981'
                    }}>
                      {txn.amount < 0 ? '-' : '+'}₹{Math.abs(txn.amount).toFixed(2)}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right' }}>
                      ₹{txn.balanceAfter.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>

      {/* Topup Modal */}
      {showTopupModal && (
        <Modal
          isOpen={showTopupModal}
          onClose={() => setShowTopupModal(false)}
          title="Top Up Credits"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ color: '#999', fontSize: '14px' }}>
              Add credits to your account. Minimum amount: ₹100
            </p>
            
            <Input
              label="Amount (₹)"
              type="number"
              placeholder="Enter amount"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
              min="100"
            />

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                onClick={() => setShowTopupModal(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleTopup}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default BalancePlans;
