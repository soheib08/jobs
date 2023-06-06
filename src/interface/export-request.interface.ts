import { JobStateEnum } from "src/constants/job.constants";
import { ExportBookTypeEnum } from "src/dto/export-request.dto";

export interface ExportRequest {
    bookId: string;
    type: ExportBookTypeEnum;
    state: JobStateEnum;
    created_at: Date;
    updated_at: Date;
  }