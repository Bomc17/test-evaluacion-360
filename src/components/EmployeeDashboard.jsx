import {useState, useEffect}from 'react';
import EvaluationCompleteForm from './EvaluationCompleteForm'

const EmployeeDashboard = ({ user, signout, getAccessToken}) => {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);


  const fetchEvaluations = async () => {
    const token = getAccessToken();
    try {
      const response = await fetch('http://localhost:3000/api/evaluations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvaluations(data);
      } else {
        console.error('Error al obtener las evaluaciones:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener las evaluaciones:', error);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const handleLogOut = () => {
    signout()
  }


  const handleFormSubmit = (data) => {
    console.log('Evaluación actualizada:', data);
    
    const newData = data.evaluacion
    
    if (selectedEvaluation) {
      setEvaluations((prevEvaluations) =>
        prevEvaluations.map((eva) => (eva._id === newData._id ? newData : eva))
      );
    } else {
      setEvaluations((prevEvaluations) => [...prevEvaluations, newData]);
    }
    setSelectedEvaluation(null);
  };

  const handleEvaluationClick = (evaluation) => {
    setSelectedEvaluation(evaluation);
  };
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
          <button className="sidebar-button">
            <a href="#"><span className="icon-file-text"></span> Reportes</a>
          </button>

            <button className="sidebar-button">
              <a href="#"><span className="icon-settings"></span> Ajustes</a>
            </button>
        </nav>
      </aside>
      <main className="main-content">
        <div className="header">
          <h2>Bienveni@, {user.username}</h2>
          <div className="header-actions">
            <button className="icon-button">
              <span className="icon-bell"></span>
            </button>
            <div className="dropdown-menu">
              <button className="avatar-button">
              <div className='circle'>
                  {user.username}
                </div>
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
                  <span onClick={handleLogOut}>Log out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="role-specific-content">
            <EvaluationCompleteForm 
                evaluations={evaluations}
                setEvaluations={setEvaluations}
                handleEvaluationClick={handleEvaluationClick}
                selectedEvaluation={selectedEvaluation}
                handleFormSubmit={handleFormSubmit}
            />
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;