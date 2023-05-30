<template>
  <div>
    <Header />
    <div class="w-full flex flex-col items-center justify-center">
      <span class="border-b-2 border-slate-400 w-3/5 my-4"></span>

        <div class="w-3/5 flex justify-between">
            <div class="py-4 pr-4">
                <div class="text-xl text-blue-700">
                    Search by year, rating, or length
                </div>
                <div>
                    <div class="text-lg font-semibold text-slate-700 w-full">
                        Structure
                    </div>
                    <div>
                        An argument contains an operator in front of a value
                    <br />
                        If you want to use multiple arguments, they should be connected with "&"
                        <br />
                        For example: !X&>Y, where X and Y are two different values
                        </div>
                        <div class="text-lg font-semibold text-slate-700 w-full">
                        Supported Operations
                    </div>
                    <div>
                        <div>
                            "=" stands for equal to and returns films that match the value
                        </div>
                        <div>
                            "&lt;" stands for less than and returns films that have a lesser value
                        </div>
                        <div>
                            ">" stands for greater than and returns films that have a greater value
                        </div>
                        <div>
                            "!" stands for not equal to and returns films that don't match the value
                        </div>
                    </div>
                    <div class="text-lg font-semibold text-slate-700 w-full">
                        Supported Values
                    </div>
                    <div>
                        <div>All values for years should be written with four numbers</div>
                        <div>All values for ratings should be written with one digit</div>
                        <div>All values for the length should be written in minutes</div>
                    </div>
                </div>
            </div>

            <div class="p-4">
                <div class="text-xl text-blue-700">
                    Search by genres
                </div>
                <div>
                    <div class="text-lg font-semibold text-slate-700 w-full">
                        Structure
                    </div>
                    <div>
                        An argument contains an operator in front of a value
                        <br />
                        If you want to use multiple arguments, they should be connected with "&"
                        <br />
                        For example: !X&>Y, where X and Y are two different values
                    </div>
                    <div class="text-lg font-semibold text-slate-700 w-full">
                        Supported Operations
                    </div>
                    <div>
                        <div>
                            "=" stands for equal to and returns only films that match the value
                        </div>
                        <!-- <div>"/" stands for  and returns films  the value</div> -->
                        <div>
                            "!" stands for not equal to and returns films that don't match the value
                        </div>
                    </div>
                    <div class="text-lg font-semibold text-slate-700 w-full">
                        Supported Values
                    </div>    
                    <div>Any genre, as long as the first letter is capitalized</div>
                </div>
            </div>

            <div class="py-4 pl-4">
                <div class="text-xl text-blue-700">
                    Sort by...
                </div>
                <div>
                    <div class="text-lg font-semibold text-slate-700 w-full">
                        Structure
                    </div>
                    <div>
                        An argument contains an operator in front of a category
                        <br />
                        If you want to use multiple arguments, they should be connected with "&"
                        <br />
                        For example: &lt;X&>Y, where X and Y are two different categories
                    </div>
                    <div class="text-lg font-semibold text-slate-700 w-full">
                        Supported Operations
                    </div>
                    <div>
                        <div>
                            "&lt;" stands for ascending and sorts the films by the value in ascending order
                        </div>
                        <div>
                            ">" stands for descending and sorts the films by the value in descending order
                        </div>
                    </div>
                    <div class="text-lg font-semibold text-slate-700 w-full">
                        Supported Categories
                    </div>
                        <div>Year, Rating, length, or id</div>
                </div>
            </div>
        </div>

      <div class="">
        <div class="grid grid-cols-3 gap-8 text-lg pt-6">
          <input
            type="text"
            placeholder="Search by year"
            v-model="searchYear"
            class="border-b-2 border-slate-400 text-center w-4/5"
          />
          <input
            type="text"
            placeholder="Search by rating"
            v-model="searchRating"
            class="border-b-2 border-slate-400 text-center w-4/5"
          />
          <input
            type="text"
            placeholder="Search by length"
            v-model="searchLength"
            class="border-b-2 border-slate-400 text-center w-4/5"
          />
          <input
            type="text"
            placeholder="Search by genres"
            v-model="searchGenres"
            class="border-b-2 border-slate-400 text-center w-4/5"
          />
          <input
            type="text"
            placeholder="Sort by..."
            v-model="sortBy"
            class="border-b-2 border-slate-400 text-center w-4/5"
          />
        </div>
      </div>
      <span class="border-b-2 border-slate-400 w-3/5 my-4"></span>

      <div class="w-full flex flex-col items-center justify-center">
        <div class="w-4/5 grid grid-cols-5 gap-4">
          <div v-for="film in visibleFilms" :key="film.id" class="flex flex-col items-center p-8">
            <div class="p-4 bg-gradient-to-br from-blue-700 to-slate-400">
              <img :src="film.imageSrc" :alt="film.title" class="w-24" />
            </div>
            <span class="border-b-2 border-slate-400 pt-2 w-32"></span>
            <div class="px-4 text-lg text-left">
              <span class="font-medium">{{ film.title }}</span>
              <br />
              Placement: {{ film.id }}
              <br />
              Rating: {{ film.rating }}
              <br />
              Length: {{ film.len }}
              <br />
              Year: {{ film.year }}
            </div>
            <span class="border-b-2 border-slate-400 pt-2 w-32"></span>
          </div>
        </div>
      </div>

      <div v-if="showMoreVisible" class="flex justify-center">
        <button @click="showMore" class="text-lg my-4 py-2 px-4 border-b border-slate-400">
          Show more...
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const allFilms = ref([])
const filteredFilms = ref([])

const visibleFilms = ref([]) 
const batchSize = 10
let batchCounter = 0
let showMoreVisible = true

const searchYear = ref('')
const searchRating = ref('')
const searchLength = ref('')

const searchGenres = ref('')
const sortBy = ref('')

const filterFilmsByGenre = () => {
  const genreValue = searchGenres.value.trim()
  if (!genreValue) {
    filteredFilms.value = allFilms.value
    return
  }

  const args = genreValue.split('&')
  const exactGenres = []
  const excludeGenres = []
  const containsGenres = []

  args.forEach((arg) => {
    const operator = arg[0]
    const genre = arg.slice(1).trim()

    if (operator === '=') {
      exactGenres.push(genre)
    } else if (operator === '!') {
      excludeGenres.push(genre)
    } else if (operator === '/') {
      containsGenres.push(genre)
    }
  })

  let filtered = allFilms.value

  if (exactGenres.length > 0) {
    filtered = filtered.filter((film) => {
      return exactGenres.every((genre) => film.genres.includes(genre))
    })
  }

  if (excludeGenres.length > 0) {
    filtered = filtered.filter((film) => {
      return excludeGenres.every((genre) => !film.genres.includes(genre))
    })
  }

  if (containsGenres.length > 0) {
    filtered = filtered.filter((film) => {
      return containsGenres.some((genre) => film.genres.includes(genre))
    })
  }

  filtered.sort((a, b) => {
    const aMatchingGenres = a.genres.filter((genre) => containsGenres.includes(genre))
    const bMatchingGenres = b.genres.filter((genre) => containsGenres.includes(genre))

    if (aMatchingGenres.length > bMatchingGenres.length) {
      return -1
    } else if (aMatchingGenres.length < bMatchingGenres.length) {
      return 1
    } else {
      return 0
    }
  })

  filteredFilms.value = filtered
  showMore()
}

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

const getSortParam = (value) => {
    const argument = value.split('&')
    const sortValues = []
    const sortOrders = []

    argument.forEach((arg) => {
        let operator = '='
        let argValue = arg

        if (arg.startsWith('<')) {
            operator = '<'
            argValue = arg.slice(1).toLowerCase()
        } else if (arg.startsWith('>')) {
            operator = '>'
            argValue = arg.slice(1).toLowerCase()
        }

        if (argValue === "length") { argValue = "len" }

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
        filterFilmsByGenre() // Filter films by genre
        batchCounter = 0
        showMore()
    } catch (err) {
        console.error('Error retrieving films:', err)
    }
}

const showMore = () => {
  const end = (batchCounter + 1) * batchSize
  visibleFilms.value = filteredFilms.value.slice(0, end)
  batchCounter++

  const isLessThanAllFilms = visibleFilms.value.length < allFilms.value.length || allFilms.value.length === 0
  const isLessThanBatchSize = visibleFilms.value.length < batchSize
  showMoreVisible = isLessThanAllFilms && !isLessThanBatchSize
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:4000/films')
        filteredFilms.value = response.data
        showMore()
    } catch (err) {
        console.error('Error retrieving films:', err)
    }
})

watch(
    [searchYear, searchRating, searchLength, sortBy, searchGenres],
    ([year, rating, length, sort, genres]) => {
        exeSearch(year, rating, length, sort)
        filterFilmsByGenre(genres)
    }
)
</script>