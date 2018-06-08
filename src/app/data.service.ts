import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class DataService {
   private ended = new BehaviorSubject<boolean>(false);
   private right = new BehaviorSubject<number>(0);
   private wrong = new BehaviorSubject<number>(0);

   cast = this.ended.asObservable();
   cast = this.right.asObservable();
   cast = this.wrong.asObservable();

   editEnded(ended){
      this.ended = ended;
   }

   editWrong(wrong){
      this.wrong = wrong;
   }

   editRight(right){
      this.right = right;
   }

}
