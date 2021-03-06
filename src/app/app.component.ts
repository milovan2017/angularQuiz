import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
   oblast: string = "";
   ponudjene: string[] = [];
   tacno: string[] = [];
   vreme: number = 0;
   vremeSec:string = "";
   choosen: string[] = [];
   search: string = '';
   searchedArr: string[] = [];
   clickedArr: string[] = [];
   right: number = 0;
   wrong: number = 0;
   ended:boolean;

   checkAnswers(){
      for (let i = 0; i < this.clickedArr.length; i++) {
         if (this.tacno.includes(this.clickedArr[i])) {
            this.right +=1 ;
            this.DataService.editRight(this.right);
         } else{
            this.wrong +=1 ;
            this.DataService.editWrong(this.wrong);
         }
      }
      this.DataService.editEnded(true);
   }

   startTime(){
      var self = this;
      var timeSec = self.vreme;
      var loop = setInterval(timeF, 1000);
      document.getElementById('src').focus();
      function timeF() {
         if (timeSec > 0) {
            var min = Math.floor(timeSec / 60),
            sec = timeSec - min * 60;
            timeSec--;
            self.vremeSec = `VREME: ${min}m:${sec}s`;
         } else {
            clearInterval(loop);
            self.vremeSec = `VREME: 0m:0s`;
            self.checkAnswers();
         }
      }
   }

   filterItems(query, arr){
      return arr.filter(function(el) {
         return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
   })
   }
   citySearch ($event){
      if (this.search.length > 0 && this.search != " ") {
            if ($event.keyCode == 13) {
               this.addCity();
               this.search = "";
            } else {
               this.searchedArr = this.filterItems(this.search, this.ponudjene);
            }
      }  else {
         this.searchedArr = [];
      }
   }
   deleteCity(item, i) {
      this.searchedArr.push(item);
      this.ponudjene.push(item);
      this.searchedArr.sort();
      this.ponudjene.sort();
      this.clickedArr.splice(i,1);
   }
   addCity(){
      if (this.searchedArr.length > 0 && this.search != "") {
         let a = this.searchedArr[0];
         this.clickedArr.push(this.searchedArr[0]);
         this.searchedArr = this.searchedArr.filter(city => city != a);
         this.ponudjene = this.ponudjene.filter(city => city != a);
         document.getElementById('src').focus();
         this.search = "";
      }
   }
   clickCity(item,i){
      document.getElementById('src').focus();
      this.searchedArr = this.searchedArr.filter(city => city != item);
      this.ponudjene = this.ponudjene.filter(city => city != item);
      this.search = "";
      if (this.clickedArr.length > 0) {
         if (!this.clickedArr.includes(item)) {
            this.clickedArr.push(item)
         }
      } else {
         this.clickedArr.push(item)
      }
   }

 constructor(private http: HttpClient, private DataService: DataService) {}
 ngOnInit(): void {
   this.http.get('../assets/podaci.json').subscribe((data: any) => {
      this.oblast = data.oblast;
      this.ponudjene = data.ponudjene.slice();
      this.tacno = data.tacno.slice();
      this.vreme = data.vreme;
      this.startTime();
      this.DataService.cast.subscribe(ended=>this.ended=ended);
   });
 }
}
