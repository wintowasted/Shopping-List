import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import { AuthProvider } from './context/AuthProvider';
import './index.css'
import { ListProvider } from "./context/ListProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListProvider>
        <Routes>
          <Route path='/*' element={ <App />} />
        </Routes>
        </ListProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
