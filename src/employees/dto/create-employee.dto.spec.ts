import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { CreateEmployeeDto } from './create-employee.dto';
import { validate } from 'class-validator';

describe('createEmployeeDto', () => {
  let dto: CreateEmployeeDto;

  beforeEach(async () => {
    dto = new CreateEmployeeDto();
  });

  it('should validate with valid params', async () => {
    const dto: CreateEmployeeDto = {
      name: 'Ana Gómez',
      position: 'Diseñadora',
      startDate: '2020-03-22',
      workTime: '10:00:00',
      hoursPerDay: 6,
      workSchedule: 'Lunes a Viernes, 10am - 4pm',
    };

    const errors = await validate(expect.objectContaining(dto));

    expect(errors.length).toBe(0);
  });

  it.each([
    { date: '20220125' }, // Invalid format (no separators)
    { date: '2022/01/25' }, // Invalid separator
    { date: '2022-01-252' }, // Invalid length
    { date: '2022-50-10' }, // Invalid month (out of limits)
  ])('should not validate with invalid startDate format', async ({ date }) => {
    const dto = plainToInstance(CreateEmployeeDto, { startDate: date });

    const errors = await validate(dto);
    const startDateErrors = errors.find((err) => err.property === 'startDate');

    expect(startDateErrors).toBeDefined();
  });

  it.each([
    { time: '100000' }, // Invalid format (no separator)
    { time: '50:00:000' }, // Invalid length
    { time: '50:00:00' }, // Invalid hour (out of limits)
  ])('should not validate with invalid work-time format', async ({ time }) => {
    const dto = plainToInstance(CreateEmployeeDto, { workTime: time });

    const errors = await validate(dto);
    const workTimeErrors = errors.find((err) => err.property === 'workTime');

    expect(workTimeErrors).toBeDefined();
  });

  it('should transform numeric values to number', async () => {
    const numericValues = { hoursPerDay: '10' };
    const dto = plainToInstance(CreateEmployeeDto, numericValues);

    const errors = await validate(expect.objectContaining(dto));
    const hoursPerDayErrors = errors.find(
      (err) => err.property === 'hoursPerDay',
    );

    expect(hoursPerDayErrors).toBeUndefined();
    expect(dto.hoursPerDay).toBe(10);
  });

  it.each([
    { field: 'name', max: 100 },
    { field: 'position', max: 50 },
    { field: 'workSchedule', max: 50 },
  ])('should not exceed field length', async ({ field, max }) => {
    const dto: CreateEmployeeDto = plainToInstance(CreateEmployeeDto, {
      [field]: 'a'.repeat(max + 1),
    });

    const errors = await validate(dto);
    const fieldErrors = errors.find((err) => err.property === field);

    expect(fieldErrors).toBeDefined();
  });
});
