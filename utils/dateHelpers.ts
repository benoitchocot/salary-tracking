/**
 * Format a number as currency (EUR)
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
};

/**
 * Parse month/year string to Date
 */
export const parseMonthYear = (monthYear: string): Date => {
    const [month, year] = monthYear.split('/');
    return new Date(parseInt(year), parseInt(month) - 1);
};

/**
 * Format Date to month/year string
 */
export const formatMonthYear = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
};

/**
 * Get current month/year
 */
export const getCurrentMonthYear = (): string => {
    return formatMonthYear(new Date());
};

/**
 * Sort month/year strings chronologically
 */
export const sortByMonthYear = (a: string, b: string): number => {
    return parseMonthYear(a).getTime() - parseMonthYear(b).getTime();
};
