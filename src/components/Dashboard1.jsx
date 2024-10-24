import { useState } from 'react'
import '../dashboard.css'

const UserRole = {
    Admin: "Admin",
    Manager: "Manager",
    Employee: "Employee",
  };
  
  // Mock user object
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: UserRole.Admin,
    avatar: "/placeholder.svg?height=40&width=40",
  };

const Dashboard = () => {
    const [currentRole, setCurrentRole] = useState(user.role)
    
    const handleRoleChange = (role) => {
      setCurrentRole(role)
    }
  
    return (
      <div className="container-dashboard">
        
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1>Dashboard</h1>
            </div>
            <nav className="sidebar-nav">
                <button className="sidebar-button">
                <a href="#"><span className="icon-layout"></span> Overview</a>
                </button>
                {currentRole !== UserRole.Employee && (
                <button className="sidebar-button">
                    <a href="#"><span className="icon-users"></span> Team</a>
                </button>
                )}
                <button className="sidebar-button">
                <a href="#"><span className="icon-file-text"></span> Reports</a>
                </button>
                {currentRole === UserRole.Admin && (
                <button className="sidebar-button">
                    <a href="#"><span className="icon-settings"></span> Settings</a>
                </button>
                )}
            </nav>
        </aside>

  
        {/* Main content */}
            <main className="main-content">
            <div className="header">
                <h2>Bienveni@, {user.name}</h2>
                <div className="header-actions">
                <button className="icon-button">
                    <span className="icon-bell"></span>
                </button>
                <div className="dropdown-menu">
                    <button className="avatar-button">
                    <img src={user.avatar} alt={user.name} className="avatar-image" />
                    <span className="avatar-fallback">{user.name.charAt(0)}</span>
                    </button>
                    <div className="dropdown-content">
                    <div className="dropdown-label">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="dropdown-separator"></div>
                    <div className="dropdown-item">
                        <span className="icon-settings"></span>
                        <span>Settings</span>
                    </div>
                    <div className="dropdown-item">
                        <span className="icon-logout"></span>
                        <span>Log out</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Role selector (for demo purposes) */}
            <div className="card">
                <div className="card-header">
                <h3>Switch Role (Demo)</h3>
                <p>Change the current role to see different dashboard views</p>
                </div>
                <div className="card-content">
                <select onChange={(e) => handleRoleChange(e.target.value)} value={currentRole}>
                    <option value={UserRole.Admin}>Admin</option>
                    <option value={UserRole.Manager}>Manager</option>
                    <option value={UserRole.Employee}>Employee</option>
                </select>
                </div>
            </div>

  
          {/* Role-specific content */}
            <div className="role-specific-content">
            {/* Common card for all roles */}
            <div className="card">
                <div className="card-header">
                <h3>Personal Tasks</h3>
                <p>Your current tasks</p>
                </div>
                <div className="card-content">
                <p>You have 5 tasks due this week</p>
                </div>
            </div>

            {/* Admin and Manager specific card */}
            {(currentRole === UserRole.Admin || currentRole === UserRole.Manager) && (
                <div className="card">
                <div className="card-header">
                    <h3>Team Overview</h3>
                    <p>Team performance and tasks</p>
                </div>
                <div className="card-content">
                    <p>Team productivity is up by 15% this month</p>
                </div>
                </div>
            )}

            {/* Admin specific card */}
            {currentRole === UserRole.Admin && (
                <div className="card">
                <div className="card-header">
                    <h3>System Settings</h3>
                    <p>Manage system configurations</p>
                </div>
                <div className="card-content">
                    <button>Access Settings</button>
                </div>
                </div>
            )}

            {/* Manager specific card */}
            {currentRole === UserRole.Manager && (
                <div className="card">
                <div className="card-header">
                    <h3>Resource Allocation</h3>
                    <p>Manage team resources</p>
                </div>
                <div className="card-content">
                    <button>Allocate Resources</button>
                </div>
                </div>
            )}

            {/* Employee specific card */}
            {currentRole === UserRole.Employee && (
                <div className="card">
                <div className="card-header">
                    <h3>Training Resources</h3>
                    <p>Access learning materials</p>
                </div>
                <div className="card-content">
                    <button>View Courses</button>
                </div>
                </div>
            )}
            </div>

        </main>
      </div>
    )
}

export default Dashboard