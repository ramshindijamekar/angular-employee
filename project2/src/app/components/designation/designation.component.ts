import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel, IDesignation } from '../../model/interface/role';
import { error } from 'console';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit{


designationList: IDesignation[] = [];
isloader: Boolean = true;
masterService = inject(MasterService);

ngOnInit(): void {
  this.masterService.getDesignations().subscribe((result:APIResponseModel)=>{
      this.designationList = result.data;
      this.isloader = false;
  },error=>{
    alert("API error/ Network error")
    this.isloader = false;
  })
}
}
