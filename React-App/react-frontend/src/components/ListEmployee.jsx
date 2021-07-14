import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
        //event handler in REACT
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }
    //this is best to make a REST API call whenever you want to make such calls 
    // this is executed whenever you load a page
    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }
    addEmployee() {
        // this history object contains all the history of the mapping that has taken place
        // and it passes the history to each of the router
        this.props.history.push('/add-employee/-1');
    }
    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`); //backstick is used to send the id to the path/URL
    }
    deleteEmployee(id) {
        //rest api call
        EmployeeService.deleteEmployee(id).then(res => {
            //filtering out the deleted employee from the employees array in the constructor
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <div className="col-10"><button style={{marginBottom: "10px"}} className="btn btn-secondary" onClick={this.addEmployee}>Add Employee</button>
                    </div>
                </div>
                <div className = "row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key = {employee.id}>
                                        <td> {employee.fName} </td>
                                        <td> {employee.lName} </td>
                                        <td> {employee.email} </td>
                                        <td>
                                            <button onClick = {() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.viewEmployee(employee.id)} className="btn btn-primary">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } 
}

export default ListEmployee;