import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   oblast = "a";
   ponudjene = [];
   tacno = [];
   vreme = 0;
   choosen = [];
   dropDownClicked = false;
   search = '';
   searchedArr = [];
   dropDownClick() {
      this.dropDownClicked =!this.dropDownClicked;
   }
   citySearch (){
      this.searchedArr = filterItems(this.search, this.ponudjene).splice(''); //ovde nastaviti, da se prikazuje searcheArr, a ne ponudjene
      console.log(this.searchedArr)
   function filterItems(query,arr) {
      return arr.filter(function(el) {
         return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
   })
}

   }
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('../assets/podaci.json').subscribe(data => {
      this.oblast = data.oblast;
      this.ponudjene = data.ponudjene.splice('');
      this.tacno = data.tacno.splice('');
      this.vreme = data.vreme;
    });
  }
}
