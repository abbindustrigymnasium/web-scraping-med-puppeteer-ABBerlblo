<template>
    <div class="w-full text-center text-lg text-white bg-slate-500 py-8">
        Copyright
        &copy;
        {{ year }}
        by Erling, all rights reserved.
    </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
