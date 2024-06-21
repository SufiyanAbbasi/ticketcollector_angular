import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit {
  masterSrv = inject(MasterService);
  deptList: any[] = [];
  pCategoryList: any[] = [];
  cCategoryList: any[] = [];
  filterCategory: any[] = [];

  selectPCategory: string = "";

  newticketObj: any = {    
      "employeeId": 0,
      "severity": "",
      "childCategoryId": 0,
      "deptId": 0,
      "requestDetails": ""    
  }

  ngOnInit(): void {
    const loggedUserData = localStorage.getItem('ticketUser')
    if(loggedUserData != null){
      const userData = JSON.parse(loggedUserData);
      this.newticketObj.employeeId = userData.employeeId;
    }
    this.getDept();
    this.getpCategory();
    this.getCCategory();
  }

  getDept() {
    this.masterSrv.getAllDept().subscribe((res: any) => {
      this.deptList = res.data;
    })
  }
  getpCategory() {
    this.masterSrv.getAllpCategory().subscribe((res: any) => {
      this.pCategoryList = res.data;
    })
  }
  getCCategory() {
    this.masterSrv.getAllCCategory().subscribe((res: any) => {
      this.cCategoryList = res.data;
    })
  }

  onCategoryChange() {
    this.filterCategory = this.cCategoryList.filter(x => x.parentCategoryName == this.selectPCategory )
  }

  // onCreateTicket(){
  //   this.masterSrv.newTicket(this.newticketObj).subscribe((res:any)=>{
  //     if(res.result){
  //       alert("Ticket Created Successfully!")
  //     }else{
  //       alert(res.message)
  //     }
  //   })
  // }
  onCreateTicket() {
    // Ensure childCategoryId is an array
    this.newticketObj.childCategoryId = Array.isArray(this.newticketObj.childCategoryId) ? this.newticketObj.childCategoryId : [this.newticketObj.childCategoryId];
  
    console.log('Creating ticket with the following data:', this.newticketObj); // Log the payload
  
    this.masterSrv.newTicket(this.newticketObj).subscribe(
      (res: any) => {
        if (res.result) {
          alert("Ticket Created Successfully!");
        } else {
          alert(res.message);
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating ticket:', error);
        console.error('Error details:', error.error);
        alert(`Error: ${error.message}`);
      }
    );
  }
  
  

}
