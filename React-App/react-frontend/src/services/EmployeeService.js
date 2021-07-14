//this is a service class which invokes REST API calls
import axios from 'axios';
//this is REST endpoint URL or the base URL
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    //this method post the data to the database through the REST API 
    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }
    getEmployeeByID(employeeID) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeID);
    }
    updateEmployee(employeeID,employee) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeID, employee);
    }
    deleteEmployee(employeeID) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeID);
    }
}
export default new EmployeeService()  //exporting class object so that we can directly use the object of this class in another component

