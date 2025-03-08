import { Employee } from './employee.entity';

describe('Employee', () => {
  it('should create an instance with correct values', () => {
    const employee = new Employee();
    employee.name = 'foo';
    employee.position = 'foo';
    employee.startDate = 'foo';
    employee.workTime = 'foo';
    employee.hoursPerDay = 10;
    employee.workSchedule = 'foo';

    expect(employee.name).toBe('foo');
    expect(employee.position).toBe('foo');
    expect(employee.startDate).toBe('foo');
    expect(employee.workTime).toBe('foo');
    expect(employee.hoursPerDay).toBe(10);
    expect(employee.workSchedule).toBe('foo');
  });
});
