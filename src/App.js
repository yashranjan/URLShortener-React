// Default/3rd-party libraries import
import React from 'react'
import Form from './Form.js'

// Custom CSS import
import './App.css'

function App() {
  return (
    <div>
      <div className='heading'>
        <center>
          <h1 className='header'>URL Shortener</h1>
        </center>
      </div>
      <div>
        <Form />
      </div>
    </div>
  )
}

export default App
