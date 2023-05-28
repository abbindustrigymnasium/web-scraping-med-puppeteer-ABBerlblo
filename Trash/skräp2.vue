<!-- <template>
    <div>
        <Header />
        <div>
            <input type="text" placeholder="search">
        </div>
        <div class="flex flex-wrap">
            <div v-for="film in filteredFilms" :key="film.id" class="flex flex-col justify-center items-center p-8">
                <img :src="film.imageSrc" :alt="film.title" class="w-32" />
                {{ film.title }}
                <br>
                Rating: {{ film.rating }}
                <span v-for="genre in film.genres" :key="genre">{{ genre }}</span>
            </div>
        </div>
        <div>
            Show more
        </div>
        <Footer />
    </div>
</template>

<script setup>
import axios from 'axios'

const filteredFilms = ref([])


axios.get('http://localhost:4000/films')
    .then(response => {
        const films = response.data

        // Filter films based on genres
        filteredFilms.value = films.filter(film => film.genres.includes("Crime") && film.genres.includes("Drama"))
    })
    .catch(error => {
        console.error('Error retrieving films:', error)
    })

</script> -->
