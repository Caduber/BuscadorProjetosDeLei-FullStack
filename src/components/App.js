import React from 'react';
import logo from '../context/icons/logo.svg';
import '../context/styles/App.css';
import Hero from './Hero';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
        {/* <Header /> */}
        <Hero />
        <Footer />
    </div>
  );
}

export default App;
