import { combineReducers } from 'redux'
import {
  SELECT_CITY, INVALIDATE_CITY,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedCity = (state = 'Warsaw', action) => {
  switch (action.type) {
    case SELECT_CITY:
      return action.city
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_CITY:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByCity = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_CITY:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.city]: posts(state[action.city], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByCity,
  selectedCity
})

export default rootReducer

