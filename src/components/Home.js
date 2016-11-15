require('styles/home.css');

import React from 'react'
import SlideBar from './SlideBar'

export default class HomeComponent extends React.Component {
    render() {
        return (
            <div className="page" id="home-page">
                <SlideBar />
                <div id="content-container">
                    {this.props.content}
                </div>
            </div>
        )
    }
}
