import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {

  mode:string = 'My Tickets';
  masterSrv = inject(MasterService)

  ticketList: any = [];
  loggedUserEmployeeId: any;



  ngOnInit(): void {
    const loggedUserData = localStorage.getItem('ticketUser')
    if(loggedUserData != null){
      const userData = JSON.parse(loggedUserData);
      this.loggedUserEmployeeId = userData.employeeId;
    }
    this.changeMode(this.mode);
  }

  changeMode(tab: string){
    this.mode= tab;
    if(this.mode == 'My Tickets' ) {
      this.masterSrv.getTicketsCreatedByLoggedEmp(this.loggedUserEmployeeId).subscribe((res:any)=>{
         this.ticketList = res.data;
      })
    } else{
      this.masterSrv.getTicketAssignedToEmp(this.loggedUserEmployeeId).subscribe((res:any)=>{
        this.ticketList = res.data;
     })
    }
  }

}
