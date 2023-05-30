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
            <div class="w-4/5 text-lg">
                So the idea here is to get an overview of all the scraped data 
                call this a library, archive or whatever you want.
                It's not finished yet. I want to implement a way to easelly scrape several
                websites and store the data in different _db.json files depending on the type of 
                data on the webpage. This scraped data should then be visible from here so that 
                users can see the entirety of their collection. So far only the data from the top
                250 movies from IMDb are avalable.
                 
            </div>
        </div>
        <div class="flex justify-center">
            <button @click="showArchive" class="text-lg my-4 py-2 px-4 border-b border-slate-400 hover:font-semibold hover:border-slate-500">
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
    archiveVisible.value = !archiveVisible.value
}
</script>
