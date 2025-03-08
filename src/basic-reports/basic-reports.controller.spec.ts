import { Test, TestingModule } from '@nestjs/testing';
import { BasicReportsController } from './basic-reports.controller';

describe('BasicReportsController', () => {
  let controller: BasicReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicReportsController],
    }).compile();

    controller = module.get<BasicReportsController>(BasicReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
