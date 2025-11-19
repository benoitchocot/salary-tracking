import type { SalaryEntry } from '~/shared/salary';

export const useSimulation = () => {
    const simulateIncrease = (
        salaries: SalaryEntry[],
        increasePercentage: number
    ): SalaryEntry[] => {
        return salaries.map(salary => {
            const multiplier = 1 + increasePercentage / 100;

            return {
                ...salary,
                grossSalary: Math.round(salary.grossSalary * multiplier * 100) / 100,
                netSalary: Math.round(salary.netSalary * multiplier * 100) / 100,
                netAfterTax: Math.round(salary.netAfterTax * multiplier * 100) / 100,
                taxPaid: Math.round(salary.taxPaid * multiplier * 100) / 100
            };
        });
    };

    const calculateAnnualTotal = (salaries: SalaryEntry[]) => {
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

    return {
        simulateIncrease,
        calculateAnnualTotal
    };
};
