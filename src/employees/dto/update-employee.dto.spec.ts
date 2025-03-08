import { validate } from 'class-validator';
import { UpdateEmployeeDto } from './update-employee.dto';

describe('UpdateEmployeeDto', () => {
  it('should validate with empty values', async () => {
    const dto: UpdateEmployeeDto = {};

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
});
