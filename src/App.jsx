import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard2 from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard2 />} />
          </Route>
{/*           <Route path="/evaluation" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/evaluation/edit/id" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/evaluation/complete/id" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/evaluation/results" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/evaluation/results" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route> */}
        </Routes>
      </Router>
  );
}

export default App;
