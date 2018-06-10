import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import WeatherWidget from './../components/WeatherWidget';
const App = () => (
    <Router>
        <div>
            <Route exact path='/' component={WeatherWidget}/>
        </div>
    </Router>
)

export default App