import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { removeWeather } from '../../reducers/recentWeatherReducer'
import { clearWeather } from '../../reducers/weatherReducer'
import { useMountEffect } from '../../hooks'

import SearchForm from './SearchForm'
import PreviousWeatherList from './PreviousWeatherList'

import sun from '../../img/sun_white.svg'
import './home.css'

const Home = ({ submit }) => {
  const weathers = useSelector(state => state.recentWeather)
  const dispatch = useDispatch()
  const locationRef = useRef(null)
  const buttonRef = useRef(null)
  const searchFormRef = useRef(null)

  useEffect(() => {
    dispatch(clearWeather())
  }, [dispatch])

  useMountEffect(() => {
    if (window) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const removePreviousWeather = (id) => {
    dispatch(removeWeather(id))
  }

  const handleScroll = () => {
    buttonRef.current.style.transform = `translateY(${window.pageYOffset * 0.3}px)`
  }

  const buttonScroll = () => {
    window.scrollTo({
      top: locationRef.current.offsetHeight,
      behavior: 'smooth',
    })
  }

  const focusSearchFormInput = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setTimeout(() => {
      searchFormRef.current.focusOnInput()
    }, 600)
  }

  return (
    <>
      <div ref={locationRef} className="home-landing">
        <img className="sun" src={sun} alt="sun" />
        <div className="home-box">
          <h1>Weather</h1>
          <SearchForm handleSubmit={submit} ref={searchFormRef} />
        </div>
      </div>
      <button ref={buttonRef} id="scroll-button" onClick={() => buttonScroll()}>
        <i className="material-icons">expand_more</i>
      </button>
      <PreviousWeatherList
        weathers={weathers}
        removeWeather={removePreviousWeather}
        focus={focusSearchFormInput}
      />
    </>
  )
}

Home.propTypes = {
  submit: PropTypes.func.isRequired
}

export default Home