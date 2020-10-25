import React from "react"
import { HashRouter as Router, Route , Link, Switch} from 'react-router-dom'
import Home from './Home'
import SingleUser from './SingleUser'
import FormikLogin from './FormikLogin'

export default class Routes extends React.Component {
	constructor() {
		super()
		this.state = {
			userId: 0
		}
	}

	componentDidMount() {
		this.setState({userId: 1})
	}

	render(){
		return (
			<FormikLogin />
		)
	}
}


/*
<Route path = "/items" exact component = { ItemList } />	
<Route path = "/items/:id" exact component = { SingleItem } />
*/