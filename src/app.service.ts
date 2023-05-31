import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  ExportBookTypeEnum,
  ExportJob,
  ExportJobRequestDto,
} from './dto/export-job.dto';
import {
  JobProcessingTimeValues,
  JobStateEnum,
} from './constants/job.constants';
import { generateId } from './utils/generate-id';
import { GetExportJobListResponseDto } from './dto/export-job-list.dto';
import { ImportJob, ImportJobRequestDto } from './dto/import-job.dto';
import { GetImportJobListResponseDto } from './dto/import-job-list.dto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    await this.cacheManager.set('export', [], 0);
    await this.cacheManager.set('import', [], 0);
  }
  async exportJob(body: ExportJobRequestDto) {
    let newJob = new ExportJob();
    newJob.id = generateId();
    newJob.book_id = body.bookId;
    newJob.state = JobStateEnum.pending;
    newJob.type = body.type;
    newJob.created_at = Date.now();
    newJob.updated_at = Date.now();
    let foundExportJobs: Array<ExportJob> = await this.cacheManager.get(
      'export',
    );
    foundExportJobs.push(newJob);
    await this.cacheManager.set('export', foundExportJobs, 0);
    this.updateExportJobState(newJob)
  }

  async getExportJobList() {
    let foundExportJobs: Array<ExportJob> = await this.cacheManager.get(
      'export',
    );
    let res = new GetExportJobListResponseDto();
    res.finished_list = foundExportJobs.filter((item) => {
      return item.state === JobStateEnum.finished;
    });
    res.pending_list = foundExportJobs.filter((item) => {
      return item.state === JobStateEnum.pending;
    });

    return res;
  }

  async importJob(body: ImportJobRequestDto) {
    let newJob = new ImportJob();
    newJob.id = generateId();
    newJob.book_id = body.bookId;
    newJob.state = JobStateEnum.pending;
    newJob.created_at = Date.now();
    newJob.updated_at = Date.now();
    newJob.url = body.url;
    let foundImportJobs: Array<ImportJob> = await this.cacheManager.get(
      'import',
    );
    foundImportJobs.push(newJob);
    await this.cacheManager.set('import', foundImportJobs, 0);
    this.updateImportJobState(newJob)
  }

  async getImportJobList() {
    let foundImportJobs: Array<ImportJob> = await this.cacheManager.get(
      'import',
    );    
    let res = new GetImportJobListResponseDto();
    res.finished_list = foundImportJobs.filter((item) => {
      return item.state === JobStateEnum.finished;
    });
    res.pending_list = foundImportJobs.filter((item) => {
      return item.state === JobStateEnum.pending;
    });

    return res;
  }

  async updateExportJobState(job: ExportJob) {    
    const foundExportJobs: Array<ExportJob> = await this.cacheManager.get(
      'export',
    );
    const foundJob = foundExportJobs.find((element) => {
      return element.id === job.id;
    });
    if (job.type === ExportBookTypeEnum.epub) {
      await this.waitUntil(JobProcessingTimeValues.export_ePub);
      foundJob.state = JobStateEnum.finished
      foundJob.updated_at += JobProcessingTimeValues.export_ePub;
    } else {
      await this.waitUntil(JobProcessingTimeValues.export_PDF);
      foundJob.state = JobStateEnum.finished
      foundJob.updated_at += JobProcessingTimeValues.export_PDF;
    }
    await this.cacheManager.set('export', foundExportJobs, 0);

  }

  async updateImportJobState(job: ImportJob) {
    await this.waitUntil(JobProcessingTimeValues.import);
    const foundImportJobs: Array<ExportJob> = await this.cacheManager.get(
      'import',
    );
    const foundJob = foundImportJobs.find((element) => {
      return element.id === job.id;
    });
    foundJob.updated_at += JobProcessingTimeValues.import;
    foundJob.state = JobStateEnum.finished

    await this.cacheManager.set('import', foundImportJobs, 0);
  }

  async waitUntil(time: number) {
    return await new Promise((resolve) => {
      const interval = setInterval(() => {
        resolve(true);
        clearInterval(interval);
      }, time * 1000);
    });
  }
}
