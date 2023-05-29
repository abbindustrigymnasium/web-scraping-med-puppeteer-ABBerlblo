<template>
    <div class="w-full text-center text-xl text-white bg-slate-500 py-12">
        Copyright
        &copy;
        {{ year }}
        by Erling Blomberg, all rights reserved.
    </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
