# SmartPrix Scraper

## Overview
This project is a web scraper built with Node.js to extract laptop data from the SmartPrix website. It gathers information on laptop specifications and pricing, storing the scraped data in JSON files.

## Tech Stack
- **Node.js**: JavaScript runtime environment.
- **axios**: Promise-based HTTP client for making requests to web pages.
- **jsdom**: A pure-JavaScript implementation of many web standards, used for parsing and interacting with HTML.

## Features
- Extracts links to laptop specification pages.
- Scrapes detailed specifications for each laptop, including price.
- Saves the extracted data into structured JSON files.

## Project Structure
```
/
├── LinksExtractor.js     # Extracts links of laptops
├── SpecsExtraction.js    # Extracts specification of laptops
├── main.js               # Main script to run the scrapers
├── package.json          # Project configuration and dependencies
└── data/
    ├── LaptopLinks.json  # Stores the links to laptop pages
    └── Specs.json        # Stores the extracted laptop specifications
```

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SmartPrixScraper.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SmartPrixScraper
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Usage
To run the scraper, execute the following command:
```bash
npm start
```
This will start the scraping process using `nodemon`, which will automatically restart the script if any changes are made. The extracted data will be saved in the `data` directory.