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

  private _useRegB = false;
  private get useRegB() {
    return this._useRegB;
  }
  private set useRegB(value) {
    this._useRegB = value;
  }

  public onResultChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor() {
    this.reset();
  }

  reset() {

    this.regB = undefined;
    this.operator = undefined;
    this.useRegB = false;
    this.accumulator = 0;

    this.onResultChanged.next(this.accumulator);
  }

  calculate(a: number, b: number, op: string) {
    a = a || 0;
    b = b || 0;

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

    if (this.useRegB)
      this.regB = value;
    else
      this.accumulator = value;

  }

  public operate(operator: string) {
    switch (operator) {
      case "equals": {
        if (this.operator != undefined) {
          if (this.regB == undefined)
            this.regB = this.accumulator;
          this.accumulator = this.calculate(this.accumulator, this.regB, this.operator);
          this.useRegB = false;
        }
        this.onResultChanged.next(this.accumulator);
        break;
      }
      case "perc": {
        if (this.regB == undefined) {
          if (this.operator != undefined) {
            this.regB = this.calculate(this.accumulator, this.accumulator, operator);
            this.onResultChanged.next(this.regB);
          }
          else {
            this.accumulator = this.calculate(this.accumulator, 0, operator);
            this.onResultChanged.next(this.accumulator);
          }
        }
        else {
          this.regB = this.calculate(this.accumulator, this.regB, operator);
          this.onResultChanged.next(this.regB);
        }
        break;
      }
      default: {
        var prevOp = this.operator;
        this.operator = operator;

        if (this.regB == undefined || this.useRegB == false) {
          this.useRegB = true;
          return;
        }
        this.useRegB = true;
        this.accumulator = this.calculate(this.accumulator, this.regB, prevOp);
        this.regB = undefined;
        this.onResultChanged.next(this.accumulator);
      }
    }
  }
}
