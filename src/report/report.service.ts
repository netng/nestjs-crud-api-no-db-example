import { Injectable } from "@nestjs/common";
import { Data, ReportType, data } from "../data";
import { v4 as uuid } from "uuid";
import { ReportResponseDto } from "../dtos/report.dto";

interface Report {
  source: string;
  amount: number;
}

interface UpdateReport {
  source?: string;
  amount?: number;
}

@Injectable() 
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    const report = data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
    return report;
  }

  getReportById(id: string, type: ReportType): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((data) => data.id === id);

    if(!report) return;

    return new ReportResponseDto(report); 
  }

  createReport(type: ReportType, { source, amount }: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }
    data.report.push(newReport)
    return new ReportResponseDto(newReport);
  }

  updateReport(type: ReportType, body: UpdateReport, id: string): ReportResponseDto {
    const reportToUpdate = data.report
        .filter((report) => report.type === type)
        .find((report) => report.id === id);

      if(!reportToUpdate) return;

      const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);

      data.report[reportIndex] = {
        ...data.report[reportIndex],
        ...body,
        updated_at: new Date(),
      };
      return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if(!reportIndex) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}

