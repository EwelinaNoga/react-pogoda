export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CITY = 'SELECT_CITY'
export const INVALIDATE_CITY = 'INVALIDATE_CITY'
 'use strict';

export const invalidateCity = city => ({
   
  type: INVALIDATE_CITY,
  city
})

export const selectCity = city => ({
  type: SELECT_CITY,
  city
})


export const requestPosts = city => ({
  type: REQUEST_POSTS,
  city
})

export const receivePosts = (city, json) => ({
  type: RECEIVE_POSTS,
  city,
  posts: json,
  receivedAt: Date.now()
})

const fetchPosts = city => dispatch => {
  dispatch(requestPosts(city))
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1bb722974d0bd948183d73bdff9c8456&units=metric`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(city, json)))
}

const shouldFetchPosts = (state, city) => {
  const posts = state.postsByCity[city]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = city => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), city)) {
    return dispatch(fetchPosts(city))
  }
}

