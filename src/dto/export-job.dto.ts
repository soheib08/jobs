import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { JobStateEnum } from 'src/constants/job.constants';

export enum ExportBookTypeEnum {
  epub = 'epub',
  pdf = 'pdf',
}

export class ExportJobRequestDto {
  @ApiProperty({
    type: String,
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @ApiProperty({
    type: String,
    example: 'epub',
  })
  @IsNotEmpty()
  @IsEnum(ExportBookTypeEnum)
  type: ExportBookTypeEnum;
}

export class ExportJob {
  id: string;
  book_id: string;
  type: ExportBookTypeEnum
  created_at: number;
  updated_at: number;
  state: JobStateEnum;
}
