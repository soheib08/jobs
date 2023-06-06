import { ApiProperty } from '@nestjs/swagger';
import { JobStateEnum } from '../constants/job.constants';
import { ImportBookTypeEnum } from './import-request.dto';

export class ImportRequestListItem {
  @ApiProperty({
    type: String,
    example: '1',
  })
  book_id: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  created_at: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  updated_at: Date;

  @ApiProperty({
    enum: JobStateEnum,
    examples: [JobStateEnum.finished, JobStateEnum.pending],
  })
  state: JobStateEnum;

  @ApiProperty({
    type: String,
    example: ImportBookTypeEnum.pdf,
  })
  type: ImportBookTypeEnum;

  @ApiProperty({
    type: String,
    example: 'imported url',
  })
  url: string;
}

export class GetImportJobListResponseDto {
  @ApiProperty({
    type: ImportRequestListItem,
    isArray: true,
  })
  pending: Array<ImportRequestListItem>;

  @ApiProperty({
    type: ImportRequestListItem,
    isArray: true,
  })
  finished: Array<ImportRequestListItem>;
}
