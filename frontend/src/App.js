
import './App.css';
import InvantntryPage from './pages/InvantntryPage';
import SalePage from './pages/SalePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvantntryPage/>} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
 