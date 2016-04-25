import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Layout extends Component {
  render() {
    return (
      <div>
        <h1>LAYOUT</h1>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default connect(null)(Base)