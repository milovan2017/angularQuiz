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
percent : number = 0;
percentShow : string = "0%";
  constructor() { }
  calcPercent(){

 }
 ngOnChanges(changes: SimpleChanges) {
    //const name: SimpleChange = changes.name;
    if (this.ended) {
    this.sum = this.right + this.wrong;
      if (this.right > 0) {
          this.percent = +((this.right/this.sum)*100).toFixed(2);
          this.percentShow = this.percent + "%";
      } else {
        this.percent = 0;
      }
    }


  }
  ngOnInit() {
     console.log('init')

  }

}
