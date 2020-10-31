import React from "react"
import { connect } from 'react-redux';

import { HashRouter as Router, Route , Link, Switch} from 'react-router-dom'
import Home from './Home'
import SingleUser from './SingleUser'
import Login from './FormikLogin'
import ItemList from './ItemList';
import Footer from './Footer'
import SingleItem from './SingleItem'

class Routes extends React.Component {
	render(){
		const { user } = this.props;
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
						<div className="search-container">
    						<form action="/">
								<input className="searchbar" type="text" placeholder="Search"></input>
								<button type="submit">Submit</button>
    						</form>
  						</div>
						<div className="account-nav">
							{
								user.class !== 'guest' || <Link className="navbar" to = {`/users/${user.userId}`}>MY ACCOUNT</Link>
							}
							{
								user.class ==='guest' ?
								<Link className="navbar" to = "/login">LOGIN</Link> :
								<p>TK LOGOUT BUTTON</p>
							}
							<Link className="navbar" to = "/login"><img className="cart" src='https://findicons.com/files/icons/1579/devine/48/cart.png'/></Link>
						</div>
					</nav>
					<main>
					<Switch>
						<Route path = "/" exact component = { Home } />
						<Route path = "/items" exact component = { ItemList } />
						<Route path = "/items/:id" exact component = { SingleItem } />
						<Route path = {`/users/${user.userId}`} exact component = { SingleUser } />
						<Route path = '/login' component = { Login } />
					</Switch>
					</main>
					<Footer />
				</div>
			</Router>
		)
	}
}

const mapState = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapState)(Routes);
