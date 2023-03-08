import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  默认所有网关以 /api 开头
  app.setGlobalPrefix('/api');

  await app.listen(8080);

  const logo = `
                        (
                        )     (
                 ___...(-------)-....___
             .-""       )    (          ""-.
       .-'\`\`'|-._             )         _.-|
      /  .--.|   \`""---...........---""\`   |
     /  /    |                             |
     | |     |                             |
      \\ \\    |                             |
       \\ \\   |                             |
             | James gateway is run on http://localhost:8080/
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
bootstrap();
