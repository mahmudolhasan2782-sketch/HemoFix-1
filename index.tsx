import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// GLOBAL ERROR HANDLER
// This ensures that if the app crashes before React mounts (e.g. import errors),
// the user sees the error on screen instead of a white page.
window.addEventListener('error', (event) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; margin: 20px;">
        <h2 style="margin-top: 0;">Application Startup Error</h2>
        <p><strong>Message:</strong> ${event.message}</p>
        <p><strong>Source:</strong> ${event.filename} (Line: ${event.lineno})</p>
        <p>Please check the console for more details.</p>
      </div>
    `;
  }
});

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