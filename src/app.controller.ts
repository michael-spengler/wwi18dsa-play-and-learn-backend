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
    response.send('hello from Miriam, Hannah und Manuel');
    response.sendFile(pathToIndexHTML);
  }

  @Get('unserEndpoint')
  unserEndpoint(@Res() response: any): void {
    response.send('das ist unser endpoint');
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
