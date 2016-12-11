/**
 * Created by ad on 11.12.2016.
 */
import React from 'react';
import { Route, IndexRoute }  from 'react-router';
import App from './components/App';
import Counter from './components/counter';


export default (
        <Route component={App} path='/'>
            <Route path="counter" component={Counter} />
        </Route>

)