import type { SalaryEntry } from '~/shared/salary';

/**
 * Group salaries by year
 */
export const groupSalariesByYear = (salaries: SalaryEntry[]): Record<string, SalaryEntry[]> => {
    return salaries.reduce((acc, salary) => {
        const year = salary.monthYear.split('/')[1];
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(salary);
        return acc;
    }, {} as Record<string, SalaryEntry[]>);
};

/**
 * Calculate totals for a list of salaries
 */
export const calculateTotals = (salaries: SalaryEntry[]) => {
    return salaries.reduce(
        (acc, salary) => {
            acc.grossSalary += salary.grossSalary;
            acc.netSalary += salary.netSalary;
            acc.netAfterTax += salary.netAfterTax;
            acc.taxPaid += salary.taxPaid;
            return acc;
        },
        { grossSalary: 0, netSalary: 0, netAfterTax: 0, taxPaid: 0 }
    );
};

/**
 * Calculate average for a list of salaries
 */
export const calculateAverage = (salaries: SalaryEntry[]) => {
    if (salaries.length === 0) {
        return { grossSalary: 0, netSalary: 0, netAfterTax: 0, taxPaid: 0 };
    }

    const totals = calculateTotals(salaries);
    const count = salaries.length;

    return {
        grossSalary: totals.grossSalary / count,
        netSalary: totals.netSalary / count,
        netAfterTax: totals.netAfterTax / count,
        taxPaid: totals.taxPaid / count
    };
};
