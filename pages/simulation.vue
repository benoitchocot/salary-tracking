<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-800 mb-6">Simulation d'Augmentation</h2>
    
    <div v-if="loading" class="text-center py-8">
      <p class="text-slate-600">Chargement...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <div v-else>
      <!-- Simulation Controls -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 class="text-lg font-semibold text-slate-700 mb-4">Paramètres de Simulation</h3>
        
        <div class="flex items-end gap-4">
          <div class="w-48">
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Année de référence
            </label>
            <select
              v-model="selectedYear"
              class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les années</option>
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Pourcentage d'augmentation (%)
            </label>
            <input
              v-model.number="increasePercentage"
              type="number"
              step="0.1"
              min="0"
              max="100"
              class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            @click="runSimulation"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Simuler
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-if="simulatedSalaries.length > 0" class="space-y-6">
        <!-- Comparison Summary -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-slate-700 mb-4">Comparaison Annuelle</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Current -->
            <div>
              <h4 class="text-sm font-medium text-slate-600 mb-3">Actuel</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-slate-600">Brut annuel:</span>
                  <span class="font-semibold">{{ formatCurrency(currentTotals.grossSalary) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Net annuel:</span>
                  <span class="font-semibold text-green-700">{{ formatCurrency(currentTotals.netSalary) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Net après impôt:</span>
                  <span class="font-semibold text-green-800">{{ formatCurrency(currentTotals.netAfterTax) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Simulated -->
            <div>
              <h4 class="text-sm font-medium text-slate-600 mb-3">
                Avec +{{ increasePercentage }}%
              </h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-slate-600">Brut annuel:</span>
                  <span class="font-semibold">{{ formatCurrency(simulatedTotals.grossSalary) }}</span>
                  <span class="text-sm text-green-600">
                    +{{ formatCurrency(simulatedTotals.grossSalary - currentTotals.grossSalary) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Net annuel:</span>
                  <span class="font-semibold text-green-700">{{ formatCurrency(simulatedTotals.netSalary) }}</span>
                  <span class="text-sm text-green-600">
                    +{{ formatCurrency(simulatedTotals.netSalary - currentTotals.netSalary) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Net après impôt:</span>
                  <span class="font-semibold text-green-800">{{ formatCurrency(simulatedTotals.netAfterTax) }}</span>
                  <span class="text-sm text-green-600">
                    +{{ formatCurrency(simulatedTotals.netAfterTax - currentTotals.netAfterTax) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Details -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-slate-700 mb-4">Détails Mensuels Simulés</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="salary in simulatedSalaries"
              :key="salary.id"
              class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200"
            >
              <h4 class="text-md font-bold text-slate-800 mb-2">{{ salary.monthYear }}</h4>
              
              <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-600">Brut:</span>
                  <span class="font-semibold">{{ formatCurrency(salary.grossSalary) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Net:</span>
                  <span class="font-semibold text-green-700">{{ formatCurrency(salary.netSalary) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Net après impôt:</span>
                  <span class="font-semibold text-green-800">{{ formatCurrency(salary.netAfterTax) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="salaries.length === 0" class="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
        <p class="text-slate-600">Aucune donnée disponible pour la simulation.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SalaryEntry } from '~/shared/salary';
import { calculateTotals } from '~/utils/salaryHelpers';

const { salaries, loading, error, fetchSalaries } = useSalaries();
const { simulateIncrease, calculateAnnualTotal } = useSimulation();

const increasePercentage = ref(5);
const simulatedSalaries = ref<SalaryEntry[]>([]);
const selectedYear = ref<string>('');

// Get unique years from salaries
const availableYears = computed(() => {
  const years = new Set(salaries.value.map(s => s.monthYear.split('/')[1]));
  return Array.from(years).sort().reverse();
});

// Filter salaries based on selected year
const filteredSalaries = computed(() => {
  if (!selectedYear.value) return salaries.value;
  return salaries.value.filter(s => s.monthYear.endsWith(selectedYear.value));
});

const currentTotals = computed(() => {
  return calculateTotals(filteredSalaries.value);
});

const simulatedTotals = computed(() => {
  return calculateTotals(simulatedSalaries.value);
});

const runSimulation = () => {
  simulatedSalaries.value = simulateIncrease(filteredSalaries.value, increasePercentage.value);
};

// Watch for salaries to set default year
watch(salaries, (newSalaries) => {
  if (newSalaries.length > 0 && !selectedYear.value) {
    const years = availableYears.value;
    if (years.length > 0) {
      selectedYear.value = years[0];
    }
  }
});

// Load salaries on mount
onMounted(() => {
  fetchSalaries();
});
</script>
