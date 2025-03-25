import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app.jsx"
import "./index.css"

// Simple rendering logic
const rootElement = document.getElementById("root")
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error("Root element not found")
  // Create root element if it doesn't exist
  const newRoot = document.createElement("div")
  newRoot.id = "root"
  document.body.appendChild(newRoot)

  ReactDOM.createRoot(newRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

