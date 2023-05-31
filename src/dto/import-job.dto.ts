import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { JobStateEnum } from 'src/constants/job.constants';

export enum ImportBookTypeEnum {
  word = 'word',
  pdf = 'pdf',
  wattpad = 'wattpad',
  evernote = 'evernote',
}

export class ImportJobRequestDto {
  @ApiProperty({
    type: String,
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @ApiProperty({
    type: String,
    example: ImportBookTypeEnum.pdf,
  })
  @IsNotEmpty()
  @IsEnum(ImportBookTypeEnum)
  type: string;

  @ApiProperty({
    type: String,
    example: 'imported url',
  })
  @IsNotEmpty()
  @IsString()
  url: string;
}

export class ImportJob {
  id: string;
  book_id: string;
  created_at: number;
  updated_at: number;
  state: JobStateEnum;
  url: string;
}
