import { Capacitor } from '@capacitor/core';
import type { SalaryEntry } from '~/shared/salary';

const STORAGE_KEY = 'salaries_data';

export const useSalaries = () => {
    const salaries = ref<SalaryEntry[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Check if running on Capacitor (mobile)
    const isNative = Capacitor.isNativePlatform();

    // LocalStorage helpers for mobile
    const loadFromLocalStorage = (): SalaryEntry[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    };

    const saveToLocalStorage = (data: SalaryEntry[]) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    // Fetch all salaries
    const fetchSalaries = async () => {
        loading.value = true;
        error.value = null;

        try {
            if (isNative) {
                // Mobile: use localStorage
                salaries.value = loadFromLocalStorage();
            } else {
                // Web: use API
                const data = await $fetch<SalaryEntry[]>('/api/salaries');
                salaries.value = data;
            }
        } catch (e) {
            error.value = 'Erreur lors du chargement des salaires';
            console.error(e);
        } finally {
            loading.value = false;
        }
    };

    // Create a new salary entry
    const createSalary = async (salary: Omit<SalaryEntry, 'id'>) => {
        loading.value = true;
        error.value = null;

        try {
            if (isNative) {
                // Mobile: add to localStorage
                const newEntry: SalaryEntry = {
                    ...salary,
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
                };
                const data = loadFromLocalStorage();
                data.push(newEntry);
                saveToLocalStorage(data);
                salaries.value = data;
                return newEntry;
            } else {
                // Web: use API
                const newEntry = await $fetch<SalaryEntry>('/api/salaries', {
                    method: 'POST',
                    body: salary
                });
                await fetchSalaries();
                return newEntry;
            }
        } catch (e) {
            error.value = 'Erreur lors de la création du salaire';
            console.error(e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    // Update a salary entry
    const updateSalary = async (id: string, updates: Partial<Omit<SalaryEntry, 'id'>>) => {
        loading.value = true;
        error.value = null;

        try {
            if (isNative) {
                // Mobile: update in localStorage
                const data = loadFromLocalStorage();
                const index = data.findIndex(s => s.id === id);
                if (index !== -1) {
                    data[index] = { ...data[index], ...updates };
                    saveToLocalStorage(data);
                    salaries.value = data;
                    return data[index];
                }
                throw new Error('Salary not found');
            } else {
                // Web: use API
                const updated = await $fetch<SalaryEntry>(`/api/salaries/${id}`, {
                    method: 'PUT',
                    body: updates
                });
                await fetchSalaries();
                return updated;
            }
        } catch (e) {
            error.value = 'Erreur lors de la mise à jour du salaire';
            console.error(e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    // Delete a salary entry
    const deleteSalary = async (id: string) => {
        loading.value = true;
        error.value = null;

        try {
            if (isNative) {
                // Mobile: remove from localStorage
                const data = loadFromLocalStorage();
                const filtered = data.filter(s => s.id !== id);
                saveToLocalStorage(filtered);
                salaries.value = filtered;
            } else {
                // Web: use API
                await $fetch(`/api/salaries/${id}`, {
                    method: 'DELETE'
                });
                await fetchSalaries();
            }
        } catch (e) {
            error.value = 'Erreur lors de la suppression du salaire';
            console.error(e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return {
        salaries: readonly(salaries),
        loading: readonly(loading),
        error: readonly(error),
        fetchSalaries,
        createSalary,
        updateSalary,
        deleteSalary,
        isNative
    };
};
