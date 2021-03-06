// Logout Components
import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../action/authAction'; // import logout to handle logout user
import PropTypes from 'prop-types';

export class Logout extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired
	}

	render() {
		return (
		  <Fragment>
		    <NavLink onClick={this.props.logout} href="#">
		      Logout
		    </NavLink>
		  </Fragment>
		)
	}
}

export default connect(null, { logout })(Logout);