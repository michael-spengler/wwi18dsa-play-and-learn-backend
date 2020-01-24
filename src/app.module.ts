import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorService } from './calculator/calculator.service';

@Module({
  imports: [HttpClientModule],
  controllers: [AppController],
  providers: [AppService, CalculatorService],
})
export class AppModule {}
