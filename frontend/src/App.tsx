import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('m1');

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="logo">CivicPulse Nexus</h2>
        <nav>
          <button className={activeTab === 'm1' ? 'active' : ''} onClick={() => setActiveTab('m1')}>Citizen & Grievance (M1)</button>
          <button className={activeTab === 'm2' ? 'active' : ''} onClick={() => setActiveTab('m2')}>Certificates (M2)</button>
          <button className={activeTab === 'm3' ? 'active' : ''} onClick={() => setActiveTab('m3')}>Welfare (M3)</button>
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
        </div>
      </div>
    </div>
  )
}

function Milestone1() {
  return (
    <div className="module">
      <h3>Citizen & Grievance Management</h3>
      <div className="stats">
        <div className="stat-card"><h4>Registered Citizens</h4><p>2.4M</p></div>
        <div className="stat-card"><h4>Grievances/Month</h4><p>12.4K</p></div>
        <div className="stat-card"><h4>Resolution Rate</h4><p>94%</p></div>
      </div>
      <div className="data-table">
        <h4>Recent Grievances</h4>
        <table>
          <thead><tr><th>ID</th><th>Citizen</th><th>Category</th><th>Status</th><th>SLA</th></tr></thead>
          <tbody>
            <tr><td>GRV-2024-847</td><td>Ramesh Kumar</td><td>Water Supply</td><td><span className="status-badge progress">In Progress</span></td><td>2 days</td></tr>
            <tr><td>GRV-2024-848</td><td>Priya Sharma</td><td>Street Light</td><td><span className="status-badge resolved">Resolved</span></td><td>0 days</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Milestone2() {
  return (
    <div className="module">
      <h3>Certificate & Permit Management</h3>
      <div className="stats">
        <div className="stat-card"><h4>Applications/Month</h4><p>24.7K</p></div>
        <div className="stat-card"><h4>Avg Approval Time</h4><p>2.4 days</p></div>
        <div className="stat-card"><h4>Certificates Issued</h4><p>847K</p></div>
      </div>
      <div className="data-table">
        <h4>Recent Applications</h4>
        <table>
          <thead><tr><th>ID</th><th>Applicant</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>APP-2024-1247</td><td>Priya Sharma</td><td>Birth Certificate</td><td><span className="status-badge approved">Approved</span></td><td><button>View</button></td></tr>
            <tr><td>APP-2024-1248</td><td>Amit Patel</td><td>Trade License</td><td><span className="status-badge pending">Pending</span></td><td><button>Review</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Milestone3() {
  return (
    <div className="module">
      <h3>Welfare & Budget Management</h3>
      <div className="stats">
        <div className="stat-card"><h4>Beneficiaries</h4><p>247K</p></div>
        <div className="stat-card"><h4>Funds Disbursed</h4><p>$24.7M</p></div>
        <div className="stat-card"><h4>Budget Utilized</h4><p>87%</p></div>
      </div>
      <div className="data-table">
        <h4>Welfare Schemes</h4>
        <table>
          <thead><tr><th>Scheme Name</th><th>Beneficiaries</th><th>Allocated</th><th>Disbursed</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>PM Awas Yojana</td><td>2,847</td><td>$2.4M</td><td>$2.1M</td><td><span className="status-badge active">Active</span></td></tr>
            <tr><td>Student Scholarship</td><td>15,000</td><td>$5.0M</td><td>$4.8M</td><td><span className="status-badge active">Active</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
