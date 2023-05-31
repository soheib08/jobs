import { ApiProperty } from '@nestjs/swagger';
import { JobStateEnum } from 'src/constants/job.constants';

export class ImportJobListItem {
  @ApiProperty({
    type: String,
    example: '1',
  })
  book_id: string;

  @ApiProperty({
    type: Number,
    example: Date.now(),
  })
  created_at: number;

  @ApiProperty({
    type: Number,
    example: Date.now(),
  })
  updated_at: number;

  @ApiProperty({
    enum: JobStateEnum,
    examples: [JobStateEnum.finished, JobStateEnum.pending],
  })
  state: JobStateEnum;
}

export class GetImportJobListResponseDto {
  @ApiProperty({
    type: ImportJobListItem,
    isArray: true,
  })
  pending_list: Array<ImportJobListItem>;

  @ApiProperty({
    type: ImportJobListItem,
    isArray: true,
  })
  finished_list: Array<ImportJobListItem>;
}
