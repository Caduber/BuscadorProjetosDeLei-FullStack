import React from 'react';
// import logo from '../context/icons/logo.svg';
import '../context/styles/App.css';
import Hero from './Hero';
import Header from './Header';
import Footer from './Footer';
import { PropostaProvider } from './PropostaContext';

function App() {
  return (
    <div className="App">
      <PropostaProvider>
        <Hero />
        <Footer />
      </PropostaProvider>
    </div>
  );
}

export default App;
