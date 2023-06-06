import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ImportBookTypeEnum {
  word = 'word',
  pdf = 'pdf',
  wattpad = 'wattpad',
  evernote = 'evernote',
}
export class ImportRequestDto {
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
  type: ImportBookTypeEnum;

  @ApiProperty({
    type: String,
    example: 'imported url',
  })
  @IsNotEmpty()
  @IsString()
  url: string;
}
