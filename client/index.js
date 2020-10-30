import React from "react"
import ReactDOM from "react-dom"
import Routes from "./components/Routes"
import {Provider} from 'react-redux'
import store from './store/index'
import CookieProvider from './components/CookieProvider'
import './sass/styles.scss'

ReactDOM.render(
    <Provider store={store}>
            <CookieProvider />
            <Routes />
    </Provider>,
    document.getElementById('root')
)
