# Indeed Crawler

This application crawls the indeed API to produce metadata files in csv format.

## Setup

Copy `.env.example` and `queries.example` to `.env` and `queries`.

Update the `queries` file so that each line contains the text of a search you would like to perform.

Update the `.env` file **and replace " \<YOUR-PUBLISHER-ID>" with your actual indeed.com publisher id**.

Run:

    npm install

## Performing Searches

    npm start