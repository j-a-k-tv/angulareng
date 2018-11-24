import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../calculation.service';

export class CalInput {
  constructor(public value: string, public type: string) {

  }
}

export class HistoryItem {
  constructor(public calculator: string, public operations: string, public result: string) {
    this.operations += " =";
  }
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  public $activeCalculator = "Standard";
  public $operation: string = '';
  public $result: string = '0';
  private startNewNo: boolean = false;
  private operationsArr: CalInput[] = [];
  public $history: HistoryItem[] = [];
  private operators: object = {
    "plus": "+",
    "minus": "-",
    "div": "÷",
    "mul": "*",
  }
  public calculators: string[] = [
    "Standard",
    "Scientific",
    "Programmer",
    "Date Calculation"
  ];
  public converters: string[] = [
    "Currency",
    "Volume",
    "Length",
    "Weight and Mass",
    "Temperature",
    "Energy",
    "Area",
    "Speed",
    "Time",
    "Power",
    "Data",
    "Pressure",
    "Angle"
  ];

  constructor(private calService: CalculationService) {

  }

  ngOnInit() {
    this.calService.onResultChanged.subscribe({
      next: ((value) => this.$result = value.toString()).bind(this)
    });
  }

  deleteHistory() {
    this.$history = [];
  }

  

  addOperation(value: string, type: string) {
    var lastInp = this.operationsArr.length ? this.operationsArr[this.operationsArr.length - 1] : undefined;
    var newInp = new CalInput(value, type)
    if (lastInp != undefined && lastInp.type == type)
      this.operationsArr[this.operationsArr.length - 1] = newInp
    else
      this.operationsArr.push(newInp)
  }

  hasOperations(){
    return this.operationsArr.length > 0;
  }

  clearOperations() {
    this.operationsArr = [];
  }

  getOperations() {
    return this.operationsArr.map(r => r.value).join(" ");
  }

  displayOperation() {
    this.$operation = this.getOperations();
  }

  onOperation(_input) {
    this.calService.operate(_input);
    this.startNewNo = true;

    switch (_input) {
      case 'plus':
      case 'minus':
      case 'mul':
      case 'div': {
        if (!this.hasOperations())
          this.addOperation(this.$result, "number");
        this.addOperation(this.operators[_input] as string, "operator");
        break;
      }
      case 'perc': {
        this.addOperation(this.$result, "number");
        break;
      }
      case 'equals': {
        this.$history.push(new HistoryItem(this.$activeCalculator, this.getOperations(), this.$result))
        this.clearOperations();
        break;
      }
    }

    this.displayOperation();
  }

  onKeyInput(_input) {
    switch (_input) {           
      case 'C': {
        this.calService.reset();
        this.clearOperations();
        this.displayOperation();
        break;
      }      
    }
  }

  onNumInput(_input: string) {
    if (this.startNewNo && _input != "negate")
      this.$result = "0";

    switch (_input) {
      case ".": {
        if (this.$result.indexOf('.') < 0)
          this.$result = this.$result + _input;
        break;
      }
      case "negate": {
        var num = Number(this.$result);
        num *= -1;
        this.$result = num.toString();
        break;
      }
      case 'backspace': {
        var inpLen = this.$result.length;
        if (inpLen > 0)
          this.$result = this.$result.substring(0, inpLen - 1);
        if (isNaN(this.$result as any) || this.$result == "")
          this.$result = "0";
        break;
      }
      case 'CE': {
        this.$result = "0";
        break;
      }   
      default: {
        this.$result = this.$result == '0' ? _input : this.$result + _input;
      }
    }

    this.addOperation(this.$result, "number");
    this.startNewNo = false;
    this.calService.setValue(Number(this.$result));
  }
}
