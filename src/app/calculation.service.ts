import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CalculationService {
  private _accumulator: number;
  private get accumulator(): number {
    return this._accumulator;
  }
  private set accumulator(value: number) {
    this._accumulator = value;
  }

  private _regB: number;
  private get regB(): number {
    return this._regB;
  }
  private set regB(value: number) {
    this._regB = value;
  }

  private _operator: string;
  private get operator(): string {
    return this._operator;
  }
  private set operator(value: string) {
    this._operator = value;
  }

  public onResultChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private newNo$ = false;

  constructor() {
    this.reset();
  }

  reset() {

    this.regB = undefined;
    this.operator = undefined;
    this.newNo$ = false;
    this.accumulator = 0;

    this.onResultChanged.next(this.accumulator);
  }

  calculate(a: number, b: number, op: string) {
    switch (op) {
      case 'plus': {
        return a + b;
      }
      case 'minus': {
        return a - b;
      }
      case 'mul': {
        return a * b;
      }
      case 'div': {
        return a / b;
      }
      case 'perc': {
        return (a * b) / 100;
      }
      default: return a;
    }
  }

  public setValue(value: number) {

    if (this.newNo$)
      this.regB = value;
    else
      this.accumulator = value;

  }

  public operate(value: string) {
    if (value != "equals") {

      if (this.regB == undefined || this.newNo$ == false) {
        this.operator = value;
      }
      else {
        //operate reg a and b with prev operator, 
        //store in accumulator
        //set reg b to undefined, 
        //store current operator, 
        //set new no = true
        if (value == "perc") {
          this.regB = this.calculate(this.accumulator, this.regB, value);
          this.onResultChanged.next(this.regB);
        }
        else {
          this.accumulator = this.calculate(this.accumulator, this.regB, this.operator);
          this.regB = undefined;
          this.operator = value;
          this.onResultChanged.next(this.accumulator);
        }
      }

      this.newNo$ = true;
    }
    else {
      //operate reg a and b with prev operator, 
      //store in accumulator
      //set new no = false
      if (this.regB == undefined) this.regB = this.accumulator;

      this.accumulator = this.calculate(this.accumulator, this.regB, this.operator);      
      this.newNo$ = false;
      this.onResultChanged.next(this.accumulator);
    }
  }
}
