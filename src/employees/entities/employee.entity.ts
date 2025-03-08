import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('employees_pkey', ['id'], { unique: true })
@Entity('employees', { schema: 'public' })
export class Employee {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'position', length: 50 })
  position: string;

  @Column('date', { name: 'start_date' })
  startDate: string;

  @Column('time without time zone', { name: 'work_time' })
  workTime: string;

  @Column('integer', { name: 'hours_per_day' })
  hoursPerDay: number;

  @Column('character varying', { name: 'work_schedule', length: 50 })
  workSchedule: string;
}
