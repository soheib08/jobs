import { Injectable } from '@nestjs/common';
import { ExportRequest } from './interface/export-request.interface';
import { ExportRequestDto } from './dto/export-request.dto';
import { JobStateEnum } from './constants/job.constants';

@Injectable()
export class ExportsService {
  private exportRequests: ExportRequest[] = [];

  createExportRequest(requestDto: ExportRequestDto): void {
    const { bookId, type } = requestDto;
    const exportRequest: ExportRequest = {
      bookId,
      type,
      state: JobStateEnum.pending,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.exportRequests.push(exportRequest);
    setTimeout(() => {
      this.updateRequestState(exportRequest);
    }, type === 'epub' ? 10000 : 25000);
  }

  getExportRequests(): Record<string, ExportRequest[]> {
    const groupedExports = this.exportRequests.reduce((groups: any, request: ExportRequest) => {
      if (!groups[request.state]) {
        groups[request.state] = [];
      }
      groups[request.state].push(request);
      return groups;
    }, {});

    return groupedExports;
  }

  private updateRequestState(request: ExportRequest): void {
    request.state = JobStateEnum.finished;
    request.updated_at = new Date();
  }
}
