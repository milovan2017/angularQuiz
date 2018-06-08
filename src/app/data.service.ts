import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class DataService {
   private ended = new BehaviorSubject
<boolean>(false);
   private right = new BehaviorSubject
   <number>(0);
   private wrong = new BehaviorSubject
      <number>(0);

   cast = this.ended.asObservable();
   castRight = this.right.asObservable();
   castWrong = this.wrong.asObservable();

   editEnded(ended){
      console.log('edit', ended)
      this.ended.next(ended);
   }

   editRight(right){
      this.right.next(right);
   }

   editWrong(wrong){
      this.wrong.next(wrong);
   }

}
