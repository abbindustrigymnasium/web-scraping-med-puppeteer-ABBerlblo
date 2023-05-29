<template>
    <div>
        <Header />
        <div class="w-full flex flex-col items-center justify-center">
            <span class="border-b-2 border-slate-400 w-3/5 my-4"></span>
            <div class="grid grid-cols-4 gap-8 text-lg pt-6">
                <input type="text" placeholder="Search by year" v-model="searchYear"
                    class="border-b-2 border-slate-400 text-center w-4/5" />
                <input type="text" placeholder="Search by rating" v-model="searchRating"
                    class="border-b-2 border-slate-400 text-center w-4/5" />
                <input type="text" placeholder="Search by length" v-model="searchLength"
                    class="border-b-2 border-slate-400 text-center w-4/5" />
                <input type="text" placeholder="Search by genres" v-model="searchGenres"
                    class="border-b-2 border-slate-400 text-center w-4/5" />
            </div>
            <!-- <div>
                <button class="text-lg font-medium m-4 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white">
                    Search
                </button>
            </div> -->
            <div>
                <input type="text" placeholder="Sort by..." v-model="sortBy"
                    class="border-b-2 border-slate-400 text-center w-4/5 text-lg mt-6">
            </div>
            <span class="border-b-2 border-slate-400 w-3/5 my-4"></span>
        </div>
        <div class="w-full flex flex-col items-center justify-center">
            <div class="w-4/5 grid grid-cols-5 gap-4">
                <div v-for="film in visibleFilms" :key="film.id" class="flex flex-col  items-center p-8">
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
        <div v-if="visibleFilms.length < allFilms.length" class="flex justify-center">
            <button @click="showMore" class="text-lg my-4 py-2 px-4 border-b border-slate-400">
                Show more...
            </button>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const allFilms = ref([])
const visibleFilms = ref([])
const batchSize = 10
let batchCounter = 0

const searchYear = ref('')
const searchRating = ref('')
const searchLength = ref('')

const searchGenres = ref('')
const sortBy = ref('')

watch([searchYear, searchRating, searchLength, sortBy], ([year, rating, length, sort]) => {
    exeSearch(year, rating, length, sort)
})

const parseOperatorValue = (type, value) => {
    const args = value.split('&')
    const params = []

    args.forEach((arg) => {
        const operator = arg[0]
        const parsedValue = arg.slice(1)

        let param

        switch (operator) {
            case '=':
                param = `${type}=${parsedValue}`
                break
            case '<':
                param = `${type}_lte=${parsedValue}`
                break
            case '>':
                param = `${type}_gte=${parsedValue}`
                break
            case '!':
                param = `${type}_ne=${parsedValue}`
                break
            default:
                // Treat as default "exact" operator
                param = `${type}=${arg}`
                break
        }

        if (param) {
            params.push(param)
        }
    })

    return params.join('&')
}

// const getSortParam = (sortByValue) => {
//     if (sortByValue.startsWith('<')) {
//         const sortField = sortByValue.slice(1)
//         return `_sort=${sortField}&_order=asc`
//     }

//     if (sortByValue.startsWith('>')) {
//         const sortField = sortByValue.slice(1)
//         return `_sort=${sortField}&_order=desc`
//     }

//     return null // Return null if sortByValue is empty or doesn't match the expected format
// }

const getSortParam = (value) => {
    const argument = value.split('&')
    const sortValues = []
    const sortOrders = []

    argument.forEach((arg) => {
        let operator = '='
        let argValue = arg

        if (arg.startsWith('<')) {
            operator = '<'
            argValue = arg.slice(1)
        } else if (arg.startsWith('>')) {
            operator = '>'
            argValue = arg.slice(1)
        }

        sortValues.push(argValue)
        sortOrders.push(operator === '<' ? 'asc' : 'desc')
    })

    const sortParam = sortValues.join(',')
    const orderParam = sortOrders.join(',')

    return `_sort=${sortParam}&_order=${orderParam}`
}

const exeSearch = async (year, rating, len) => {
    const params = []

    const parseAndPushParam = (type, value) => {
        if (value) {
            const parsedParam = parseOperatorValue(type, value)
            params.push(parsedParam)
        }
    }

    parseAndPushParam('year', year)
    parseAndPushParam('rating', rating)
    parseAndPushParam('len', len)

    const sortParam = getSortParam(sortBy.value)
    if (sortParam) {
        params.push(sortParam)
    }

    const queryParams = params.join('&')

    console.log(`http://localhost:4000/films${queryParams ? `?${queryParams}` : ''}`)
    try {
        const response = await axios.get(`http://localhost:4000/films${queryParams ? `?${queryParams}` : ''}`)
        const films = response.data

        allFilms.value = films
        batchCounter = 0
        showMore()
    } catch (err) {
        console.error('Error retrieving films:', err)
    }
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:4000/films')
        allFilms.value = response.data
        showMore()
    } catch (err) {
        console.error('Error retrieving films:', err)
    }
})

const showMore = () => {
    const end = (batchCounter + 1) * batchSize
    visibleFilms.value = allFilms.value.slice(0, end)
    batchCounter++
}
</script>