import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from './app.module';

describe('AppController', () => {
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('should define TypeOrmModule', async () => {
    const typeOrmModule = moduleRef.get<TypeOrmModule>(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();
  });

  it('should define ConfigModule', async () => {
    const configModule = moduleRef.get<ConfigModule>(ConfigModule);
    expect(configModule).toBeDefined();
  });
});
