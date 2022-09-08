import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatSort, Sort, MatSortable } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatTableDataSource} from '@angular/material/table';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements AfterViewInit {
  title = 'angularTest_fiscon';

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  userForm = new FormGroup({
    name: new FormControl(''),
    tel: new FormControl(''),
  })

  position = 1;

  displayedColumns: string[] = ['position', 'name', 'tel']
  data = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatTable)
  table!: MatTable<User>;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.data.sort = this.sort;
  }

  AddUser(){
    let name = this.userForm.controls['name'].value;
    let tel = this.userForm.controls['tel'].value;

    ELEMENT_DATA.push({
      position: this.position,
      name: name || '',
      tel: tel || ''
    });
    this.position++;
    this.clearFields();
    this.renderData()
  }

  clearFields() {
    this.userForm.controls['name'].setValue("");
    this.userForm.controls['tel'].setValue("");
  }

  deleteLastData() {
    ELEMENT_DATA.pop();
    this.renderData()
  }

  renderData() {
    this.table.renderRows();
    this.sort.sort({ id: 'name', 'start': 'asc' } as MatSortable)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

interface User {
  position: number;
  name: string;
  tel: string;
}

const ELEMENT_DATA: User[] = []
