import React from 'react';
import { AppProvider } from './providers/AppProvider';
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
          {/* Autocomplete component will go here in step 4 */}
          <p>Autocomplete component coming soon...</p>

          {/* Selected items list will go here in step 6 */}
          <p>Selected items list coming soon...</p>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
