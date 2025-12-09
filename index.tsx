import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical Error: Could not find root element 'root'");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("HemoFix App Mounted Successfully");
} catch (error) {
  console.error("Application Crash during render:", error);
  rootElement.innerHTML = '<div style="color:red; padding:20px;">App crashed. Check console for details.</div>';
}