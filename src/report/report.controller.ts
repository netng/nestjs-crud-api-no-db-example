import { Body, Controller, Delete, Get, HttpCode, Param, ParseEnumPipe, ParseIntPipe, ParseUUIDPipe, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Data, data, ReportType } from "src/data";
import { v4 as uuid } from "uuid";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "src/dtos/report.dto"
import { ReportService } from "./report.service";

@Controller("report/:type")
export class ReportController {

  constructor(
    private readonly reportService: ReportService
  ) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto[] {
    const reportType = type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get(":id")
  getReportById(
    @Param("id", ParseUUIDPipe) id: string, 
    @Param("type", new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
    const reportType = type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(id, reportType);
  }

  @Post()
  createReport(
    @Body() {source, amount}: CreateReportDto,
    @Param("type", new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
      const reportType = type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.createReport(reportType, {source, amount});
  }

  @Put(":id")
  updateReport(
    @Body() body: UpdateReportDto,
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Param("id") id: string
  ): ReportResponseDto {
      console.log(body);
      const reportType = type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.updateReport(reportType, body, id);
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(@Param("id") id: string) {
    return this.reportService.deleteReport(id);
  }

  @Post('local')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async local(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      data: file.path,
    };
  }
}