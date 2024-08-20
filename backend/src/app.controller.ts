import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public-decorator';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import * as path from 'path';

@Public()
@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      // Hard disk should not be more than 80% full
      () =>
        this.disk.checkStorage('storage', {
          path: path.resolve('/'),
          thresholdPercent: 0.8,
        }),
      // Max memory node process should allocate < 100MB
      () => this.memory.checkHeap('memory_heap', 100 * 1024 * 1024),
    ]);
  }
}
