import React from 'react'
import PropTypes from 'prop-types'
'use strict';

const Posts = ({ posts }) => (
  <div>
    <ul>
      <li>temperatura: {posts.main.temp}</li>
      <li>wilgotność: {posts.main.humidity}</li>
    </ul>
    <img alt='' src={`http://openweathermap.org/img/w/${posts.weather[0].icon}.png`} />    
  </div>
)

Posts.propTypes = {
    
  posts: PropTypes.object.isRequired
}

export default Posts
