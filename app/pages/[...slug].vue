<template>
  <div>
    <nav class="container max-w-4xl mx-auto p-4">
      <ul class="flex justify-end gap-4">
        <li
          class="list-none"
        >
          <NuxtLink to="/">
            Kmilo
          </NuxtLink>
        </li>
        <ContentList
          v-slot="{ list }"
          path="/main"
        >
          <li
            v-for="article in list"
            :key="article._path"
            class="list-none"
          >
            <NuxtLink :to="article._path">
              {{ article.title }}
            </NuxtLink>
          </li>
        </ContentList>
      </ul>
    </nav>
    <main class="container max-w-4xl mx-auto px-4">
      <ContentDoc />
    </main>
  </div>
</template>
