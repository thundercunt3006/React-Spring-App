import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    listEmployee() {
        this.props.history.push('/employees');
    }
    render() {
        return (
            <div>
                <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Employee Management System</a>
                    <a className="navbar-brand" href="/employees">Employee List</a>
                </nav>
                </header>
            </div>
        );
    }
}

export default Header;