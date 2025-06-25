<template>
  <code
    class="inline-code font-mono relative rounded bg-primary-100/20 border border-primary-100/50 px-[4px] py-[1px] font-mono"
  >
    <slot />
  </code>
</template>

<style scoped>
.inline-code:not(
  h1 > code,
  h1 > a > code,
  h2 > a > code,
  h3 > a > code,
  h4 > a > code,
  h5 > a > code,
  strong > a > code
) {
  /* text-sm */
  font-size: 0.875rem;
}
</style>
