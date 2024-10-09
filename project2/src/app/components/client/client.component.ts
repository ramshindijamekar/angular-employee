import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../model/class/client';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ClientComponent, FormsModule,UpperCasePipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clientobj: Client = new Client();
  clientList: Client[] = [];

  firstName = signal('yo');

  clientService = inject(ClientService);

  currentDate:Date = new Date();

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res:APIResponseModel)=> {
      this.clientList = res.data;
    })
  }

  onSaveClient() {
    debugger;
    this.clientService.addUpdate(this.clientobj).subscribe((res:APIResponseModel)=>{
      if(res.result) {
        alert("Client crated successfully");
        this.loadClient();
      } else{
        alert(res.message);
      }
    })
  }

  onEdit(data: Client) {
    this.clientobj = data;
  }

  onDelete(id: number) {
    const isdelete = confirm("you sure about deleting!")
    if(isdelete){
      this.clientService.deleteClientById(id).subscribe((res:APIResponseModel)=>{
        if(res.result) {
          alert("Client deleted successfully");
          this.loadClient();
        } else{
          alert(res.message);
        }
      })
    }

  }
}
