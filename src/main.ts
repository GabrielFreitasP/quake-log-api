import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const pckg = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const options = new DocumentBuilder()
    .setTitle(pckg.name)
    .setDescription(pckg.description)
    .setVersion(pckg.version)
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
