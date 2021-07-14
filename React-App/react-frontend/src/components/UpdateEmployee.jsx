import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployee extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            first_name: '',
            last_name: '',
            email: ''
        }
        this.changeFNameHandler = this.changeFNameHandler.bind(this);
        this.changeLNameHandler = this.changeLNameHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

     //event handler
    componentDidMount() {
        EmployeeService.getEmployeeByID(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({first_name: employee.fName,
                last_name: employee.lName,
                email: employee.email
            });
        });
    }

     changeFNameHandler = (event) => {
        this.setState({first_name: event.target.value});
    }
    changeLNameHandler = (event) => {
        this.setState({last_name: event.target.value});
    }
    changeEmailHandler = (event) => {
        this.setState ({email: event.target.value});
    }
    updateEmployee = (e) => {
        e.preventDefault()
        let employee = {fName: this.state.first_name, lName: this.state.last_name, email: this.state.email};
        console.log('employee =>' + JSON.stringify(employee));

        EmployeeService.updateEmployee(this.state.id, employee).then(res => {
            this.props.history.push('/employees');
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br />
                     <div className="row">
                 
                        <div className="card col-12 col-md-6 offset-md-4 offset-md-4">
                            <h3 className="text-center">Update Employees</h3>
                            <div className="panel panel-default">

                                <div className="panel-body">
                                    <form role="form">
                                        <div className="row">
                                            <div className="col-6 col-md-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text" name="first_name" id="first_name" className="form-control" placeholder="First Name"
                                                    value={this.state.first_name} onChange={this.changeFNameHandler} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-md-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text" name="last_name" id="last_name" className="form-control" placeholder="Last Name"
                                                    value={this.state.last_name} onChange={this.changeLNameHandler} />
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Email Address"
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-5">

                                            </div>
                                            <div className="col-6">
                                            <button className="btn btn-info btn-block" type="submit" onClick={this.updateEmployee}>Save</button>
                                            </div>
                                            <div className="col-1"></div>
                                        </div>
                                        
                                    </form>
			    	            </div>

	    		            </div>
    		            </div>
    	            </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployee;