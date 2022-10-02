import React, { Component } from 'react'
import loading1 from './loading1.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className="my-3"  src={loading1} alt="loading1" />
      </div>
    )
  }
}
