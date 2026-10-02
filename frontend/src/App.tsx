import { useState } from 'react';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('m1');

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="logo">CivicPulse Nexus</h2>

        <nav>
          <button
            className={activeTab === 'm1' ? 'active' : ''}
            onClick={() => setActiveTab('m1')}
          >
            Citizen & Grievance (M1)
          </button>

          <button
            className={activeTab === 'm2' ? 'active' : ''}
            onClick={() => setActiveTab('m2')}
          >
            Certificates (M2)
          </button>

          <button
            className={activeTab === 'm3' ? 'active' : ''}
            onClick={() => setActiveTab('m3')}
          >
            Welfare (M3)
          </button>

          {/* MILESTONE 4 */}
          <button
            className={activeTab === 'm4' ? 'active' : ''}
            onClick={() => setActiveTab('m4')}
          >
            Governance Analytics (M4)
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header>
          <h1>Smart Governance Dashboard</h1>
          <div className="user-profile">Admin | Logout</div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'm1' && <Milestone1 />}
          {activeTab === 'm2' && <Milestone2 />}
          {activeTab === 'm3' && <Milestone3 />}
          {/* MILESTONE 4 connected to Backend API */}
          {activeTab === 'm4' && <AnalyticsDashboard />}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MILESTONE 1 (WITH INTERACTIVE CRUD OPERATIONS)
   ========================================================= */

interface GrievanceItem {
  id: string;
  citizen: string;
  category: string;
  status: 'In Progress' | 'Resolved' | 'Pending';
  sla: string;
}

function Milestone1() {
  const [grievances, setGrievances] = useState<GrievanceItem[]>([
    { id: 'GRV-2024-847', citizen: 'Ramesh Kumar', category: 'Water Supply', status: 'In Progress', sla: '2 days' },
    { id: 'GRV-2024-848', citizen: 'Priya Sharma', category: 'Street Light', status: 'Resolved', sla: '0 days' },
    { id: 'GRV-2024-849', citizen: 'Kavita Reddy', category: 'Sanitation', status: 'Pending', sla: '3 days' },
  ]);

  const [form, setForm] = useState({ citizen: '', category: 'Water Supply', sla: '3 days' });
  const [editingId, setEditingId] = useState<string | null>(null);

  // CREATE or UPDATE
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.citizen.trim()) return;

    if (editingId) {
      setGrievances(prev =>
        prev.map(item =>
          item.id === editingId
            ? { ...item, citizen: form.citizen, category: form.category, sla: form.sla }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newEntry: GrievanceItem = {
        id: `GRV-2024-${Math.floor(100 + Math.random() * 900)}`,
        citizen: form.citizen,
        category: form.category,
        status: 'Pending',
        sla: form.sla || '2 days'
      };
      setGrievances([newEntry, ...grievances]);
    }

    setForm({ citizen: '', category: 'Water Supply', sla: '3 days' });
  };

  // UPDATE Status Toggle
  const handleToggleStatus = (id: string) => {
    setGrievances(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'Pending'
              ? 'In Progress'
              : item.status === 'In Progress'
              ? 'Resolved'
              : 'Pending';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Pre-fill for EDIT
  const handleEdit = (item: GrievanceItem) => {
    setEditingId(item.id);
    setForm({ citizen: item.citizen, category: item.category, sla: item.sla });
  };

  // DELETE
  const handleDelete = (id: string) => {
    setGrievances(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="module">
      <h3>Citizen & Grievance Management</h3>

      <div className="stats">
        <div className="stat-card">
          <h4>Active Tickets</h4>
          <p>{grievances.length}</p>
        </div>
        <div className="stat-card">
          <h4>Resolution Rate</h4>
          <p>
            {grievances.length > 0
              ? `${Math.round((grievances.filter(g => g.status === 'Resolved').length / grievances.length) * 100)}%`
              : '0%'}
          </p>
        </div>
        <div className="stat-card">
          <h4>Avg Resolution Time</h4>
          <p>1.8 days</p>
        </div>
      </div>

      {/* CREATE / UPDATE FORM */}
      <div style={{ background: '#1c2438', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #2d3748' }}>
        <h4 style={{ margin: '0 0 12px 0', color: editingId ? '#ecc94b' : '#63b3ed', fontSize: '1rem' }}>
          {editingId ? '✎ Edit Grievance (UPDATE)' : '＋ Log New Grievance (CREATE)'}
        </h4>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            required
            placeholder="Citizen Name"
            value={form.citizen}
            onChange={(e) => setForm({ ...form, citizen: e.target.value })}
            style={{ padding: '8px 12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: '#fff', flex: 1, minWidth: '160px' }}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={{ padding: '8px 12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
          >
            <option value="Water Supply">Water Supply</option>
            <option value="Street Light">Street Light</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Road Repair">Road Repair</option>
            <option value="Revenue & Tax">Revenue & Tax</option>
          </select>
          <input
            type="text"
            placeholder="SLA Target (e.g. 2 days)"
            value={form.sla}
            onChange={(e) => setForm({ ...form, sla: e.target.value })}
            style={{ padding: '8px 12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: '#fff', width: '130px' }}
          />
          <button
            type="submit"
            style={{ padding: '8px 16px', background: editingId ? '#d97706' : '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
          >
            {editingId ? 'Update' : 'Add Ticket'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ citizen: '', category: 'Water Supply', sla: '3 days' });
              }}
              style={{ padding: '8px 12px', background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* READ TABLE WITH UPDATE & DELETE */}
      <div className="data-table">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ margin: 0 }}>Grievance Records (READ)</h4>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Click status to toggle</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Citizen</th>
              <th>Category</th>
              <th>Status (UPDATE)</th>
              <th>SLA</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ fontWeight: 600 }}>{item.citizen}</td>
                <td>{item.category}</td>
                <td>
                  <span
                    onClick={() => handleToggleStatus(item.id)}
                    title="Click to cycle status"
                    className={`status-badge ${
                      item.status === 'Resolved' ? 'resolved' : item.status === 'In Progress' ? 'progress' : 'pending'
                    }`}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    {item.status} ↻
                  </span>
                </td>
                <td>{item.sla}</td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ marginRight: '6px', padding: '4px 8px', background: '#0284c7', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: '4px 8px', background: '#dc2626', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   MILESTONE 2
   ========================================================= */

function Milestone2() {
  return (
    <div className="module">
      <h3>Certificate & Permit Management</h3>
      <div className="stats">
        <div className="stat-card">
          <h4>Applications/Month</h4>
          <p>24.7K</p>
        </div>
        <div className="stat-card">
          <h4>Avg Approval Time</h4>
          <p>2.4 days</p>
        </div>
        <div className="stat-card">
          <h4>Certificates Issued</h4>
          <p>847K</p>
        </div>
      </div>
      <div className="data-table">
        <h4>Recent Applications</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Applicant</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>APP-2024-1247</td>
              <td>Priya Sharma</td>
              <td>Birth Certificate</td>
              <td>
                <span className="status-badge approved">Approved</span>
              </td>
              <td>
                <button>View</button>
              </td>
            </tr>
            <tr>
              <td>APP-2024-1248</td>
              <td>Amit Patel</td>
              <td>Trade License</td>
              <td>
                <span className="status-badge pending">Pending</span>
              </td>
              <td>
                <button>Review</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   MILESTONE 3
   ========================================================= */

function Milestone3() {
  return (
    <div className="module">
      <h3>Welfare & Budget Management</h3>
      <div className="stats">
        <div className="stat-card">
          <h4>Beneficiaries</h4>
          <p>247K</p>
        </div>
        <div className="stat-card">
          <h4>Funds Disbursed</h4>
          <p>$24.7M</p>
        </div>
        <div className="stat-card">
          <h4>Budget Utilized</h4>
          <p>87%</p>
        </div>
      </div>
      <div className="data-table">
        <h4>Welfare Schemes</h4>
        <table>
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Beneficiaries</th>
              <th>Allocated</th>
              <th>Disbursed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PM Awas Yojana</td>
              <td>2,847</td>
              <td>$2.4M</td>
              <td>$2.1M</td>
              <td>
                <span className="status-badge active">Active</span>
              </td>
            </tr>
            <tr>
              <td>Student Scholarship</td>
              <td>15,000</td>
              <td>$5.0M</td>
              <td>$4.8M</td>
              <td>
                <span className="status-badge active">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;