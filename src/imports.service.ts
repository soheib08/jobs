import { Injectable } from '@nestjs/common';
import { ImportRequest } from './interface/import-request.interface';
import { ImportRequestDto } from './dto/import-request.dto';
import { JobStateEnum } from './constants/job.constants';

@Injectable()
export class ImportsService {
  private importRequests: ImportRequest[] = [];

  createImportRequest(requestDto: ImportRequestDto): void {
    const { bookId, type, url } = requestDto;
    const importRequest: ImportRequest = {
      bookId,
      type,
      url,
      state: JobStateEnum.pending,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.importRequests.push(importRequest);
    setTimeout(() => {
      this.updateRequestState(importRequest);
    }, 60000);
  }

  getImportRequests(): Record<string, ImportRequest[]> {
    const groupedImports = this.importRequests.reduce((groups: any, request: ImportRequest) => {
      if (!groups[request.state]) {
        groups[request.state] = [];
      }
      groups[request.state].push(request);
      return groups;
    }, {});

    return groupedImports;
  }

  private updateRequestState(request: ImportRequest): void {
    request.state = JobStateEnum.finished;
    request.updated_at = new Date();
  }
}
