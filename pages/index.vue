<template>
    <div>
        <Header />
        <div class="flex flex-wrap">
            <div v-for="film in films" :key="film.id" class="flex flex-col justify-center items-center p-8">
                <img :src="film.imageSrc" :alt="film.title" class="w-32" />
                {{ film.title }}
                <br>
                Rating: {{ film.rating }}
                <span v-for="genre in film.genres" :key="genre">{{ genre }}</span>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
useHead({ title: 'Web Scraping IMDb' })
const { data: films } = await useFetch('http://localhost:4000/films')
if (!films) { console.log("Failed to fetch posts") }
</script>