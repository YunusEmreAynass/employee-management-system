import React from 'react'
import Alert from 'react-bootstrap/Alert';

function MyAlert({ whichAlert, message }) {

  return (
      <div className="alert-container">
          {whichAlert === 'success' && (
              <Alert className='alert-succes' key={whichAlert} variant={whichAlert}>
                 {message}
              </Alert>)}
          {whichAlert === 'error' && (
                <Alert className='alert-danger' key={whichAlert} variant={"danger"}>
                     {message}
                </Alert>)}
            
    </div>
  )
}

export default MyAlert