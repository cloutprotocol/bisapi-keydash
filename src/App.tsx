import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/frame/Header';
import Footer from './components/frame/Footer';
import ApiKeyDetails from './components/ApiKeyDetails';
import ApiKeyList from './components/ApiKeyList';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <div className="sidebar">
            <ApiKeyList />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<div className='select pointer'>⬅ Select an API Key</div>} />
              <Route path="/api-key/:keyName" element={<ApiKeyDetails />} />
              {/* <Route path="/usage" element={<UsagePage />} /> */}
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;