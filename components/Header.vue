<template>
    <div class="w-full flex flex-col items-center justify-center text-blue-700 text-5xl py-8">
        Film Finder
        <span class="border-b-2 border-blue-700 w-4/5 my-4"></span>
        <div class="w-3/5 text-xl flex justify-around">
            <NuxtLink to="/about">About</NuxtLink>
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/search">Search</NuxtLink>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.router-link-exact-active {
    font-weight: 700;
}
</style>
