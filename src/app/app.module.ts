import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ResultsComponent } from './results/results.component';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
 declarations: [
   AppComponent,
   ResultsComponent
 ],
 imports: [
   BrowserModule,
   HttpClientModule,
   FormsModule
 ],
 providers: [DataService],
 bootstrap: [AppComponent]
})
export class AppModule {

}
