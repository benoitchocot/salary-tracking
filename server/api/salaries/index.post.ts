import { salaryRepository } from '~/server/repositories/salaryRepository';
import type { SalaryEntry } from '~/shared/salary';

export default defineEventHandler(async (event) => {
    const body = await readBody<Omit<SalaryEntry, 'id'>>(event);

    // Validate required fields
    if (!body.monthYear || body.grossSalary === undefined || body.netSalary === undefined) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields'
        });
    }

    const newEntry = await salaryRepository.create(body);
    return newEntry;
});
