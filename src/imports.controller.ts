import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { ImportRequestDto } from './dto/import-request.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetImportJobListResponseDto } from './dto/import-request-list.dto';

@Controller('imports')
export class ImportsController {
  constructor(private readonly importsService: ImportsService) {}

  @Post()
  @HttpCode(201)
  createImportRequest(@Body() requestDto: ImportRequestDto): void {
    this.importsService.createImportRequest(requestDto);
  }

  @Get()
  @ApiResponse({
    type: GetImportJobListResponseDto,
  })
  @HttpCode(200)
  getImportRequests(): Record<string, any> {
    return this.importsService.getImportRequests();
  }
}
