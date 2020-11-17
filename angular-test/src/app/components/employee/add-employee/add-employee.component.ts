import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {response} from "express";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employee = {
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    title: '',
    phone: '',
    published: false
  };
  submitted = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  saveEmployee(): void {
    const data = {
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      age: this.employee.age,
      email: this.employee.email,
      title: this.employee.title,
      phone: this.employee.phone,

    };

    this.employeeService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      first_name: '',
      last_name: '',
      age: '',
      email: '',
      title: '',
      phone: '',
      published: false
    };
  }

}
