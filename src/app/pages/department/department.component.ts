import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  masterSrc = inject(MasterService)
  deptList: any[] = []

  newDeptObj: any = {
    "deptId": 0,
    "deptName": "",
    "createdDate": ""
  }


  ngOnInit(): void {
    this.getDept();
  }

  getDept() {
    this.masterSrc.getAllDept().subscribe((res: any) => {
      this.deptList = res.data;
    })
  }

  saveDept() {
    this.masterSrc.createNewDept(this.newDeptObj).subscribe((res: any) => {
      if (res.result) {
        alert("Department Created Successfully")
        this.getDept();
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data: any) {
       this.newDeptObj = data;
  }


  updateDept() {
    this.masterSrc.updateDept(this.newDeptObj).subscribe((res: any) => {
      if (res.result) {
        alert("Department Updated Successfully")
        this.getDept();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure want Delete");
    if(isDelete) {
      this.masterSrc.deleteDeptById(id).subscribe((res:any)=>{
        // debugger;
        if(res.result) {
          alert("Dept Deleted Success");
          this.getDept();
        } else {
          alert(res.message)
        }
      }) 
    }
  }
}
