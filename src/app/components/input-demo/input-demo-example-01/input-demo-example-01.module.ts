import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '@alyle/ui';
import { LyInputModule } from '@alyle/ui/input';

import { InputDemoExample01Component } from './input-demo-example-01.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    LyInputModule
  ],
  exports: [InputDemoExample01Component],
  declarations: [InputDemoExample01Component]
})
export class InputDemoExample01Module { }
