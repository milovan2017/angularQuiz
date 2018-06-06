import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
   dropDownClicked: boolean = false;
   search: string = '';
   searchedArr: string[] = [];
   clickedArr: string[] = [];
   right: number = 0;
   wrong: number = 0;
   ended: boolean = false;
   checkAnswers(){
      for (let i = 0; i < this.clickedArr.length; i++) {
         if (this.tacno.includes(this.clickedArr[i])) {
            this.right+=1;
         } else{
            this.wrong+=1;
         }
      }
      this.ended = true;
      console.log(this.right, this.wrong)
   }

   startTime(){
      var self = this;
      var timeSec = self.vreme;
      var loop = setInterval(timeF, 100);
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

   dropDownClick() {
      this.dropDownClicked =!this.dropDownClicked;
   }
   citySearch (){
      this.searchedArr = filterItems(this.search, this.ponudjene).splice('');
   function filterItems(query,arr) {
      return arr.filter(function(el) {
         return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
   })
}
   }
   deleteCity(i) {
      this.clickedArr.splice(i,1);
   }
   clickCity(el){
      if (this.clickedArr.length < 4) {
         if (this.clickedArr.length > 0) {
           if (!this.clickedArr.includes(el.target.innerHTML)) {
               this.clickedArr.push(el.target.innerHTML)
           }
         } else {
           this.clickedArr.push(el.target.innerHTML)
         }
      } else {
         console.log('end')
      }
   }
 constructor(private http: HttpClient) {}
 ngOnInit(): void {
   this.http.get('../assets/podaci.json').subscribe((data: any) => {
      this.oblast = data.oblast;
      this.ponudjene = data.ponudjene.splice('');
      this.tacno = data.tacno.splice('');
      this.vreme = data.vreme;
      this.startTime();
   });
 }
}
