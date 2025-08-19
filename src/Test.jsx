import React from 'react';

const Test = () => {
  return (
    <div style={{ 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '20px', 
      fontSize: '24px',
      textAlign: 'center' 
    }}>
      🚨 TEST PAGE - IF YOU SEE THIS, THE CONNECTION WORKS! 🚨
      <br />
      <div style={{ marginTop: '20px', fontSize: '16px' }}>
        This is a simple test to verify your browser can load React changes.
      </div>
    </div>
  );
};

export default Test;