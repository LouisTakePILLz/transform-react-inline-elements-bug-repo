import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

const MOUNT_NODE = document.querySelector('#app')

// eslint-disable-next-line no-underscore-dangle
global.__APP_RENDER = () => {
  ReactDOM.render(<Root />, MOUNT_NODE)
}

__APP_RENDER()
