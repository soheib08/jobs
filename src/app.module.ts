import { Module } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { ExportsService } from './exports.service';
import { ExportsController } from './exports.controller';
import { ImportsController } from './imports.controller';

@Module({
  controllers: [ExportsController, ImportsController],
  providers: [ExportsService, ImportsService],
})
export class AppModule {}
