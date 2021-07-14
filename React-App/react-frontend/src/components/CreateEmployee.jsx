import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Step 2 this retrieves the id from the URL
            id: this.props.match.params.id,
            //
            first_name: '',
            last_name: '',
            email: ''
        }
        this.changeFNameHandler = this.changeFNameHandler.bind(this);
        this.changeLNameHandler = this.changeLNameHandler.bind(this);
        //this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    //Step 3
    componentDidMount() {
        // Step 4
        if(this.state.id == -1){
            return;
        }
        else{
            EmployeeService.getEmployeeByID(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({first_name: employee.fName,
                    last_name: employee.lName,
                    email: employee.email
                });
            });
        }
    }

    //event handler
    changeFNameHandler = (event) => {
        this.setState({first_name: event.target.value});
    }
    changeLNameHandler = (event) => {
        this.setState({last_name: event.target.value});
    }
    changeEmailHandler = (event) => {
        this.setState ({email: event.target.value});
    }
    saveEmployee = (e) => {
        e.preventDefault()
        let employee = {fName: this.state.first_name, lName: this.state.last_name, email: this.state.email};
        console.log('employee =>' + JSON.stringify(employee));
        //step 5
        if(this.state.id == -1){
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        }
        else{
            EmployeeService.updateEmployee(this.state.id, employee).then(res => {
                this.props.history.push('/employees');
            });
        }
    }
    getTitle() {
        if(this.state.id == -1){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        } 
    }
    render() {
        return (
            <div>
                <div className="container">
                    
                     <div className="row">
                         
                        <div className="card col-12 col-md-6 offset-md-4 offset-md-4">
                            {/* this is for the update / add employee code */}
                         {
                             this.getTitle()
                         }
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
                                        <div className="form-group">
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Email Address"
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                        </div>
                                        
                                        <button className="btn btn-info btn-block" type="submit" onClick={this.saveEmployee}>Submit</button>
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

export default CreateEmployee;