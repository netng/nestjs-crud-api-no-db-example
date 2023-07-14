export enum ReportType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

export const data: Data = {
    report: [
        {
            id: 'uuid1',
            source: 'salary',
            amount: 800,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        },
        {
            id: 'uuid2',
            source: 'food',
            amount: 50,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE
        },
    ]
}

export interface Data {
    report: {
        id: string,
        source: string;
        amount: number;
        created_at: Date;
        updated_at: Date,
        type: ReportType,
    }[]
}