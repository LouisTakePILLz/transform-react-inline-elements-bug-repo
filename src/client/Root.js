import React from 'react'
import ReactDOM from 'react-dom'
import {Steps} from 'antd'

export default class Root extends React.PureComponent {
  render() {
    return (
      <div>
        <Steps progressDot current={0}>
          <Steps.Step title="test 1" />
          <Steps.Step title="test 2" />
        </Steps>
      </div>
    )
  }
}
