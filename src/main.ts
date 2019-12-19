import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationReader } from 'configuration-reader';
import * as path from 'path';
import cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// you can adjust the filename here - remember updating .gitignore
  const yourFileName: string = '../.env';

  const configurationReader: ConfigurationReader =
    new ConfigurationReader(path.join(__dirname, yourFileName));

  const portComingFromConfigFile: string = configurationReader.get('port');

  const portNumber: string = portComingFromConfigFile;

  app.use(cors('https://dance-planner.de', 'https://dance-planner.com', 'http://localhost:3000'));
  await app.listen(portNumber);

}
bootstrap();
