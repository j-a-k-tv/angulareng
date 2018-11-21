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
    this.calService.onAccumulatorChanged.subscribe({
      //next: ((value) => this.$result = value).bind(this)
      next: function (value : number) {
        console.log("reg a:", value);
        this.$result = value.toString();
      }.bind(this)
    });
  }

  onKeyInput(_input) {

    switch (_input) {
      case 'CE': this.calService.accumulator = 0;
        break;
      case 'C': {
        this.calService.reset();
        this.$operation = '';
        break;
      }
      case 'backspace': {
        var inpLen = this.$result.length;
        this.$result = inpLen == 1 ? '0' : this.$result.substring(0, inpLen - 1);
        break;
      }
    }

  }

  onOperation(_input) {
    this.startNewNo = true;
    this.calService.operator = _input;

    switch (_input) {
      case 'plus': {
        this.$operation += this.$result + ' ' + '+' + ' ';
        break;
      }
      case 'minus': {
        this.$operation += this.$result + ' ' + '-' + ' ';
        break;
      }
      case 'mul': {
        this.$operation += this.$result + ' ' + '*' + ' ';
        break;
      }
      case 'div': {
        this.$operation += this.$result + ' ' + '/' + ' ';
        break;
      }
      case 'equals': {
        this.$operation = '';
        break;
      }
    }
  }

  onNumInput(_input : string) {

    if (this.startNewNo && _input != "negate")
      this.$result = "0";

    console.log("type of result: ", typeof(this.$result));

    switch (_input) {
      case ".": {
        if (this.$result.indexOf('.') < 0)
          this.$result = this.$result + _input;
        break;
      }
      case "negate": {
        if (this.$result.indexOf('-') >= 0){
          console.log("here")
          this.$result = this.$result.substring(1, this.$result.length)
        }
        else
        {
          console.log("there")
          this.$result = '-' + this.$result;
        }
        break;
      }

      default: {
        this.$result = this.$result == '0' ? _input : this.$result + _input;
      }
    }

    console.log("result:", this.$result);
    this.startNewNo = false;
    this.calService.accumulator = Number(this.$result);
  }
}
