import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public-decorator';
import { Logger } from './common/utils/logger/logger';

@Public()
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    Logger.debug('aaaa', 'ZZZ', { a: 1, b: 'zz' });
    return 'Hello World!';
  }
}
