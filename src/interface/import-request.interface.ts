import { JobStateEnum } from "src/constants/job.constants";
import { ImportBookTypeEnum } from "src/dto/import-request.dto";

export interface ImportRequest {
  bookId: string;
  type: ImportBookTypeEnum;
  url: string;
  state: JobStateEnum;
  created_at: Date;
  updated_at: Date;
}
