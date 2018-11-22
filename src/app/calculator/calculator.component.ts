import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../calculation.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  $operation: string = '';
  $result: string = '0';
  startNewNo: boolean = false;

  constructor(private calService: CalculationService) {

  }

  ngOnInit() {
    this.calService.onResultChanged.subscribe({
      next: ((value) => this.$result = value == undefined ? "0" : value.toString()).bind(this)
    });
  }

  onKeyInput(_input) {
    switch (_input) {
      case 'CE': {
        this.calService.setValue(0);
        this.$result = "0";
      }
        break;
      case 'C': {
        this.calService.reset();
        this.$operation = '';
        break;
      }
      case 'backspace': {
        var inpLen = this.$result.length;
        this.$result = inpLen == 1 ? '0' : this.$result.substring(0, inpLen - 1);
        this.calService.setValue(Number(this.$result));
        break;
      }
    }
  }

  onOperation(_input) {
    this.startNewNo = true;
    switch (_input) {
      case 'plus': {
        this.$operation += this.$result + ' ' + '+' + ' '
        break;
      }
      case 'minus': {
        this.$operation += this.$result + ' ' + '-' + ' '
        break;
      }
      case 'mul': {
        this.$operation += this.$result + ' ' + '*' + ' '
        break;
      }
      case 'div': {
        this.$operation += this.$result + ' ' + '/' + ' '
        break;
      }
      case 'equals': {
        this.$operation = ''
        break;
      }
    }
    this.calService.operate(_input);
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
        if (this.$result.indexOf('-') >= 0)
          this.$result = this.$result.substring(1, this.$result.length)
        else
          this.$result = '-' + this.$result;
        this.calService.setValue(Number(this.$result));
        break;
      }

      default: {
        this.$result = this.$result == '0' ? _input : this.$result + _input;
        this.calService.setValue(Number(this.$result));
      }
    }

    console.log("result:", this.$result);
    this.startNewNo = false;

  }
}
