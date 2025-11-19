<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-800 mb-6">Bilan Annuel</h2>
    
    <div v-if="loading" class="text-center py-8">
      <p class="text-slate-600">Chargement...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <div v-else-if="Object.keys(salariesByYear).length === 0" class="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
      <p class="text-slate-600">Aucune donnée disponible.</p>
    </div>
    
    <div v-else class="space-y-6">
      <div
        v-for="year in sortedYears"
        :key="year"
        class="bg-white rounded-lg shadow-md p-6"
      >
        <h3 class="text-xl font-bold text-slate-800 mb-4">Année {{ year }}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-sm text-slate-600 mb-1">Total Brut</p>
            <div class="flex items-baseline gap-2">
              <p class="text-2xl font-bold text-blue-700">{{ formatCurrency(yearTotals[year].grossSalary) }}</p>
              <div 
                v-if="yearTotals[getPreviousYear(year)]"
                class="flex flex-col items-end text-xs"
              >
                <span 
                  class="font-medium"
                  :class="calculateEvolution(yearTotals[year].grossSalary, yearTotals[getPreviousYear(year)].grossSalary) >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  {{ calculateEvolution(yearTotals[year].grossSalary, yearTotals[getPreviousYear(year)].grossSalary) >= 0 ? '+' : '' }}
                  {{ formatCurrency(calculateEvolution(yearTotals[year].grossSalary, yearTotals[getPreviousYear(year)].grossSalary)) }}
                </span>
                <span 
                  class="font-medium"
                  :class="calculatePercentageEvolution(yearTotals[year].grossSalary, yearTotals[getPreviousYear(year)].grossSalary) >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  ({{ calculatePercentageEvolution(yearTotals[year].grossSalary, yearTotals[getPreviousYear(year)].grossSalary) >= 0 ? '+' : '' }}{{ calculatePercentageEvolution(yearTotals[year].grossSalary, yearTotals[getPreviousYear(year)].grossSalary).toFixed(1) }}%)
                </span>
              </div>
            </div>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4">
            <p class="text-sm text-slate-600 mb-1">Total Net</p>
            <div class="flex items-baseline gap-2">
              <p class="text-2xl font-bold text-green-700">{{ formatCurrency(yearTotals[year].netSalary) }}</p>
              <div 
                v-if="yearTotals[getPreviousYear(year)]"
                class="flex flex-col items-end text-xs"
              >
                <span 
                  class="font-medium"
                  :class="calculateEvolution(yearTotals[year].netSalary, yearTotals[getPreviousYear(year)].netSalary) >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  {{ calculateEvolution(yearTotals[year].netSalary, yearTotals[getPreviousYear(year)].netSalary) >= 0 ? '+' : '' }}
                  {{ formatCurrency(calculateEvolution(yearTotals[year].netSalary, yearTotals[getPreviousYear(year)].netSalary)) }}
                </span>
                <span 
                  class="font-medium"
                  :class="calculatePercentageEvolution(yearTotals[year].netSalary, yearTotals[getPreviousYear(year)].netSalary) >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  ({{ calculatePercentageEvolution(yearTotals[year].netSalary, yearTotals[getPreviousYear(year)].netSalary) >= 0 ? '+' : '' }}{{ calculatePercentageEvolution(yearTotals[year].netSalary, yearTotals[getPreviousYear(year)].netSalary).toFixed(1) }}%)
                </span>
              </div>
            </div>
          </div>
          
          <div class="bg-emerald-50 rounded-lg p-4">
            <p class="text-sm text-slate-600 mb-1">Total Net après Impôt</p>
            <div class="flex items-baseline gap-2">
              <p class="text-2xl font-bold text-emerald-700">{{ formatCurrency(yearTotals[year].netAfterTax) }}</p>
              <div 
                v-if="yearTotals[getPreviousYear(year)]"
                class="flex flex-col items-end text-xs"
              >
                <span 
                  class="font-medium"
                  :class="calculateEvolution(yearTotals[year].netAfterTax, yearTotals[getPreviousYear(year)].netAfterTax) >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  {{ calculateEvolution(yearTotals[year].netAfterTax, yearTotals[getPreviousYear(year)].netAfterTax) >= 0 ? '+' : '' }}
                  {{ formatCurrency(calculateEvolution(yearTotals[year].netAfterTax, yearTotals[getPreviousYear(year)].netAfterTax)) }}
                </span>
                <span 
                  class="font-medium"
                  :class="calculatePercentageEvolution(yearTotals[year].netAfterTax, yearTotals[getPreviousYear(year)].netAfterTax) >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  ({{ calculatePercentageEvolution(yearTotals[year].netAfterTax, yearTotals[getPreviousYear(year)].netAfterTax) >= 0 ? '+' : '' }}{{ calculatePercentageEvolution(yearTotals[year].netAfterTax, yearTotals[getPreviousYear(year)].netAfterTax).toFixed(1) }}%)
                </span>
              </div>
            </div>
          </div>
          
          <div class="bg-red-50 rounded-lg p-4">
            <p class="text-sm text-slate-600 mb-1">Total Impôts</p>
            <div class="flex items-baseline gap-2">
              <p class="text-2xl font-bold text-red-600">{{ formatCurrency(yearTotals[year].taxPaid) }}</p>
              <div 
                v-if="yearTotals[getPreviousYear(year)]"
                class="flex flex-col items-end text-xs"
              >
                <span 
                  class="font-medium"
                  :class="calculateEvolution(yearTotals[year].taxPaid, yearTotals[getPreviousYear(year)].taxPaid) >= 0 ? 'text-red-600' : 'text-green-600'"
                >
                  {{ calculateEvolution(yearTotals[year].taxPaid, yearTotals[getPreviousYear(year)].taxPaid) >= 0 ? '+' : '' }}
                  {{ formatCurrency(calculateEvolution(yearTotals[year].taxPaid, yearTotals[getPreviousYear(year)].taxPaid)) }}
                </span>
                <span 
                  class="font-medium"
                  :class="calculatePercentageEvolution(yearTotals[year].taxPaid, yearTotals[getPreviousYear(year)].taxPaid) >= 0 ? 'text-red-600' : 'text-green-600'"
                >
                  ({{ calculatePercentageEvolution(yearTotals[year].taxPaid, yearTotals[getPreviousYear(year)].taxPaid) >= 0 ? '+' : '' }}{{ calculatePercentageEvolution(yearTotals[year].taxPaid, yearTotals[getPreviousYear(year)].taxPaid).toFixed(1) }}%)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-sm text-slate-600">
          <p>{{ salariesByYear[year].length }} mois enregistré(s)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { groupSalariesByYear, calculateTotals } from '~/utils/salaryHelpers';

const { salaries, loading, error, fetchSalaries } = useSalaries();

// Group salaries by year
const salariesByYear = computed(() => {
  return groupSalariesByYear(salaries.value);
});

// Calculate totals for each year
const yearTotals = computed(() => {
  const totals: Record<string, any> = {};
  
  for (const [year, yearSalaries] of Object.entries(salariesByYear.value)) {
    totals[year] = calculateTotals(yearSalaries);
  }
  
  return totals;
});

// Sort years in descending order
const sortedYears = computed(() => {
  return Object.keys(salariesByYear.value).sort().reverse();
});

// Calculate evolution between two values
const calculateEvolution = (current: number, previous: number) => {
  return current - previous;
};

// Calculate percentage evolution
const calculatePercentageEvolution = (current: number, previous: number) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Get previous year for a given year
const getPreviousYear = (year: string) => {
  const yearNum = parseInt(year);
  return (yearNum - 1).toString();
};

// Load salaries on mount
onMounted(() => {
  fetchSalaries();
});
</script>
