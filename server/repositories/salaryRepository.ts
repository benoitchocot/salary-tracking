import { promises as fs } from 'fs';
import { join } from 'path';
import type { SalaryEntry } from '~/shared/salary';

const DATA_DIR = join(process.cwd(), 'data');
const DATA_FILE = join(DATA_DIR, 'salaries.json');

export class SalaryRepository {
    private async ensureDataDir(): Promise<void> {
        try {
            await fs.access(DATA_DIR);
        } catch {
            await fs.mkdir(DATA_DIR, { recursive: true });
        }
    }

    private async readData(): Promise<SalaryEntry[]> {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // File doesn't exist yet, return empty array
            return [];
        }
    }

    private async writeData(data: SalaryEntry[]): Promise<void> {
        await this.ensureDataDir();
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    }

    async getAll(): Promise<SalaryEntry[]> {
        return await this.readData();
    }

    async getById(id: string): Promise<SalaryEntry | null> {
        const data = await this.readData();
        return data.find(entry => entry.id === id) || null;
    }

    async create(entry: Omit<SalaryEntry, 'id'>): Promise<SalaryEntry> {
        const data = await this.readData();
        const newEntry: SalaryEntry = {
            ...entry,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        };
        data.push(newEntry);
        await this.writeData(data);
        return newEntry;
    }

    async update(id: string, updates: Partial<Omit<SalaryEntry, 'id'>>): Promise<SalaryEntry | null> {
        const data = await this.readData();
        const index = data.findIndex(entry => entry.id === id);

        if (index === -1) {
            return null;
        }

        data[index] = { ...data[index], ...updates };
        await this.writeData(data);
        return data[index];
    }

    async delete(id: string): Promise<boolean> {
        const data = await this.readData();
        const index = data.findIndex(entry => entry.id === id);

        if (index === -1) {
            return false;
        }

        data.splice(index, 1);
        await this.writeData(data);
        return true;
    }
}

export const salaryRepository = new SalaryRepository();
