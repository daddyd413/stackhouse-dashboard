import React, { useState, useEffect } from 'react';

const StackhouseDashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedProject, setSelectedProject] = useState('1300 Old Oxford');
  
  // Set current date
  useEffect(() => {
    const today = new Date();
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);

  // Sample data based on your HTML reference
  const budgetData = [
    {
      lineItem: 'Total Budget',
      budget: '$9,415k',
      budgetPerSF: '$75.62',
      toDate: '$3,132k', 
      projection: '$9,264k',
      projectionPerSF: '$74.21/SF'
    }
  ];

  const planningItems = [
    { id: 'i', text: 'Trades: Elect 25200676, temp permit 25205924 plumbing, Mechanical, others?', status: '' },
    { id: 'ii', text: 'Larry MDP Panels: should be ready LW to call Ryan. Mario insulates and panel in elect room', status: '' },
    { id: 'iii', text: 'Duke: get primaries and secondaries in now: martin digging trench?', status: 'progress' },
    { id: 'iv', text: 'DUMPSTER -- update plan on 1st comment round of SP/CD update', status: '' }
  ];

  const budgetDesignItems = [
    { id: 'i', text: 'Update to OO road storm design and MUP move -- DOT approved, sub to durham', status: 'complete' }
  ];

  const civilData = [
    { civil: 'Storm outlet', start: '7/18', progress: '', amt: '', note: 'Some redesign needed before backfill' },
    { civil: 'Curb Site', start: '7/30', progress: '8/15', amt: '800', note: '', status: 'progress' },
    { civil: 'Fine grade/ stone', start: '8/11', progress: '8/20', amt: '', note: '', status: 'progress' },
    { civil: 'Binder', start: '8/20', progress: '8/25', amt: '', note: '' },
    { civil: 'S site grade/path', start: '', progress: '', amt: '', note: 'Approve ditch by labor day then finish' }
  ];

  const tradesData = [
    { trade: 'Sprinkler', start: '7/4', floor2: '8/5', floor3: '9/5', roof: '', note: '3rd floor steel 7/23; finish 1st/2nd', status: 'progress' },
    { trade: 'Elect – cond rough', start: '7/4', floor2: '8/5', floor3: '', roof: '', note: 'Ongoing 1st 2nd flrs with conduit & temp lights', status: 'progress' },
    { trade: 'Elect lights/wire', start: '', floor2: '', floor3: '', roof: '', note: 'Start lights when roof is on?' },
    { trade: 'JANUS', start: 'SC:9/26', floor2: 'SC:8/25', floor3: 'SC:9/12', roof: '', note: 'Deliver:1:9/1 2:8/11 3:8/25' }
  ];

  const projectOptions = [
    '1300 Old Oxford',
    '1200 MLK', 
    'NC42',
    '914 Dowling'
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'complete': return 'status-complete';
      case 'progress': return 'status-progress';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const makeEditable = (text, onChange) => {
    const handleClick = (e) => {
      if (!e.target.querySelector('input')) {
        const currentText = e.target.textContent;
        e.target.innerHTML = `<input type="text" value="${currentText}" style="width: 100%; border: none; background: transparent; font-size: inherit; text-align: center;">`;
        const input = e.target.querySelector('input');
        input.focus();
        input.select();
        
        const handleSave = () => {
          const newValue = input.value;
          e.target.textContent = newValue;
          if (onChange) onChange(newValue);
        };
        
        input.addEventListener('blur', handleSave);
        input.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            handleSave();
          }
        });
      }
    };
    
    return { onClick: handleClick, style: { cursor: 'pointer', textAlign: 'center' } };
  };

  const makeEditableBullet = (text, onChange) => {
    const handleClick = (e) => {
      if (!e.target.querySelector('input')) {
        const currentText = e.target.textContent;
        e.target.innerHTML = `<input type="text" value="${currentText}" style="width: 100%; border: none; background: transparent; font-size: inherit; text-align: left;">`;
        const input = e.target.querySelector('input');
        input.focus();
        input.select();
        
        const handleSave = () => {
          const newValue = input.value;
          e.target.textContent = newValue;
          if (onChange) onChange(newValue);
        };
        
        input.addEventListener('blur', handleSave);
        input.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            handleSave();
          }
        });
      }
    };
    
    return { onClick: handleClick, style: { cursor: 'pointer', textAlign: 'left' } };
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '30px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '20px'
    },
    logo: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e40af',
      marginBottom: '8px'
    },
    date: {
      color: '#64748b',
      fontSize: '14px',
      marginBottom: '15px'
    },
    projectTitle: {
      fontSize: '20px',
      fontWeight: '600',
      textDecoration: 'underline',
      color: '#1f2937'
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      flexWrap: 'wrap',
      gap: '10px'
    },
    dropdown: {
      padding: '8px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      background: 'white',
      fontSize: '14px'
    },
    btn: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      fontWeight: '500',
      marginLeft: '8px'
    },
    btnPrimary: {
      background: '#2563eb',
      color: 'white'
    },
    btnSuccess: {
      background: '#16a34a',
      color: 'white'
    },
    section: {
      marginBottom: '25px'
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#1f2937'
    },
    table: {
      width: '100%',
      border: '2px solid #374151',
      borderRadius: '6px',
      borderLeft: '2px solid #e67e22', // Changed from 4px to 2px
      overflow: 'hidden',
      marginBottom: '20px',
      fontSize: '13px'
    },
    th: {
      background: '#f3f4f6',
      padding: '12px 8px',
      textAlign: 'center',
      fontWeight: '600',
      borderBottom: '1px solid #d1d5db'
    },
    td: {
      padding: '8px',
      borderBottom: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      textAlign: 'center'
    },
    bulletList: {
      marginLeft: '20px'
    },
    bulletItem: {
      margin: '6px 0',
      padding: '4px 8px',
      cursor: 'pointer',
      borderRadius: '3px'
    }
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', background: '#f8fafc', padding: '20px', lineHeight: '1.4', minHeight: '100vh' }}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>🏗️ STACKHOUSE DEVELOPMENT</div>
          <div style={styles.date}>{currentDate}</div>
          <div style={styles.projectTitle}>1300 Old Oxford – PCO 12/31/25 CO 2/15/26</div>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <select 
            style={styles.dropdown}
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projectOptions.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
          <div>
            <button style={{...styles.btn, ...styles.btnSuccess}}>+ Add Project</button>
            <button style={{...styles.btn, ...styles.btnPrimary}}>📄 Export PDF</button>
          </div>
        </div>

        {/* Budget Section */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Budget –</div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Line Item</th>
                <th style={styles.th}>Budget</th>
                <th style={styles.th}>$/SF</th>
                <th style={styles.th}>$ to date</th>
                <th style={styles.th}>Projection</th>
                <th style={styles.th}>$/SF</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((row, index) => (
                <tr key={index}>
                  <td style={styles.td} {...makeEditable(row.lineItem)}>{row.lineItem}</td>
                  <td style={styles.td} {...makeEditable(row.budget)}>{row.budget}</td>
                  <td style={styles.td} {...makeEditable(row.budgetPerSF)}>{row.budgetPerSF}</td>
                  <td style={styles.td} {...makeEditable(row.toDate)}>{row.toDate}</td>
                  <td style={styles.td} {...makeEditable(row.projection)}>{row.projection}</td>
                  <td style={styles.td} {...makeEditable(row.projectionPerSF)}>{row.projectionPerSF}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Planning Section */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>1. Planning: BP 3 story 24101980 (25101450 REV) Out #24104730, 31,32,33</div>
          <div style={styles.bulletList}>
            {planningItems.map((item) => (
              <div 
                key={item.id} 
                style={{...styles.bulletItem, display: 'flex', alignItems: 'flex-start'}}
                className={getStatusClass(item.status)}
                onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
                onMouseLeave={(e) => {
                  if (!item.status) e.target.style.background = '';
                }}
              >
                <span style={{marginRight: '8px', fontWeight: 'bold'}}>{item.id}.</span>
                <div {...makeEditableBullet(item.text)}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget, Design & Schedule Section */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>2. Budget, Design & Schedule:</div>
          <div style={styles.bulletList}>
            {budgetDesignItems.map((item) => (
              <div 
                key={item.id} 
                style={{...styles.bulletItem, display: 'flex', alignItems: 'flex-start'}}
                className={getStatusClass(item.status)}
                onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
                onMouseLeave={(e) => {
                  if (item.status !== 'complete') e.target.style.background = '';
                }}
              >
                <span style={{marginRight: '8px', fontWeight: 'bold'}}>{item.id}.</span>
                <div {...makeEditableBullet(item.text)}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadway utilities Section */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>3. Roadway utilities – redesign ditch and approve by 9/3</div>
        </div>

        {/* Execution Section */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>2. Execution</div>
          
          {/* Civil Table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Civil</th>
                <th style={styles.th}>Start</th>
                <th style={styles.th}>Progress</th>
                <th style={styles.th}>Amt</th>
                <th style={styles.th}>Note</th>
              </tr>
            </thead>
            <tbody>
              {civilData.map((row, index) => (
                <tr key={index} className={getStatusClass(row.status)}>
                  <td style={styles.td} {...makeEditable(row.civil)}>{row.civil}</td>
                  <td style={styles.td} {...makeEditable(row.start)}>{row.start}</td>
                  <td style={styles.td} {...makeEditable(row.progress)}>{row.progress}</td>
                  <td style={styles.td} {...makeEditable(row.amt)}>{row.amt}</td>
                  <td style={styles.td} {...makeEditable(row.note)}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Trades Table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Trades</th>
                <th style={styles.th}>Start</th>
                <th style={styles.th}>Floor 2</th>
                <th style={styles.th}>Floor 3</th>
                <th style={styles.th}>Roof</th>
                <th style={styles.th}>Note</th>
              </tr>
            </thead>
            <tbody>
              {tradesData.map((row, index) => (
                <tr key={index} className={getStatusClass(row.status)}>
                  <td style={styles.td} {...makeEditable(row.trade)}>{row.trade}</td>
                  <td style={styles.td} {...makeEditable(row.start)}>{row.start}</td>
                  <td style={styles.td} {...makeEditable(row.floor2)}>{row.floor2}</td>
                  <td style={styles.td} {...makeEditable(row.floor3)}>{row.floor3}</td>
                  <td style={styles.td} {...makeEditable(row.roof)}>{row.roof}</td>
                  <td style={styles.td} {...makeEditable(row.note)}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        td:hover { 
          background: #f9fafb !important; 
        }
        .status-complete { 
          background: #dcfce7 !important; 
        }
        .status-progress { 
          background: #fed7aa !important; 
        }
        .status-pending { 
          background: #f3f4f6 !important; 
        }
        @media (max-width: 768px) {
          .container { 
            padding: 15px; 
          }
          table { 
            font-size: 11px; 
          }
          th, td { 
            padding: 6px 4px; 
          }
          .controls { 
            flex-direction: column; 
            align-items: stretch; 
          }
          .btn { 
            margin: 2px 0; 
          }
        }
      `}</style>
    </div>
  );
};

export default StackhouseDashboard;