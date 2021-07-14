import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployee extends Component {
    constructor(props){
        super(props)
        this.state = {
            // syntax to get id from the route
            id: this.props.match.params.id,
            employee: {}
        }
    }
    componentDidMount(){
        EmployeeService.getEmployeeByID(this.state.id).then((res) => {
            this.setState({employee: res.data});
        });
    }
    
    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                        <label >First Name: </label>
                        <h5>{this.state.employee.fName}</h5>
                        </div>
                        <div className="row">
                        <label>Last Name: </label>
                           <h5>{this.state.employee.lName}</h5>
                        </div>
                        <div className="row">
                        <label>Email: </label>
                           <h5>{this.state.employee.email}</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployee;