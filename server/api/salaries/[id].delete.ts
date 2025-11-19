import { salaryRepository } from '~/server/repositories/salaryRepository';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            message: 'ID is required'
        });
    }

    const deleted = await salaryRepository.delete(id);

    if (!deleted) {
        throw createError({
            statusCode: 404,
            message: 'Salary entry not found'
        });
    }

    return { success: true };
});
