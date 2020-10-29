import React from "react"
import { HashRouter as Router, Route , Link, Switch} from 'react-router-dom'
import Home from './Home'
import SingleUser from './SingleUser'
import Login from './FormikLogin'
import ItemList from './ItemList';
import Footer from './Footer'

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
						<div className="shop-nav">
							<img className="icon" src='https://findicons.com/files/icons/2799/flat_icons/128/teachers_day_shield.png'/>
							<Link className="navbar" to = "/">HOME</Link>
							<Link className="navbar" to = "/items">SHOP</Link>
							<Link className="navbar" to = "/items">ADMIN</Link>
						</div>
						<div class="search-container">
    						<form action="/">
								<input className="searchbar" type="text" placeholder="Search"></input>
								<button type="submit">Submit</button>
    						</form>
  						</div>
						<div className="account-nav">
							<Link className="navbar" to = {`/users/${this.state.userId}`}>MY ACCOUNT</Link>
							<Link className="navbar" to = "/login">LOGIN</Link>
							<Link className="navbar" to = "/login"><img className="cart" src='https://findicons.com/files/icons/1579/devine/48/cart.png'/></Link>
						</div>
					</nav>
					<main>
					<Switch>
						<Route path = "/" exact component = { Home } />
						<Route path = "/items" component = { ItemList } />
						<Route path = {`/users/${this.state.userId}`} exact component = { SingleUser } />
						<Route path = '/login' component = { Login } />
					</Switch>
					</main>
					<Footer />
				</div>
			</Router>
		)
	}
}


/*
<Route path = "/items" exact component = { ItemList } />
<Route path = "/items/:id" exact component = { SingleItem } />
*/
