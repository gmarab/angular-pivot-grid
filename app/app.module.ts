import { CheckBoxAllModule, RadioButtonAllModule, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { PivotFieldListAllModule } from '@syncfusion/ej2-angular-pivotview';

import { PivotViewAllModule } from '@syncfusion/ej2-angular-pivotview';

import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
@NgModule({ declarations: [ AppComponent ], imports: [ CommonModule, HttpModule, ToolbarModule, PivotViewAllModule, PivotFieldListAllModule, BrowserModule, NumericTextBoxAllModule, ButtonAllModule, CheckBoxAllModule, RadioButtonAllModule], providers: [], bootstrap: [AppComponent]
})
export class AppModule { }
