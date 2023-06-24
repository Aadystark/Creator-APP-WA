import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { SpCreatorServiceService } from '../services/sp-creator-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { MatSelect, MatSelectChange, MatSelectConfig } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { SPCreatorProperties } from '../variableClass/properties';
import { pairwise, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-sp-creator-home',
  templateUrl: './sp-creator-home.component.html',
  styleUrls: ['./sp-creator-home.component.css']
})
export class SpCreatorHomeComponent extends SPCreatorProperties implements OnInit {

  @ViewChild('table') table: any;
  paramForm: FormGroup = new FormGroup({
    paramName: new FormControl('', Validators.required),
    paramType: new FormControl('', Validators.required),
    paramLength: new FormControl(0),
  });

  selectInnerForm: FormGroup = new FormGroup({
    tableName: new FormControl(''),
    innerJoinName: new FormControl(''),
  });

  displayedColumns: string[] = ['paramName', 'paramType', 'paramLength', 'actions'];
  displayedWhereColumns: string[] = ['tableRef', 'condition', 'comparator', 'value', 'actions'];

  constructor(private spService: SpCreatorServiceService, private _formBuilder: FormBuilder, private sanitized: DomSanitizer) {
      super();
  }

  ngOnInit(): void {
    this.j++;
    this.i++;
    this.spService.getTableData().subscribe(res => {
      this.ddData = res;
    });
    this.spService.getData().subscribe(res => console.log(res));
    this.spService.getSPData().subscribe(res => this.spdDData = res);
    this.outPutDataFormat()
  }

  radioChange(event: MatRadioChange) {
    this.spService.getSPData().subscribe(res => this.spdDData = res);
    this.scriptType = event.value;
    this.outPutDataFormat();
  }

  selectInputChange() {
    this.selectInnerForm.valueChanges.pipe(startWith(this.selectInnerForm.value), pairwise()).subscribe(
      ([old, value]: any) => {
        this.historicalData = old;
      })
  }

  onDropdownChange(event: MatSelectChange) {
    this.selectInputChange()
    this.selectInnerForm.controls['innerJoinName'].reset();
    this.tabRefData = [];
    if (event.value != '') {
      this.onTableDDReset()
      this.columnR = this.ddData.filter((x: any) => x.tableName == event.value)
      var ddpData = { id: 'DEF', tableName: this.columnR[0].tableName, data: this.columnR[0] }

      this.innerddData = this.ddData.filter((x: any) => x.tableName != ddpData.tableName)
      var index
      if (this.tabRefData.filter((x: any) => x.tableName == ddpData.tableName).length > 0) {
        this.tabRefData.filter((x: any, i: number) => { if (x.tableName == ddpData.tableName) { index = i; } })
        this.tabRefData.push(ddpData)
        this.tabRefData.splice(index, 1);
      }
      else {
        if (this.tabRefData.length > 0) {
          this.tabRefData.filter((x: any, i: number) => { if (x.tableName == this.historicalData.tableName) { index = i; } })
          if (index) {
            this.tabRefData.splice(index, 1);
          }
        }
        this.tabRefData.push(ddpData)
      }

      this.tableName = event.value
      if (this.innerJoinName != '') {
        this.innerJoinOutput = `DEF${this.j}
      INNER JOIN ${this.innerJoinName} REF${this.i} 
      ON REF${this.i}.${this.columnL[0].tablePKName} = DEF${this.j}.${this.columnR[0].tablePKName}`
      }
    }
    else {
      this.tableName = '';
      this.innerJoinName = '';
      this.innerJoinOutput = '';
    }
    this.outPutDataFormat();
  }

  onDropdownChangeforInnerJoin(event: MatSelectChange) {
    this.selectInputChange()
    if (event.value != '') {
      this.onTableDDReset()
      this.innerJoinName = event.value;
      this.columnL = this.ddData.filter((x: any) => x.tableName == event.value)
      var ddpData = { id: 'REF', tableName: this.columnL[0].tableName, data: this.columnL[0] }
      var index
      if (this.tabRefData.filter((x: any) => x.tableName == ddpData.tableName).length > 0) {
        this.tabRefData.filter((x: any, i: number) => { if (x.tableName == ddpData.tableName) { index = i; } })
        this.tabRefData.push(ddpData)
        this.tabRefData.splice(index, 1);
      }
      else {
        this.tabRefData.filter((x: any, i: number) => { if (x.tableName == this.historicalData.innerJoinName) { index = i; } })
        this.tabRefData.push(ddpData)
        if (index) {
          this.tabRefData.splice(index, 1);
        }
      }

      this.innerJoinOutput = `DEF${this.j}
      INNER JOIN ${this.innerJoinName} REF${this.i} 
      ON REF${this.i}.${this.columnL[0].tablePKName} = DEF${this.j}.${this.columnR[0].tablePKName} `
      this.whereConditionFormat();
    }
    else {
      this.innerJoinOutput = ''
      this.whereConditionFormat();
    }
    this.outPutDataFormat();
  }

  onDropdownChangeforTableRef(event: MatSelectChange) {
    debugger;
    this.tableColumns = this.tabRefData.filter((x: any)=> x.id == event.value)[0].data.tableColumns.split(', ') 
    this.tabRefName = event.value;
    this.whereConditionFormat();
    this.outPutDataFormat();
  }

  onDropdownChangeforWhere(event: MatSelectChange) {
    this.whereName = event.value;
    this.whereConditionFormat();
    this.outPutDataFormat();

  }

  onDropdownChangeforComparators(event: MatSelectChange) {
    this.comparatorSelected = event.value;
    this.whereConditionFormat();
    this.outPutDataFormat();
  }

  onDropdownChangeforAddCond(event: MatSelectChange) {
    this.addCondition = event.value;
    this.whereConditionFormat();
    this.outPutDataFormat();
  }

  
  comparConditioner(value: string) : string {
    if (this.comparatorSelected == 'IN' || this.comparatorSelected == 'NOT IN' || this.comparatorSelected == 'BETWEEN' || this.comparatorSelected == 'NOT BETWEEN') {
      return `(${value})`
    }
    else if (this.comparatorSelected == 'LIKE') {
      return `%${value}%`
    }
    else {
      return value;
    }
  }

  onSPDDChange(event: any) {
    this.spName = event.value
    this.outPutDataFormat();
  }

  addtoGrid() {
    if (this.paramForm.valid) {
      const newUsersArray = this.userData;
      newUsersArray.push(this.paramForm.value)
      this.dataSource = [...newUsersArray];
      if (this.paramForm.controls['paramType'].value == 'VARCHAR') {
        this.parameters.push(`@${this.paramForm.controls['paramName'].value} ${this.paramForm.controls['paramType'].value} (${this.paramForm.controls['paramLength'].value})`)
      }
      else {
        this.parameters.push(`@${this.paramForm.controls['paramName'].value} ${this.paramForm.controls['paramType'].value}`)
      }
      this.outPutDataFormat();
    }
  }
  addWheretoGrid() {
    const newWhereUsersArray = this.userWhereData;
    newWhereUsersArray.push({ tableRef: this.tabRefName, condition: this.whereName, comparator: this.comparatorSelected, value: this.conditionValue })
    this.whereDataSource = [...newWhereUsersArray];
    if (this.whereList.length > 0) {
      this.whereList.push(`${this.addCondition} ${this.whereCondition}`)
    }
    else {
      this.whereList.push(this.whereCondition)
    }
    this.whereConditionFormat();
    this.outPutDataFormat();
  }

  delete(index: any) {
    debugger;
    let i: number = this.dataSource.indexOf(index);
    const newUsersArray = this.userData;
    newUsersArray.splice(i, 1);
    this.parameters.splice(i, 1);
    this.dataSource = [...newUsersArray];
    this.outPutDataFormat();
  }

  deleteWhere(index: any) {
    debugger;
    let i: number = this.whereDataSource.indexOf(index);
    const newWhereUsersArray = this.userWhereData;
    newWhereUsersArray.splice(i, 1);
    this.whereList.splice(i, 1);
    this.whereDataSource = [...newWhereUsersArray];
    this.whereConditionFormat();
    this.outPutDataFormat();
  }

  onTableDDReset() {
    this.whereList = [];
    this.userWhereData = [];
    this.whereDataSource = [];
    this.tableColumns = [];
    this.whereConditionFormat()
    this.outPutDataFormat();
  }

  public onspNameValueChange(): void {
    this.outPutDataFormat();
  }
  public onConditionValueChange(): void {
    this.whereConditionFormat();
    this.outPutDataFormat();
  }

  outPutDataFormat() {
    this.outPutData = `
      ${this.scriptType} PROCEDURE ${this.spName}
      ${this.parameters.join(', ')}

      AS
      BEGIN
      SET NOCOUNT ON;

      SELECT * FROM ${this.tableName} ${this.innerJoinOutput}
      ${this.whereList.join(' ') }

      END` 
  }

  whereConditionFormat() {
    if (this.innerJoinOutput != '') {
      this.whereCondition = `WHERE ${this.tabRefName}${this.j}.${this.whereName} ${this.comparatorSelected} ${this.comparConditioner(this.conditionValue)}`
    }
    else {
      this.whereCondition = `WHERE ${this.whereName} ${this.comparatorSelected} ${this.comparConditioner(this.conditionValue)}`
    }
  }

  submitSP() {
    var data = { sqlQuery: this.outPutData, spName: this.spName }
    console.log(data);
    this.spService.saveSPData(data).subscribe(res => {
      this.successMssg = res;
      setTimeout(() => {
        this.successMssg = ''
      }, 5000)
    });
  }

}
