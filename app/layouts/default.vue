<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'


const { data } = await useAsyncData('main', () => queryContent('/main').find())
const links = mapContentNavigation(data.value!)

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)
</script>

<template>
  <div>
    <UHeader :links title="Kmilo" />

    <UMain>
      <slot />
    </UMain>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </div>
</template>
