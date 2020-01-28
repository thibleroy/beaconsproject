import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentPageRoutingModule } from './content-routing.module';

import { ContentPage } from './content.page';

import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPageRoutingModule,
    MarkdownModule.forRoot()
  ],
  declarations: [ContentPage]
})
export class ContentPageModule {}
