
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import LogIn from './LogIn';
import { FilesDownloadProvider } from './components/context/FileDownloadContext';

const App = () => {
  return (
    <FilesDownloadProvider>
      <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
    </FilesDownloadProvider>  
   
    
  );
};

export default App;