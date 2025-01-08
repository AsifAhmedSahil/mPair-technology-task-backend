

export interface IAccount {
    date: Date;
    accountType: 'debit' | 'credit'; 
    accountHead: string
    amount: number; 
    employeeId: string;
  }
  