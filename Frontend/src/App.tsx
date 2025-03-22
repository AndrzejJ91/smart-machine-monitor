
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import LogIn from './LogIn';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
    
  );
};

export default App;