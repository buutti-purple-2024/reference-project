import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');


if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <UserProvider>
        <App />
      </UserProvider>
        </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found.");
}