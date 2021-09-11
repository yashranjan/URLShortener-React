// Default/3rd-party libraries import
import React, { useState } from 'react'
import axios from 'axios'

// Custom CSS import
import './Form.css'

// URL of the backend
let URL = 'https://url-shortenert.herokuapp.com/'

const Form = () => {
  // Create state variables and react-hooks to modify them
  let [showOutput, setShowOutput] = useState('none')
  let [urlToShort, setUrlToShort] = useState('')
  let [shortenedURL, setShortenedURL] = useState('')

  // Handle the data submitted via the form
  let handleFormSubmit = (event) => {
    event.preventDefault()
    // Fetch the values entered and store it
    let URLEntered = event.target.url.value
    let choiceEntered = event.target.choice.value
    // If the entered choice is less than 4 characters, show errors
    if (choiceEntered && choiceEntered.length < 4) {
      setShowOutput('error')
      setUrlToShort(URLEntered)
      setShortenedURL(choiceEntered)
      return
    }

    let params = {
      urlentered: URLEntered,
    }

    params['choiceentered'] = choiceEntered ? choiceEntered : ''
    // Make a get request to the backend with the entered data
    axios
      .get(URL + 'add-url/', {
        params: params,
      })
      .then((response) => {
        if (response.data.status === 200) {
          //   If the status is 200, show the success dialog
          let data = JSON.parse(response.data.data)
          setShowOutput('ok')
          setShortenedURL(data.shortURL)
          setUrlToShort(data.originalURL)
          navigator.clipboard.writeText(URL + data.shortURL)
        } else if (response.data.status === 500) {
          // If the status is 500, show the alert box with the error
          alert(response.data.error)
          setShowOutput('none')
          setUrlToShort(URLEntered)
        } else {
          // Else, show the error dialog box
          setShowOutput('error')
          setUrlToShort(URLEntered)
        }
      })
  }
  return (
    <div>
      {/* If the showOutput is none, show the default dialog */}
      {showOutput === 'none' && (
        <center>
          <form onSubmit={(event) => handleFormSubmit(event)}>
            <input
              type='text'
              name='url'
              placeholder='Enter your URL to be shortened'
            />
            <br />
            <input
              type='text'
              name='choice'
              placeholder='Enter your choice'
              defaultValue={urlToShort ? urlToShort : ''}
            />
            <br />
            <input type='submit' value='SUBMIT' />
          </form>
        </center>
      )}
      {/* If the showOutput is ok, show the success dialog */}
      {showOutput === 'ok' && (
        <center>
          <h3>URL successfully shortened!!</h3>
          <h3>
            Use {URL + shortenedURL} to access
            {' ' + urlToShort}
            <br />
            The shortened URL is already copied to the clipboard!!
          </h3>
          <input
            type='button'
            value='Short another one?'
            onClick={() => {
              setShowOutput('none')
              setShortenedURL('')
              setUrlToShort('')
            }}
          />
        </center>
      )}
      {/* If the showOutput if error, show the error dialog */}
      {showOutput === 'error' && (
        <center>
          <h3 className='warning'>
            The URL of the choice is not available or is less than 4
            characters!! Kindly re-try or simply submit without any choice!!
          </h3>
          <form onSubmit={(event) => handleFormSubmit(event)}>
            <input
              type='text'
              name='url'
              placeholder='Enter your URL to be shortened'
              defaultValue={urlToShort}
            />
            <br />
            <input type='text' name='choice' placeholder='Enter your choice' />
            <br />
            <input type='submit' value='SUBMIT' />
          </form>
        </center>
      )}
    </div>
  )
}

export default Form
