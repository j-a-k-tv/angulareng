import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CalculationService {
  private _accumulator: number;
  public get accumulator(): number {
    return this._accumulator;
  }
  public set accumulator(value: number) {
    this._accumulator = value;
    this.onAccumulatorChanged.next(this._accumulator);
  }

  private _regB: number;
  private get regB(): number {
    return this._regB;
  }
  private set regB(value: number) {
    this._regB = value;
    console.log("reg b :", this._regB);
  }

  private _operator: string;
  public get operator(): string {
    return this._operator;
  }
  public set operator(value: string) {
    var prevOperator = this._operator;

    if (value != "equals") {
      this._operator = value;
      this.regB = this.accumulator;
      this.onOperatorChanged.next(this._operator);
    }

    if (prevOperator != undefined) {
      switch (prevOperator) {
        case 'plus': {
          this.accumulator = this.accumulator + this.regB;
          break;
        }
        case 'minus': {
          this.accumulator = this.accumulator - this.regB;
          break;
        }
        case 'mul': {
          this.accumulator = this.accumulator * this.regB;
          break;
        }
        case 'div': {
          this.accumulator = this.accumulator / this.regB;
          break;
        }
      }
    }
  }

  public onAccumulatorChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public onOperatorChanged: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  constructor() {
    this._accumulator = 0;
    this._regB = 0
    this._operator = undefined;
  }

  reset() {
    this.accumulator = 0;
    this.regB = 0;
    this._operator = undefined;
  }  
}
