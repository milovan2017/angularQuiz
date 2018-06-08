import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { DataService } from '../data.service';

@Component({
 selector: 'app-results',
 templateUrl: './results.component.html',
 styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges, OnInit {
right: number;
wrong: number;
ended: boolean;
sum: number = 0;
endPercent: number = 0;
tickPercent: number = 0;
percentShow: string = "";

 constructor(private DataService: DataService) { }

 ngOnChanges(changes: SimpleChanges) {
    console.log(this.DataService)
   if (this.DataService.ended) {
      this.right = this.DataService.right;
      this.wrong = this.DataService.wrong;
      this.ended = this.DataService.ended;
   let self = this;
   this.sum = this.right + this.wrong;
      if (this.right > 0) {
         this.endPercent = +((this.right/this.sum)*100).toFixed(2);
          let loop = setInterval(function(){
            if (self.tickPercent < self.endPercent) {
                self.tickPercent +=0.1;
                self.percentShow = self.tickPercent.toFixed(2) + "%";
                self.tickPercent = Math.round(self.tickPercent * 100) / 100;
            }
         },10)
      } else {
        this.endPercent = 0;
      }
   }


 }
 ngOnInit() {

 }

}
