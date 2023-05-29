<!-- <template>
    <div>
        <Header />
        <div class="flex justify-center">
            <button @click="showArchive" class="text-lg my-4 py-2 px-4 border-b border-slate-400">
                View Archive
            </button>
        </div>
        <div class="w-full flex flex-col items-center justify-center">
            <div class="w-4/5 grid grid-cols-5 gap-4">
                <div v-for="film in films" :key="film.id" class="flex flex-col  items-center p-8">
                    <div class="p-4 bg-gradient-to-br from-blue-700 to-slate-400">
                        <img :src="film.imageSrc" :alt="film.title" class="w-24" />
                    </div>
                    <span class="border-b-2 border-slate-400 pt-2 w-32"></span>
                    <div class="px-4 text-lg text-left">
                        <span class="font-medium">{{ film.title }}</span>
                        <br />
                        Placement: {{ film.id }}
                        <br>
                        Rating: {{ film.rating }}
                        <br>
                        Length : {{ film.len }} 
                        <br>
                        Year: {{ film.year }}
                    </div>
                    <span class="border-b-2 border-slate-400 pt-2 w-32"></span>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
useHead({ title: 'Web Scraping IMDb' })
const { data: films } = await useFetch('http://localhost:4000/films')
if (!films) { console.log("Failed to fetch posts") }
</script> -->

<template>
    <div>
        <Header />
        <div class="flex justify-center">
            <button @click="showArchive" class="text-lg my-4 py-2 px-4 border-b border-slate-400">
                View Archive
            </button>
        </div>
        <div v-if="archiveVisible" class="w-full flex flex-col items-center justify-center">
            <div class="w-4/5 grid grid-cols-5 gap-4">
                <div v-for="film in films" :key="film.id" class="flex flex-col items-center p-8">
                    <div class="p-4 bg-gradient-to-br from-blue-700 to-slate-400">
                        <img :src="film.imageSrc" :alt="film.title" class="w-24" />
                    </div>
                    <span class="border-b-2 border-slate-400 pt-2 w-32"></span>
                    <div class="px-4 text-lg text-left">
                        <span class="font-medium">{{ film.title }}</span>
                        <br />
                        Placement: {{ film.id }}
                        <br>
                        Rating: {{ film.rating }}
                        <br>
                        Length: {{ film.len }}
                        <br>
                        Year: {{ film.year }}
                    </div>
                    <span class="border-b-2 border-slate-400 pt-2 w-32"></span>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref } from 'vue'
useHead({ title: 'Web Scraping IMDb' })
const archiveVisible = ref(false)
const { data: films } = await useFetch('http://localhost:4000/films')
if (!films) { console.log("Failed to fetch posts") }
function showArchive () {
    archiveVisible.value = true
}
</script>
