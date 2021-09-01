import React from 'react'
import './App.css'
import Form from './Form.js'

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
