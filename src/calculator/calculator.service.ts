import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  add(arg0: number, arg1: number): any {
    return arg0 + arg1;
  }
}
