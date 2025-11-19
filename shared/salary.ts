export interface SalaryEntry {
    id: string;
    monthYear: string; // Format: MM/YYYY
    grossSalary: number;
    netSalary: number;
    netAfterTax: number;
    taxPaid: number;
}
