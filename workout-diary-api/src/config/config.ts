import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

class Config {

  constructor(
    private env: { [k: string]: string | undefined },
    ) { }

  ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  get getPort() {
    return this.getValue('PORT', true);
  }

  get isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      // tslint:disable-next-line:radix
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: ['**/*.entity.js'],
      migrationsTableName: 'migration',
      migrations: ['build/migration/*.js'],
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: this.isProduction,
    };
  }

  getJWTConfig() {
    return {
      jwtTokenSecretKey: this.getValue('JWT_SECRET'),
      jwtExpiresIn: '15m',
      refreshTokenSecretKey: this.getValue('JWT_REFRESH_SECRET'),
      refreshTokenExpiresIn: '8h',
    };
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

}

const config = new Config(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
  ]);

export { config };
