import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SentimentComponent } from '../sentiment/sentiment.component';

@NgModule({
  declarations: [SentimentComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class SentimentModule {}
