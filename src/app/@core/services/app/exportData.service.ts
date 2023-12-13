import {Injectable} from "@angular/core";
import {saveAs} from 'file-saver';
import {WorkBook} from 'xlsx';
import {WorkSheet} from 'xlsx';
import {utils} from 'xlsx';
import {write} from 'xlsx';

@Injectable()

export class ExportDataService {

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  constructor() {
  }

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: WorkSheet = utils.json_to_sheet(jsonData);
    const wb: WorkBook = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer: any = write(wb, {bookType: 'xlsx', type: 'array'});
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    saveAs(data, fileName + this.fileExtension);
  }
}
