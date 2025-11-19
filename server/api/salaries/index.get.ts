import { salaryRepository } from '~/server/repositories/salaryRepository';

export default defineEventHandler(async () => {
    const salaries = await salaryRepository.getAll();
    return salaries;
});
