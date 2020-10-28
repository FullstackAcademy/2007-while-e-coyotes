import React from "react"
import { HashRouter as Router, Route , Link, Switch} from 'react-router-dom'
import Home from './Home'
import SingleUser from './SingleUser'
import Login from './FormikLogin'
import ItemList from './ItemList';

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
			<Router>
				<div>
					<nav>
						<Link className="navbar" to = "/">Home</Link>
						<Link className="navbar" to = {`/users/${this.state.userId}`}>View Profile</Link>
						<Link className="navbar" to = "/items">View Store</Link>
						<Link className="navbar" to = "/login">Login</Link>
					</nav>
					<main>
					<Switch>
						<Route path = "/" exact component = { Home } />
						<Route path = "/items" component = { ItemList } />
						<Route path = {`/users/${this.state.userId}`} exact component = { SingleUser } />
						<Route path = '/login' component = { Login } />
					</Switch>
					</main>
				</div>
			</Router>
		)
	}
}


/*
<Route path = "/items" exact component = { ItemList } />
<Route path = "/items/:id" exact component = { SingleItem } />
*/
