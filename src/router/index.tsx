import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={''} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
