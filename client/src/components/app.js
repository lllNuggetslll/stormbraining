import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { receiveLogout } from '../actions/auth_actions';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object,
    receiveLogout: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.props.receiveLogout();
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <Link to="/" className="navbar-brand">Stormbraining</Link>
          <ul className="nav navbar-nav">
            <li className="nav-item"><Link to="/boards">Boards</Link></li>
            <li className="nav-item">
              <Link
                to="/login"
                onClick={this.onLogout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, { receiveLogout })(App);
