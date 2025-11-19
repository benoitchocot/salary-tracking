<template>
  <div>
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-slate-800">Gestion des Salaires</h2>
        <button
          @click="openModal"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <span>+</span>
          <span>Ajouter un salaire</span>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-slate-700">
            {{ editingId ? 'Modifier' : 'Ajouter' }} un salaire
          </h3>
          <button
            @click="closeModal"
            class="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Mois/Année
              </label>
              <input
                v-model="monthYearInput"
                type="month"
                required
                class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Salaire Brut (€)
              </label>
              <input
                v-model.number="form.grossSalary"
                type="number"
                step="0.01"
                required
                class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Salaire Net (€)
              </label>
              <input
                v-model.number="form.netSalary"
                type="number"
                step="0.01"
                required
                class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Net après Impôt (€)
              </label>
              <input
                v-model.number="form.netAfterTax"
                type="number"
                step="0.01"
                required
                class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                Impôt Payé (€)
              </label>
              <input
                v-model.number="form.taxPaid"
                type="number"
                step="0.01"
                required
                class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div class="flex gap-3 justify-end">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {{ editingId ? 'Mettre à jour' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Salary List -->
    <div>
      <h3 class="text-xl font-semibold text-slate-800 mb-4">Liste des Salaires</h3>
      
      <div v-if="loading" class="text-center py-8">
        <p class="text-slate-600">Chargement...</p>
      </div>
      
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-700">{{ error }}</p>
      </div>
      
      <div v-else-if="salaries.length === 0" class="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
        <p class="text-slate-600">Aucun salaire enregistré. Ajoutez-en un ci-dessus !</p>
      </div>
      
      <div v-else class="space-y-4">
        <details
          v-for="year in sortedYears"
          :key="year"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <summary class="cursor-pointer px-6 py-4 font-bold text-lg text-slate-800 hover:bg-slate-50 transition-colors flex justify-between items-center">
            <span>Année {{ year }}</span>
            <span class="text-sm font-normal text-slate-600">{{ salariesByYear[year].length }} mois</span>
          </summary>
          
          <div class="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="salary in salariesByYear[year]"
              :key="salary.id"
              class="bg-slate-50 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start mb-3">
                <h4 class="text-md font-bold text-slate-800">{{ salary.monthYear }}</h4>
                <div class="flex gap-2">
                  <button
                    @click="editSalary(salary)"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    ✏️
                  </button>
                  <button
                    @click="handleDelete(salary.id)"
                    class="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-600">Brut:</span>
                  <span class="font-semibold text-slate-800">{{ formatCurrency(salary.grossSalary) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Net:</span>
                  <span class="font-semibold text-green-700">{{ formatCurrency(salary.netSalary) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Net après impôt:</span>
                  <span class="font-semibold text-green-800">{{ formatCurrency(salary.netAfterTax) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Impôt:</span>
                  <span class="font-semibold text-red-600">{{ formatCurrency(salary.taxPaid) }}</span>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SalaryEntry } from '~/shared/salary';
import { sortByMonthYear, getCurrentMonthYear } from '~/utils/dateHelpers';

const { salaries, loading, error, fetchSalaries, createSalary, updateSalary, deleteSalary } = useSalaries();

const isModalOpen = ref(false);
const editingId = ref<string | null>(null);
const form = ref({
  monthYear: getCurrentMonthYear(),
  grossSalary: 0,
  netSalary: 0,
  netAfterTax: 0,
  taxPaid: 0
});

// Convert MM/YYYY to YYYY-MM for input type="month"
const monthYearInput = computed({
  get: () => {
    const [month, year] = form.value.monthYear.split('/');
    return `${year}-${month}`;
  },
  set: (value: string) => {
    const [year, month] = value.split('-');
    form.value.monthYear = `${month}/${year}`;
  }
});

// Group salaries by year
const salariesByYear = computed(() => {
  const grouped: Record<string, SalaryEntry[]> = {};
  
  for (const salary of salaries.value) {
    const year = salary.monthYear.split('/')[1];
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(salary);
  }
  
  // Sort salaries within each year
  for (const year in grouped) {
    grouped[year].sort((a, b) => sortByMonthYear(b.monthYear, a.monthYear));
  }
  
  return grouped;
});

// Get sorted years (descending)
const sortedYears = computed(() => {
  return Object.keys(salariesByYear.value).sort().reverse();
});

// Load salaries on mount
onMounted(() => {
  fetchSalaries();
});

const handleSubmit = async () => {
  try {
    if (editingId.value) {
      await updateSalary(editingId.value, form.value);
    } else {
      await createSalary(form.value);
    }
    resetForm();
    closeModal();
  } catch (e) {
    console.error('Error submitting form:', e);
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  if (editingId.value) {
    resetForm();
  }
};

const editSalary = (salary: SalaryEntry) => {
  editingId.value = salary.id;
  form.value = {
    monthYear: salary.monthYear,
    grossSalary: salary.grossSalary,
    netSalary: salary.netSalary,
    netAfterTax: salary.netAfterTax,
    taxPaid: salary.taxPaid
  };
  openModal();
};



const handleDelete = async (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce salaire ?')) {
    await deleteSalary(id);
  }
};

const resetForm = () => {
  editingId.value = null;
  form.value = {
    monthYear: getCurrentMonthYear(),
    grossSalary: 0,
    netSalary: 0,
    netAfterTax: 0,
    taxPaid: 0
  };
};
</script>
