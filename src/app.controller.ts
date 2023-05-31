import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ExportJobRequestDto } from './dto/export-job.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetExportJobListResponseDto } from './dto/export-job-list.dto';
import { ImportJobRequestDto } from './dto/import-job.dto';
import { GetImportJobListResponseDto } from './dto/import-job-list.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('export')
  @HttpCode(200)
  addExportJob(@Body() body: ExportJobRequestDto) {
    return this.appService.exportJob(body);
  }

  @Get('export')
  @HttpCode(200)
  @ApiResponse({
    type: GetExportJobListResponseDto,
  })
  getExportJobList() {
    return this.appService.getExportJobList();
  }

  @Post('import')
  @HttpCode(200)
  addImportJob(@Body() body: ImportJobRequestDto) {
    return this.appService.importJob(body);
  }

  @Get('import')
  @HttpCode(200)
  @ApiResponse({
    type: GetImportJobListResponseDto,
  })
  getImportJobList() {
    return this.appService.getImportJobList();
  }
}
