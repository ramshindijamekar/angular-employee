import { HttpClient } from '@angular/common/http';
import { Component , inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { APIResponseModel, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{

  roleList : IRole [] = [];
  isloader : Boolean = true;
  http = inject(HttpClient);




ngOnInit(): void {
  this.GetAllRoles()
  this.isloader = false;
  
}  

GetAllRoles() {
  this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res:APIResponseModel)=>{
    this.roleList = res.data;
  })

}















  //   firstname: string = "Angular";
  // angularVersion = "version 18";
  // version: number = 18;
  // isActive : boolean = false;
  // currentDate : Date = new Date();
  // inputType : string = "checkbox";
  // selectedState: string = '' ;

  // showAlert () {
  //   alert('Yo')

  // }

  // showMessage(message: string) {
  //   alert(message)
  // }

}
