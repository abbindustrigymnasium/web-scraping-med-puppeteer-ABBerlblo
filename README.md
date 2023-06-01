# Film Finder

[![License](https://img.shields.io/badge/license-GNU%20AGPL-blue.svg)](LICENSE)
[![Library](https://img.shields.io/badge/library-Puppeteer-Green.svg)](package.json)

## Description

**Purpose:**
Are you tired of the feeling of indecisiveness during late movie nights? Don't you wish for a better solution? Film Finder is a tool that enables users to use advanced search methods to determine which film to watch next by selecting a few preferences.

**Execution:**
Film Finder is built using the Nuxt 3 framework based on Node.js. It utilizes several additional libraries, including:

- Puppeteer: For scraping data from IMDb
- JSON Server: To create a REST API
- Axios: To make dynamically modified GET requests based on user input

**Features:**
Films can be found based on the following criteria:

- Years
- Ratings
- Length
- Genres

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [File Manifest](#file-manifest)
- [License](#license)
- [List of Known Bugs](#list-of-known-bugs)
- [Credits](#credits)

## Installation

### Prerequisites
Before getting started, ensure that you have Node.js installed on your machine. You can download and install Node.js from the official website: [https://nodejs.org](https://nodejs.org)

### Startup

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/film-finder.git
   ```
2. Navigate to the project directory:

    ```bash
   cd film-finder
   ```
3. Install the project dependencies using npm:

    ```bash
   npm i
   ```
4. Install libraries:
    
    ```bash
   npm i puppeteer-cluster
   ```
   then:
   
    ```bash
   npm i json-server
   ```
   and:
   
    ```bash
   npm i axios
   ```
5. Install and set up Tailwind CSS:

    ```bash
   npm i -D tailwindcss postcss autoprefixer
   ```
   then run:
   ```bash
   npx tailwindcss init
   ```
6. Scrape the latest movie data:

    ```bash
   npm run neo
   ```
7. Start the JSON Server to create a REST API at http://localhost:4000/:

    ```bash
   npm run server -- Top
   ```
8. In a separate terminal, start the development server:

    ```bash
   npm run dev
   ```
9. Open your web browser and visit http://localhost:3000 to access Film Finder.
10. Enjoy  :)

## Usage

### Configuration

text here

Guidelines on how to use the project. Provide examples or code snippets if necessary. Screenshots or GIFs can be added to showcase the project in action.

## File Manifest

List all the files included in the project and briefly describe their purpose.

## License

This project is licensed under the [GNU AGPL License](LICENSE).

## List of Known Bugs

There is an error when scraping "Das Boot" where the scraping script fails to extract the movie length. This issue is being looked into.

## Credits

- @abbjetmus for explaining errors in the scraping script
- @Peach-Iced-Tea for helping me during the development of the scraping process
