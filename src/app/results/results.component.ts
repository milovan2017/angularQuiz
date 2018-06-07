import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
 selector: 'app-results',
 templateUrl: './results.component.html',
 styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges, OnInit {
@Input() right: number;
@Input() wrong: number;
@Input() ended: number;
sum:number=0
endPercent : number = 0;
tickPercent : number = 0;
percentShow : string = "";
 constructor() { }
 calcPercent(){

 }
 ngOnChanges(changes: SimpleChanges) {
   if (this.ended) {
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
