import { salaryRepository } from '~/server/repositories/salaryRepository';
import type { SalaryEntry } from '~/shared/salary';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            message: 'ID is required'
        });
    }

    const body = await readBody<Partial<Omit<SalaryEntry, 'id'>>>(event);
    const updated = await salaryRepository.update(id, body);

    if (!updated) {
        throw createError({
            statusCode: 404,
            message: 'Salary entry not found'
        });
    }

    return updated;
});
