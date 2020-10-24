import React from "react"
import { HashRouter as Router, Route , Link, Switch} from 'react-router-dom'
import Home from './Home'

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
					</nav>
					<main>
					<Switch>
						<Route path = "/" exact component = { Home } />
          				
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
<Route path = {`/users/${this.state.userId}`} exact component = { SingleUser } />
*/