package com.intelllij.springMVC.model;

import javax.persistence.*;

@Entity
@Table(name = "employees")

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "First_name")
    private String fName;
    @Column(name = "Last_name")
    private String lName;
    @Column(name = "Email")
    private String email;

    public Employee() {

    }
    public Employee(String fName, String lName, String email) {
        super();
        this.fName = fName;
        this.lName = lName;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
