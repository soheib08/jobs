import { ApiProperty } from '@nestjs/swagger';
import { JobStateEnum } from 'src/constants/job.constants';
import { ExportBookTypeEnum } from './export-request.dto';

export class ExportRequestListItem {
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
    type: String,
    example: 'epub',
  })
  type: ExportBookTypeEnum;
  
  @ApiProperty({
    enum: JobStateEnum,
    examples: [JobStateEnum.finished, JobStateEnum.pending],
  })
  state: JobStateEnum;
}

export class GetExportJobListResponseDto {
  @ApiProperty({
    type: ExportRequestListItem,
    isArray: true,
  })
  pending: Array<ExportRequestListItem>;

  @ApiProperty({
    type: ExportRequestListItem,
    isArray: true,
  })
  finished: Array<ExportRequestListItem>;
}
