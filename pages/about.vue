<template>
    <div>

        <Header />

        <div class="w-full flex flex-col items-center">
            <div class="w-3/5 flex flex-col py-8">
                <span class="text-lg text-center text-blue-700">About Us</span>
                <span class="w-full border-b-2 border-slate-400 mb-2"></span>
                <span>
                    Welcome to my website! We are dedicated to providing you with information about the top movies based
                    on IMDb ratings.
                </span>
            </div>

            <div class="w-3/5 flex flex-col py-8">
                <span class="text-lg text-center text-blue-700">About the Project</span>
                <span class="w-full border-b-2 border-slate-400 mb-2"></span>
                <span>
                    This website is built using Nuxt 3, a powerful framework for creating modern web applications. It
                    utilizes the IMDb API to fetch data about the top movies and presents them in an organized and
                    user-friendly manner.
                </span>
                <br>
                <span>
                    Users can explore the movie list, filter movies by various criteria, and sort them based on ratings,
                    year, and more. We aim to provide an immersive movie browsing experience that caters to the preferences
                    of all film enthusiasts.
                </span>
            </div>

            <div class="w-3/5 flex flex-col py-8">
                <span class="text-lg text-center text-blue-700">My Mission</span>
                <span class="w-full border-b-2 border-slate-400 mb-2"></span>
                <span>
                    My mission is to curate and present the best movies to my users, allowing them to discover and enjoy
                    cinematic masterpieces.
                </span>
            </div>

            <div class="w-3/5 flex flex-col py-8">
                <span class="text-lg text-center text-blue-700">Contact Us</span>
                <span class="w-full border-b-2 border-slate-400 mb-2"></span>
                <span>
                    If you have any questions or feedback, feel free to reach out to us at
                    <span>contact@example.com </span>
                </span>
            </div>
        </div>

        <Footer />

    </div>
</template>

<script setup>

</script>