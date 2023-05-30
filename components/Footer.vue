<template>
    <div class="w-full text-center text-xl text-white bg-blue-500 py-12">
        Copyright
        &copy;
        {{ currentYear }}
        by Erling Blomberg, all rights reserved.
    </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
