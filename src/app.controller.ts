import { Controller, Get, Res, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  private count = 0;
  constructor(private appService: AppService) {}

  @Get()
  getHello(@Res() response: any): void {

    const pathToIndexHTML = path.join(__dirname, `../assets/docs/index.html`);

    response.sendFile(pathToIndexHTML);

  
  }

  @Get('besterEndpoint')
  getSomething(@Res() response: any): void {
    response.send('etwas von Florian Gemmer, Klemens Gerber und Björn Bulkens für nur 1.0 Noten. Und wenn Sie heute bestellen gibts bis zur Deadline passenden Frontend Code mit dazu :)');
  }

  @Get('/getAsset/:id')
  getAsset(@Param('id') id: string, @Res() response: any): void {
    const asset = this.appService.getAsset(id);

    if (asset === undefined) {
      response.send('asset not found');
    } else {
      if (asset.type === 'JSON') {
        response.send(asset.content);
      } else if (asset.type === 'file') {
        response.sendFile(path.join(__dirname, `../assets/${asset.content}`));
      }
    }
  }

  @Post('/addAsset')
  addAsset(@Body() body: any, @Res() response: any): void {
    // tslint:disable-next-line: no-console
    console.log('Jemand hat einen Post Request gemacht.');
    response.send(this.appService.addAsset(body));
  }

  @Post('/updateAsset/asset/:id')
  updateAsset(@Param('id') id: string, @Body() body: any, @Res() response: any): void {
    response.send(this.appService.updateAsset(id, body));
  }
}
