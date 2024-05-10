import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./root.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
            <App />
    </React.StrictMode>
)
