import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

export interface ReportSummary {
    totalIncome: number
    totalExpense: number
    netIncome: number
}

@Injectable()
export class SummaryService {
    constructor(private readonly reportService: ReportService) {}

    getReportSummary(): ReportSummary {
        return this.calculateReportSummary();
    }
    
    private totalIncome(): number {
        const totalIncome = this.reportService.getAllReports(ReportType.INCOME)
        .map((income) => income.amount)
        .reduce((sum, incomeAmount) => sum + incomeAmount);
        
        return totalIncome;
    }
    
    private totalExpense(): number {
        const totalExpense = this.reportService.getAllReports(ReportType.EXPENSE)
        .map((expense) => expense.amount)
        .reduce((sum, expenseAmount) => sum + expenseAmount);

        return totalExpense;
    }

    private calculateReportSummary(): ReportSummary {
        const netIncome = this.totalIncome() - this.totalExpense(); 
        return {
            totalIncome: this.totalIncome(),
            totalExpense: this.totalExpense(),
            netIncome: netIncome
        };
    }
}
