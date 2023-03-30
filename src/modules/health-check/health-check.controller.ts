import { Controller, Get, OnModuleInit } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController implements OnModuleInit {
  private userDefinedChecker: () => Promise<void>;

  onModuleInit() {
    this.userDefinedChecker = async () => {
      return Promise.resolve();
    };
  }

  @Get()
  async healthCheck() {
    await this.userDefinedChecker();
    return 'The current service state is healthy';
  }
}
