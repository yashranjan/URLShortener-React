import React, { useState } from 'react'
import axios from 'axios'

import './Form.css'

const Form = () => {
  let [showOutput, setShowOutput] = useState('none')
  let [urlToShort, setUrlToShort] = useState('')
  let [shortenedURL, setShortenedURL] = useState('')

  let handleFormSubmit = (event) => {
    event.preventDefault()
    // Fetch the value entered and store it
    let URLEntered = event.target.url.value
    let choiceEntered = event.target.choice.value
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

    axios
      .get('https://url-shortenert.herokuapp.com/add-url/', {
        params: params,
      })
      .then((response) => {
        if (response.data.status === 200) {
          let data = JSON.parse(response.data.data)
          setShowOutput('ok')
          setShortenedURL(data.shortURL)
          setUrlToShort(data.originalURL)
        } else if (response.data.status === 500) {
          alert(response.data.error)
          setUrlToShort(URLEntered)
        } else {
          setShowOutput('error')
          setUrlToShort(URLEntered)
        }
      })
  }
  return (
    <div>
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
      {showOutput === 'ok' && (
        <center>
          <h3>URL successfully shortened!!</h3>
          <h3>
            Use https://url-shortenert.herokuapp.com/{shortenedURL} to access{' '}
            {urlToShort}
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
