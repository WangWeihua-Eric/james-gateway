import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ENV_LIST } from '../../constants';

@Injectable()
export class ConfigService {
  private config = {};
  public constructor() {
    const configPath = path.join(process.cwd(), 'dist/config');
    const env = process.env.NODE_ENV || 'test';
    const defConfig = require(path.join(configPath, 'config.default.js'));
    this.config = { ...defConfig.default };
    if (env && ENV_LIST.includes(env)) {
      const filename = `config.${env}.js`;
      const envConfig = require(path.join(configPath, filename));
      // merge
      this.config = { ...defConfig, ...envConfig };
    }
  }
  public get(key: string): any {
    return this.config[key];
  }
}
