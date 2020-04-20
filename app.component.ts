import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  IDataOptions, PivotView, FieldListService, CalculatedFieldService,
  ToolbarService, ConditionalFormattingService, ToolbarItems, DisplayOption, IDataSet
} from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
enableRipple(false);

/**
 * Pivot Table Toolbar Sample
 */
declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');
let isSaveReportInitial: boolean = false;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['app.component.css'],
  providers: [CalculatedFieldService, ToolbarService, ConditionalFormattingService, FieldListService]
})
export class AppComponent {
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  public toolbarOptions: ToolbarItems[];
  public chartSettings: ChartSettings;
  public displayOption: DisplayOption;

  @ViewChild('pivotview', { static: false })
  public pivotObj: PivotView;

  saveReport(args: any) {
    if (isSaveReportInitial) {
      let reports = [];
      let isSaved: boolean = false;
      if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
        reports = JSON.parse(localStorage.pivotviewReports);
      }
      if (args.report && args.reportName && args.reportName !== '') {
        reports.map(function (item: any): any {
          if (args.reportName === item.reportName) {
            item.report = args.report; isSaved = true;
          }
        });
        if (!isSaved) {
          reports.push(args);
        }
        localStorage.pivotviewReports = JSON.stringify(reports);
      }
    }
    else {
      (this.pivotObj.toolbarModule as any).currentReport = "";
      isSaveReportInitial = true;
    }
  }
  fetchReport(args: any) {
    let reportCollection: string[] = [];
    let reeportList: string[] = [];
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reportCollection = JSON.parse(localStorage.pivotviewReports);
    }
    reportCollection.map(function (item: any): void { reeportList.push(item.reportName); });
    args.reportName = reeportList;
  }
  loadReport(args: any) {
    let reportCollection: string[] = [];
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reportCollection = JSON.parse(localStorage.pivotviewReports);
    }
    reportCollection.map(function (item: any): void {
      if (args.reportName === item.reportName) {
        args.report = item.report;
      }
    });
    if (args.report) {
      this.pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
    }
  }
  removeReport(args: any) {
    let reportCollection: any[] = [];
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reportCollection = JSON.parse(localStorage.pivotviewReports);
    }
    for (let i: number = 0; i < reportCollection.length; i++) {
      if (reportCollection[i].reportName === args.reportName) {
        reportCollection.splice(i, 1);
      }
    }
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      localStorage.pivotviewReports = JSON.stringify(reportCollection);
    }
  }
  renameReport(args: any) {
    let reportCollection: string[] = [];
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      reportCollection = JSON.parse(localStorage.pivotviewReports);
    }
    reportCollection.map(function (item: any): any { if (args.reportName === item.reportName) { item.reportName = args.rename; } });
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
      localStorage.pivotviewReports = JSON.stringify(reportCollection);
    }
  }
  newReport() {
    this.pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
  }
  beforeToolbarRender(args: any) {
    args.customToolbar.splice(6, 0, {
      type: 'Separator'
    });
    args.customToolbar.splice(9, 0, {
      type: 'Separator'
    });
  }

  ngOnInit(): void {
    this.chartSettings = {
      title: 'Sales Analysis',
      chartSeries: { type: 'Column' },
    } as ChartSettings;

    this.displayOption = { view: 'Both' } as DisplayOption;
    this.gridSettings = {
      columnWidth: 140
    } as GridSettings;

    this.toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
      'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'] as ToolbarItems[];

    this.dataSourceSettings = {
      enableSorting: true,
      columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
      rows: [{ name: 'Country' }, { name: 'Products' }],
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      dataSource: data,
      expandAll: false,
      values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
      { name: 'Amount', caption: 'Sold Amount' }],
      filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
    };
  }
}