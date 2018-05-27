import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectCity, fetchPostsIfNeeded, invalidateCity } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
    'use strict';
  static propTypes = {
    selectedCity: PropTypes.string.isRequired,
    posts: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedCity } = this.props
    dispatch(fetchPostsIfNeeded(selectedCity))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCity !== this.props.selectedCity) {
      const { dispatch, selectedCity } = nextProps
      dispatch(fetchPostsIfNeeded(selectedCity))
    }
  }

  handleChange = nextCity => {
    this.props.dispatch(selectCity(nextCity))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedCity } = this.props
    dispatch(invalidateCity(selectedCity))
    dispatch(fetchPostsIfNeeded(selectedCity))
  }

  render() {
    const { selectedCity, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedCity}
                onChange={this.handleChange}
                options={[ 'Warsaw', 'Berlin', 'London', 'Dublin' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedCity, postsByCity } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByCity[selectedCity] || {
    isFetching: true,
    items: []
  }

  return {
    selectedCity,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
