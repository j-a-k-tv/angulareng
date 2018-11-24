import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return value.slice().reverse();
  }

  // transform(value: Array<object>) {

  //   console.log(value);
  //   return value.slice().reverse();
  // }

}