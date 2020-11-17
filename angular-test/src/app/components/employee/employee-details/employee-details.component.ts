import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  currentEmployee = null;
  message = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getEmployee(this.route.snapshot.paramMap.get('id'));
  }

  getEmployee(id): void {
    this.employeeService.get(id)
      .subscribe(
        data => {
          this.currentEmployee = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentEmployee.title,
      description: this.currentEmployee.description,
      published: status
    };

    this.employeeService.update(this.currentEmployee.id, data)
      .subscribe(
        response => {
          this.currentEmployee.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateEmployee(): void {
    this.employeeService.update(this.currentEmployee.id, this.currentEmployee)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The employee was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/employees']);
        },
        error => {
          console.log(error);
        });
  }
}
