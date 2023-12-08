<script setup lang="ts">
defineProps(['stocks'])
</script>

<template>
  <ul>
    <li v-for="stock in stocks">
      {{ stock.item }}
    </li>
  </ul>
</template>
