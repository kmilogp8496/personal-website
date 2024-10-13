<script setup lang="ts">
defineProps<{
  path: string
}>()
</script>

<template>
  <ContentList :path>
    <template #default="{ list }">
      <li
        v-for="item in list"
        :key="item._path"
      >
        <NuxtLink :to="item._path">
          {{ item.title }}
        </NuxtLink>
      </li>
    </template>
  </ContentList>
</template>
