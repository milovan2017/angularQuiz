import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  right: number = 0;
  wrong: number = 0;
  ended: boolean = false;
}
