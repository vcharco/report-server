import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/contry.model';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
