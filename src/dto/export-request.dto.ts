import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ExportBookTypeEnum {
  epub = 'epub',
  pdf = 'pdf',
}

export class ExportRequestDto {
  @ApiProperty({
    type: String,
    example: '1jhwhf72',
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
