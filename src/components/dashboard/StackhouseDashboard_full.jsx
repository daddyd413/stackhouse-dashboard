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
  const [currentDate] = useState(new Date().toLocaleDateString());
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
    <div className="min-h-screen bg-gray-100 py-5">
      {/* Sheet of Paper Container */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-10 min-h-[calc(100vh-2.5rem)]">
        
        {/* Centered Header */}
        <div className="text-center mb-10 relative">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-5 py-2 rounded-md font-bold text-lg inline-block mb-3">
            STACKHOUSE
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Project Dashboard
          </h1>
          <p className="text-base text-gray-600">
            SD Weekly Team Review - {currentDate}
          </p>
          
          {/* Action Buttons */}
          <div className="absolute top-0 right-0 hidden lg:flex gap-2 flex-wrap">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
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
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white border-none rounded-md text-sm cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <FileText size={16} />
              Export PDF
            </button>
            <button 
              onClick={() => setShowAddProjectModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white border-none rounded-md text-sm cursor-pointer hover:bg-green-600 transition-colors"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
          
          {/* Mobile Buttons */}
          <div className="flex justify-center gap-2 mt-5 flex-wrap lg:hidden">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
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
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white border-none rounded-md text-sm cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <FileText size={16} />
              Export PDF
            </button>
            <button 
              onClick={() => setShowAddProjectModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white border-none rounded-md text-sm cursor-pointer hover:bg-green-600 transition-colors"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        </div>

        {/* Big Three Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-5">
            2. BIG 3s
          </h2>
          <div className="pl-5">
            {bigThree.map((item, index) => (
              <div key={index} className="flex items-start mb-4">
                <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
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
                    className="flex-1 p-2 border border-gray-300 rounded text-base resize-none font-inherit"
                    rows={2}
                    autoFocus
                  />
                ) : (
                  <div 
                    onClick={() => setEditingBigThree(index)}
                    className="flex-1 cursor-pointer p-1 text-base leading-normal text-gray-800"
                  >
                    <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Program Items */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 mb-8">
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

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-slate-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Add New Project</h3>
              <p className="text-slate-600">What type of project would you like to add?</p>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <button
                onClick={() => addProject('construction')}
                className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
              >
                <div className="w-4 h-4 bg-orange-200 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                Construction Project
              </button>
              <button
                onClick={() => addProject('entitlement')}
                className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
              >
                <div className="w-4 h-4 bg-emerald-200 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                Entitlement Project
              </button>
            </div>
            <button
              onClick={() => setShowAddProjectModal(false)}
              className="w-full px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StackhouseDashboard;