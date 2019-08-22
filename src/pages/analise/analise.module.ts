import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnalisePage } from './analise';

@NgModule({
  declarations: [
    AnalisePage,
  ],
  imports: [
    IonicPageModule.forChild(AnalisePage),
  ],
})
export class AnalisePageModule {}
