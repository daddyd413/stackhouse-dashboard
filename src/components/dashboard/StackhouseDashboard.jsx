import React, { useState } from 'react';
import { FileText, Plus, X } from 'lucide-react';

// Mock data based on your Word documents
const initialProjects = {
  construction: [
    {
      id: 1,
      project: "1200 MLK",
      budget: "$90.1",
      projection: "$89.4",
      mobe: "1/1/24",
      foundation: "10/23",
      roof: "4/12",
      tco: "9/15",
      co: "10/15",
      note: "TCO = all fls open",
      status: "active"
    },
    {
      id: 2,
      project: "1300 Old Oxford",
      budget: "$75.55",
      projection: "$74.26",
      mobe: "1/3/25",
      foundation: "4/18",
      roof: "7/30",
      tco: "12/31",
      co: "1Q26",
      note: "Binder b4 vertical",
      status: "active"
    },
    {
      id: 3,
      project: "NC42",
      budget: "$72.35",
      projection: "$71.50",
      mobe: "5/01",
      foundation: "B5:9/5\nB4:11/21",
      roof: "11/19\n2/28",
      tco: "3/15\n5/1",
      co: "5/31",
      note: "B5 1H steel aug\nB5 full found 9/5",
      status: "active"
    },
    {
      id: 4,
      project: "914 Dowling",
      budget: "$77.60",
      projection: "-",
      mobe: "8/15",
      foundation: "4Q25",
      roof: "4/2026",
      tco: "4Q26",
      co: "4Q26",
      note: "Mob coming soon",
      status: "planned"
    }
  ],
  entitlement: [
    {
      id: 5,
      project: "3081 Sanderford",
      sp: "5/29",
      cds: "9/15",
      designBP: "7/30",
      bp: "10/1",
      budget: "8/30",
      ready: "3Q25",
      mobe: "4Q25",
      note: "1st rev 7/3",
      status: "active"
    },
    {
      id: 6,
      project: "East Club",
      sp: "9/15?",
      cds: "",
      designBP: "Pending",
      bp: "",
      budget: "",
      ready: "",
      mobe: "",
      note: "Sketch",
      status: "planning"
    },
    {
      id: 7,
      project: "5904 Creedmoor",
      sp: "",
      cds: "",
      designBP: "Sub 7/30",
      bp: "",
      budget: "",
      ready: "",
      mobe: "",
      note: "",
      status: "planning"
    },
    {
      id: 8,
      project: "4104 S Miami",
      sp: "1/31",
      cds: "1/15",
      designBP: "8/30",
      bp: "8/30",
      budget: "3Q25",
      ready: "2Q26",
      mobe: "",
      note: "Sewer deal, SWalk",
      status: "active"
    },
    {
      id: 9,
      project: "RQ North",
      sp: "7/15",
      cds: "10/15",
      designBP: "9/15",
      bp: "11/30",
      budget: "12/1",
      ready: "4Q25",
      mobe: "2Q26",
      note: "Annex / Subdivide",
      status: "active"
    }
  ]
};

const StackhouseDashboard = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  const [bigThree, setBigThree] = useState([
    "Open 1200 MLK 9/15: Shaft issue closure, OWASA Water cert, Conditional Power",
    "Open 1300 Old Oxford by 12/31: Binder 9/1, storm/site by 9/30, MEP roughed by 9/30", 
    "NC 42: B5 Foundation by August, B4 Foundation October, Site: Install water between pours"
  ]);
  
  const [programItems, setProgramItems] = useState([
    "Team and Recruiting: Need operator & 2 labor, Cruz brothers",
    "Admin Planning: E Club wetlands delineation 8/10, set site plan 8/15",
    "Design/Construction Items: Dowling BP, S Miami building design, Sanderford sprinkler"
  ]);
  
  const [editingBigThree, setEditingBigThree] = useState(null);
  const [editingProgram, setEditingProgram] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToPDF = () => {
    alert('PDF export functionality will be implemented in Week 3');
  };

  const addProject = (type) => {
    const newId = Date.now();
    const newProject = {
      id: newId,
      project: `New ${type === 'construction' ? 'Construction' : 'Entitlement'} Project`,
      status: 'planning'
    };

    if (type === 'construction') {
      const constructionProject = {
        ...newProject,
        budget: '',
        projection: '',
        mobe: '',
        foundation: '',
        roof: '',
        tco: '',
        co: '',
        note: ''
      };
      setProjects(prev => ({
        ...prev,
        construction: [...prev.construction, constructionProject]
      }));
    } else {
      const entitlementProject = {
        ...newProject,
        sp: '',
        cds: '',
        designBP: '',
        bp: '',
        budget: '',
        ready: '',
        mobe: '',
        note: ''
      };
      setProjects(prev => ({
        ...prev,
        entitlement: [...prev.entitlement, entitlementProject]
      }));
    }
    setShowAddProjectModal(false);
  };

  const handleCellEdit = (projectType, projectId, field, currentValue) => {
    setEditingCell(`${projectType}-${projectId}-${field}`);
    setEditValue(currentValue || '');
  };

  const handleCellSave = (projectType, projectId, field) => {
    setProjects(prev => ({
      ...prev,
      [projectType]: prev[projectType].map(project =>
        project.id === projectId
          ? { ...project, [field]: editValue }
          : project
      )
    }));
    setEditingCell(null);
    setEditValue('');
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const updateBigThree = (index, value) => {
    const updated = [...bigThree];
    updated[index] = value;
    setBigThree(updated);
    setEditingBigThree(null);
  };

  const updateProgramItem = (index, value) => {
    const updated = [...programItems];
    updated[index] = value;
    setProgramItems(updated);
    setEditingProgram(null);
  };

  const addProgramItem = () => {
    setProgramItems([...programItems, "New program item"]);
  };

  const deleteProgramItem = (index) => {
    const updated = programItems.filter((_, i) => i !== index);
    setProgramItems(updated);
  };

  const renderEditableCell = (projectType, project, field, isTextarea = false) => {
    const cellKey = `${projectType}-${project.id}-${field}`;
    const isEditing = editingCell === cellKey;
    const value = project[field];

    if (isEditing) {
      return isTextarea ? (
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleCellSave(projectType, project.id, field)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleCellSave(projectType, project.id, field);
            }
            if (e.key === 'Escape') handleCellCancel();
          }}
          className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-inner bg-white"
          rows={2}
          autoFocus
        />
      ) : (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleCellSave(projectType, project.id, field)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCellSave(projectType, project.id, field);
            if (e.key === 'Escape') handleCellCancel();
          }}
          className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-inner bg-white"
          autoFocus
        />
      );
    }

    return (
      <div 
        onClick={() => handleCellEdit(projectType, project.id, field, value)}
        className="cursor-pointer hover:bg-slate-100/60 px-3 py-2 rounded-lg min-h-[32px] flex items-center transition-all duration-150"
        title={value}
      >
        {isTextarea && value?.includes('\n') ? (
          <div className="whitespace-pre-line">{value || <span className="text-slate-400 italic">Click to edit</span>}</div>
        ) : (
          <div>{value || <span className="text-slate-400 italic">Click to edit</span>}</div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px 0' }}>
      {/* Sheet of Paper Container */}
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
        borderRadius: '8px',
        padding: '40px',
        minHeight: 'calc(100vh - 40px)'
      }}>
        
        {/* Centered Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
          <div style={{ 
            background: 'linear-gradient(to right, #1e293b, #0f172a)', 
            color: 'white', 
            padding: '8px 20px', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            fontSize: '18px',
            display: 'inline-block',
            marginBottom: '12px'
          }}>
            STACKHOUSE
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '8px 0' }}>
            Project Dashboard
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '0' }}>
            SD Weekly Team Review - {currentDate}
          </p>
          
          {/* Action Buttons - Responsive Position */}
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            right: '0',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }} className="hidden lg:flex">
            <select style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#374151'
            }}>
              <option value="">Jump to Project</option>
              <optgroup label="Construction">
                {projects.construction.map(project => (
                  <option key={project.id} value={project.id}>{project.project}</option>
                ))}
              </optgroup>
              <optgroup label="Entitlement">
                {projects.entitlement.map(project => (
                  <option key={project.id} value={project.id}>{project.project}</option>
                ))}
              </optgroup>
            </select>
            <button 
              onClick={exportToPDF}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <FileText size={16} />
              Export PDF
            </button>
            <button 
              onClick={() => setShowAddProjectModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
          
          {/* Mobile Buttons - Below header */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
            flexWrap: 'wrap'
          }} className="lg:hidden">
            <select style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#374151'
            }}>
              <option value="">Jump to Project</option>
              <optgroup label="Construction">
                {projects.construction.map(project => (
                  <option key={project.id} value={project.id}>{project.project}</option>
                ))}
              </optgroup>
              <optgroup label="Entitlement">
                {projects.entitlement.map(project => (
                  <option key={project.id} value={project.id}>{project.project}</option>
                ))}
              </optgroup>
            </select>
            <button 
              onClick={exportToPDF}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <FileText size={16} />
              Export PDF
            </button>
            <button 
              onClick={() => setShowAddProjectModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        </div>

        {/* Big Three Section */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
            2. BIG 3s
          </h2>
          <div style={{ paddingLeft: '20px' }}>
            {bigThree.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginRight: '12px',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {index + 1}
                </div>
                {editingBigThree === index ? (
                  <textarea
                    value={item}
                    onChange={(e) => {
                      const updated = [...bigThree];
                      updated[index] = e.target.value;
                      setBigThree(updated);
                    }}
                    onBlur={() => setEditingBigThree(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        updateBigThree(index, e.target.value);
                      }
                      if (e.key === 'Escape') {
                        setEditingBigThree(null);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '16px',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                    rows={2}
                    autoFocus
                  />
                ) : (
                  <div 
                    onClick={() => setEditingBigThree(index)}
                    style={{
                      flex: 1,
                      cursor: 'pointer',
                      padding: '4px',
                      fontSize: '16px',  // 2pts larger
                      lineHeight: '1.4',
                      color: '#1f2937'
                    }}
                  >
                    <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Program Items */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
            <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  Program Items
                </h2>
                <p className="text-sm text-slate-600 mt-1">Ongoing initiatives and tasks</p>
              </div>
              <button
                onClick={addProgramItem}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {programItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <span className="flex-shrink-0 w-3 h-3 bg-emerald-400 rounded-full mt-3 shadow-sm"></span>
                    {editingProgram === index ? (
                      <div className="flex-1">
                        <textarea
                          value={item}
                          onChange={(e) => {
                            const updated = [...programItems];
                            updated[index] = e.target.value;
                            setProgramItems(updated);
                          }}
                          onBlur={() => setEditingProgram(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              updateProgramItem(index, e.target.value);
                            }
                            if (e.key === 'Escape') {
                              setEditingProgram(null);
                            }
                          }}
                          className="w-full p-3 border-2 border-emerald-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-inner"
                          rows={3}
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div className="flex-1 flex justify-between items-start">
                        <div 
                          className="text-sm text-slate-700 cursor-pointer hover:bg-slate-50 p-3 rounded-xl flex-1 transition-all font-medium leading-relaxed"
                          onClick={() => setEditingProgram(index)}
                        >
                          {item}
                        </div>
                        <button
                          onClick={() => deleteProgramItem(index)}
                          className="opacity-0 group-hover:opacity-100 ml-3 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Construction Projects Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 mb-10 hover:shadow-2xl transition-all duration-300">
          <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-2xl">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              Construction Projects
            </h2>
            <p className="text-sm text-slate-600 mt-1">Active building developments and timelines</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Projection</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Mobe</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Foundation</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Roof</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">TCO</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">CO</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Note</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {projects.construction.map((project, index) => (
                  <tr key={project.id} className={`hover:bg-gradient-to-r hover:from-orange-50 hover:to-slate-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-slate-50/30' : 'bg-white'}`}>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-slate-900">
                      {renderEditableCell('construction', project, 'project')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('construction', project, 'budget')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('construction', project, 'projection')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('construction', project, 'mobe')}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-700 font-medium">
                      {renderEditableCell('construction', project, 'foundation', true)}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-700 font-medium">
                      {renderEditableCell('construction', project, 'roof', true)}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-700 font-medium">
                      {renderEditableCell('construction', project, 'tco', true)}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('construction', project, 'co')}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-700 max-w-xs font-medium">
                      {renderEditableCell('construction', project, 'note', true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Entitlement Projects Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
          <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-t-2xl">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
              Entitlement Projects
            </h2>
            <p className="text-sm text-slate-600 mt-1">Planning and permitting pipeline</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">SP</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">CDs</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Design BP</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">BP</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Ready</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Mobe</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Note</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {projects.entitlement.map((project, index) => (
                  <tr key={project.id} className={`hover:bg-gradient-to-r hover:from-emerald-50 hover:to-slate-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-slate-50/30' : 'bg-white'}`}>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-slate-900">
                      {renderEditableCell('entitlement', project, 'project')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('entitlement', project, 'sp')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('entitlement', project, 'cds')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('entitlement', project, 'designBP')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('entitlement', project, 'bp')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('entitlement', project, 'budget')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('entitlement', project, 'ready')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {renderEditableCell('entitlement', project, 'mobe')}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-700 max-w-xs font-medium">
                      {renderEditableCell('entitlement', project, 'note', true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddProjectModal && (
        <div>
          <h3>Test Modal</h3>
        </div>
      )}
    </div>
  );
};

export default StackhouseDashboard;