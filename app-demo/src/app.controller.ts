import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/readyz')
  getReadyz(): string {
    return 'ready';
  }

  @Get('/healthz')
  getHealthz(): string {
    return 'healthy';
  }

  @Get('/version')
  getVersion(): string {
    const version: string = this.configService.get('VERSION') || 'X.X.X';
    return `Version: ${version}`;
  }
}
