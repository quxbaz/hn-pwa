'use strict';

/* Variables and constants */

const ENDPONTS = {
  // Matches the URL to retrieve the front page of HN in structured data (JSON).
  frontPage: 'http://hn.algolia.com/api/v1/search?tags=front_page',
}

/* DOM render functions */

function renderStory (story, index=0) {
  const div = document.createElement('div')
  const meta = document.createElement('span')
  const link = document.createElement('a')
  meta.innerText = `${index + 1}. ${story.points} points, ${story.num_comments} comments: `
  link.innerText = story.title
  link.href = story.url
  div.appendChild(meta)
  div.appendChild(link)
  return div
}

function renderStories (stories) {
  const div = document.createElement('div')
  stories.forEach((story, i) => {
    div.appendChild(renderStory(story, i))
  })
  return div
}

/* Service worker and cache related */

function initServiceWorker () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
    })
  }
}

/* Data fetching functions */

async function getFrontPage () {
  const response = await fetch(ENDPONTS.frontPage)
  const json = await response.json()
  // An array of objects; each one represents a story on the front page.
  const stories = json.hits
  return stories
}

//

async function main () {
  // initServiceWorker()
  const Main = document.getElementById('Main')
  const stories = await getFrontPage()
  console.log(stories)
  const div = renderStories(stories)
  Main.appendChild(div)
}

main()
