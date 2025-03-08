import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsISO8601,
  IsPositive,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
  /**
   * Nombre completo del empleado
   */
  @IsString()
  @MaxLength(100)
  name: string;

  /**
   * Puesto del empleado en la empresa
   */
  @IsString()
  @MaxLength(50)
  position: string;

  /**
   * Fecha de contratación
   * @example 2025-12-24
   */
  @IsISO8601()
  @Length(10, 10)
  startDate: string;

  /**
   * Hora de entrada al trabajo
   * @example 10:00:00
   */
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'work_time should have the format HH:MM:SS',
  })
  workTime: string;

  /**
   * Horas de trabajo diarias
   * @example 8
   */
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  hoursPerDay: number;

  /**
   * Horario
   * @example Lunes a Viernes, 9am - 5pm
   */
  @ApiHideProperty()
  @IsString()
  @MaxLength(50)
  workSchedule: string;
}
