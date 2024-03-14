
import React from 'react'
import MainRouter from './MainRouter'
import { AppProvider } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'

export default function App() {
  return (
    <>
    <Router>
      <AppProvider>
      <MainRouter />
      </AppProvider>
      </Router>
    </>
  )
}
