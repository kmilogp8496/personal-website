<script setup lang="ts">
const props = defineProps<{
  url: string
  language: string
  filename?: string
}>()

const code = await $fetch<string>(props.url)

const value = `
\`\`\`${props.language} ${props.filename ?? ''}
${code}
\`\`\`
`
</script>

<template>
  <div class="max-w-full overflow-hidden">
    <MDC :value />
  </div>
</template>
