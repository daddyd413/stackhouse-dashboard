import React, { useState } from 'react';

const StackhouseDashboard = () => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px 0' }}>
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
        borderRadius: '8px',
        padding: '40px',
        minHeight: 'calc(100vh - 40px)'
      }}>
        <h1>Test Dashboard</h1>
        <p>Basic structure test</p>
      </div>

      {showAddProjectModal && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-slate-200">
            <h3>Test Modal</h3>
            <button onClick={() => setShowAddProjectModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StackhouseDashboard;