/**
 * Created by ad on 11.12.2016.
 */
import React, { Component } from 'react';
import DevTools from './DevTools';

export default class App extends Component {


    render() {
        return (
            <div>
                React-Redux boilerplate
                {this.props.children}
                <DevTools />
            </div>

        );
    }
}

