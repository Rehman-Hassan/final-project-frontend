import styles from '../styles/Subscribe.module.css';
import { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setShowMessage(true);
      setEmail('');
      setTimeout(() => setShowMessage(false), 4000);
    }
  };

  return (
    <div className="container">
      
      {/* Heading */}
      <div className="row">
        <div className="col text-center mt-5">
          <h1>NEWSLETTER</h1>
        </div>
      </div>

      {/* Subheading */}
      <div className="row">
        <div className="col text-center mt-2">
          <p>
            Sign up to get notified and get <b>5% OFF</b> when you subscribe to our newsletter.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showMessage && (
        <div className="row">
          <div className="col text-center mt-2">
            <div style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #c3e6cb'
            }}>
              You will be notified about new items.
            </div>
          </div>
        </div>
      )}

      {/* Input + Button */}
      <div className="row">
        <div className="col text-center mt-2">
          <form onSubmit={handleSubscribe} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                height: '35px', 
                width: '300px', 
                marginRight: '15px',
                padding: '8px 12px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              required
            />
            <button 
              type="submit"
              className={styles.btnSubscribe}
            >
              S U B S C R I B E
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Subscribe;
