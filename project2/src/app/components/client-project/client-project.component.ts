import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UpperCasePipe], // Include CommonModule for *ngFor and *ngIf
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.css']
})
export class ClientProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("YO"),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl("")
  });



  clientSrv= inject(ClientService);
  employeeList: Employee[]=[];
  clientList:Client[]=[];
  projectList = signal<ClientProject[]>([]);
  

  ngOnInit(): void {
    this.getAllClient();
    this.getAllEmployee();
  }

  getAllEmployee(): void {
    this.clientSrv.getAllEmployee().subscribe((res:APIResponseModel)=>{
      this.employeeList = res.data;
    })
  }
  getAllClient(): void {
    this.clientSrv.getAllClients().subscribe((res:APIResponseModel)=>{
      this.clientList = res.data;
    })
  }

  getAllClientProjects(): void {
    this.clientSrv.getAllClientProjects().subscribe((res:APIResponseModel)=>{
      this.clientList = res.data;
    })
  }




  OnSaveProject(): void{
    const formValue = this.projectForm.value;
    debugger;
    this.clientSrv.addClientProjectUpdate(formValue).subscribe((res:APIResponseModel)=>{
      if (res.result){
        alert('Project Created Suscessfully')
      } else{
        alert(res.message)
      }
    })
  }

}
