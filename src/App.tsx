import React from 'react';
import { AppProvider } from './providers/AppProvider';
import Autocomplete from './components/Autocomplete';
import SelectedList from './components/SelectedList';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <header className="app-header">
          <h1>Autocomplete App</h1>
          <p>React + TypeScript + Recoil</p>
        </header>
        <main className="app-main">
          <Autocomplete />
          <SelectedList />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
