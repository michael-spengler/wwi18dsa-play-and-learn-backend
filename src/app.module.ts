import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

@Module({
  imports: [HttpClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
