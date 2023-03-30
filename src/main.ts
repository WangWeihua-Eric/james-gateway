import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from './modules/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const GLOBAL_PREFIX = '/api/node';
  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.use(cookieParser());

  // response
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 参数校验及转换为对象
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get('port');
  await app.listen(port);
  const logo = `
                        (
                        )     (
                 ___...(-------)-....___
             .-""       )    (          ""-.
       .-'\`\`'|-._             )         _.-|
      /  .--.|   \`""---...........---""\`   |
     /  /    |                             |
     |  |    |                             |
      \\  \\   |                             |
       \\ \\   |                             | 
       listening on: http://localhost:${port}${GLOBAL_PREFIX}/health-check 
         \\ \\ |                             |
         _/ /\                             /
        (__/  \                           /
     _..---""\` \\                         /\`""---.._
  .-'           \\                       /          '-.
 :               \`-.__             __.-'              :
 :                  ) ""---...---"" (                 :
  '._               \`"--...___...--"\`              _.\'
   \""--..__                              __..--""/
     '._     """----.....______.....----"""     _.'
        \`""--..,,_____            _____,,..--""\`
                      \`"""----"""\`
  `;
  console.log(logo);
}

(async () => {
  // 启动主应用接口监听
  await bootstrap();
})();
