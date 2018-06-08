import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
 selector: 'app-results',
 templateUrl: './results.component.html',
 styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
right: number = 0;
wrong: number = 0;
ended: boolean;
sum: number = 0;
endPercent: number = 0;
tickPercent: number = 0;
percentShow: string = "";

 constructor(private DataService: DataService) { }
check(ended){
   if (ended) {
      this.ended = true;
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
   this.DataService.cast.subscribe(ended=>this.check(ended));
   this.DataService.castRight.subscribe(right=>this.right = right);
   this.DataService.castWrong.subscribe(wrong=>this.wrong = wrong);
   let self = this;
 }

}
