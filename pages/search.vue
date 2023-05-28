<template>
    <div>
        <Header />
        <div>
            <input type="text" placeholder="search" />
        </div>
        <div class="flex flex-wrap">
            <div v-for="film in visibleFilms" :key="film.id" class="flex flex-col justify-center items-center p-8">
                <img :src="film.imageSrc" :alt="film.title" class="w-32" />
                {{ film.title }}
                <br />
                Rating: {{ film.rating }}
                <span v-for="genre in film.genres" :key="genre">{{ genre }}</span>
            </div>
        </div>
        <div v-if="visibleFilms.length < filteredFilms.length">
            <button @click="showMore" class="my-4 py-2 px-4 border border-gray-500 rounded">
                Show more
            </button>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const filteredFilms = ref([])
const visibleFilms = ref([])
const batchSize = 10
let batchCounter = 0

axios.get('http://localhost:4000/films')
    .then(response => {
        const films = response.data

        // Filter films based on genres
        filteredFilms.value = films.filter(film => film.genres.includes('Crime') && film.genres.includes('Drama'))

        // Initialize visibleFilms with the first batch of films
        showMore()
    })
    .catch(error => {
        console.error('Error retrieving films:', error)
    })

const showMore = () => {
    const end = (batchCounter + 1) * batchSize
    visibleFilms.value = filteredFilms.value.slice(0, end)
    batchCounter++
}
</script>
