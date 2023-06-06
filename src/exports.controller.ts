import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ExportsService } from './exports.service';
import { ExportRequestDto } from './dto/export-request.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetExportJobListResponseDto } from './dto/export-request-list.dto';

@Controller('exports')
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Post()
  @HttpCode(201)
  createExportRequest(@Body() requestDto: ExportRequestDto): void {
    this.exportsService.createExportRequest(requestDto);
  }

  @Get()
  @ApiResponse({
    type: GetExportJobListResponseDto,
  })
  @HttpCode(200)
  getExportRequests(): Record<string, any> {
    return this.exportsService.getExportRequests();
  }
}
