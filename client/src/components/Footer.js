import React from 'react'

import logo from '../img/GitHub-32px.png'

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="footer">
      <div>
        <a href="https://github.com/toninau">
          <img id="github" src={logo} alt="github" />
        </a>
      </div>
      <div className="footer-info">
        <a style={{ color: 'white' }} href="https://github.com/toninau/react_weather_app/blob/master/README.md">
          <p>Info about this app</p>
        </a>
        <button id="top-button" onClick={scrollToTop}>
          <i className="material-icons">expand_less</i>
        </button>
      </div>
      <div className="footer-maker">
        <p>Made by Toni Naumanen</p>
        <p style={{ margin: 'auto' }}>© 2020</p>
      </div>
    </div>
  )
}

export default Footer