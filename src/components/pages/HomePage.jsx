import React from 'react'
import "./HomePage.css"
import RequestList from "../RequestList"

const HomePage = () => {
  return (
    <div className='homepage'>
      {/* <nav class="navbar fixed-bottom navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">Fixed bottom</a>
        </div>
      </nav> */}
      <RequestList />
    </div>
  )
}

export default HomePage;