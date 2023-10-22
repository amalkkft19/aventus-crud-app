// import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';

import CreatePage from '../src/components/createPage';
import ListPage from './components/listPage';
import UpdatePage from './components/updatePage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<CreatePage/>} />
          <Route path="/list" element={<ListPage/>} />
          <Route path="/update" element={<UpdatePage/>} />
        </Routes>
    </Router>
  );
}

export default App;
