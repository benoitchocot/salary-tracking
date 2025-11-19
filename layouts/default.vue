<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <header class="bg-white shadow-sm border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl font-bold text-slate-800">💰 Suivi de Salaires</h1>
      </div>
    </header>

    <nav class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <NuxtLink
            to="/"
            class="px-3 py-4 text-sm font-medium border-b-2 transition-colors"
            :class="$route.path === '/' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'"
          >
            Salaires
          </NuxtLink>
          <NuxtLink
            to="/annual-summary"
            class="px-3 py-4 text-sm font-medium border-b-2 transition-colors"
            :class="$route.path === '/annual-summary' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'"
          >
            Bilan Annuel
          </NuxtLink>
          <NuxtLink
            to="/simulation"
            class="px-3 py-4 text-sm font-medium border-b-2 transition-colors"
            :class="$route.path === '/simulation' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'"
          >
            Simulation
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
