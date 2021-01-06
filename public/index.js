'use strict';

/* Variables and constants */

const ENDPONTS = {
  // Matches the URL to retrieve the front page of HN in structured data (JSON).
  frontPage: 'http://hn.algolia.com/api/v1/search?tags=front_page',
}

/* DOM render functions */

function renderStory (story, index=0) {
  const component = document.createElement('li')
  const meta = document.createElement('span')
  const link = document.createElement('a')
  meta.innerText = `${index + 1}. ${story.points} points, ${story.num_comments} comments: `
  link.innerText = story.title
  link.href = story.url
  component.appendChild(meta)
  component.appendChild(link)
  return component
}

function renderStories (stories) {
  const component = document.createElement('ul')
  stories.forEach((story, i) => {
    component.appendChild(renderStory(story, i))
  })
  return component
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
  const Content = document.getElementById('Content')
  const stories = await getFrontPage()
  console.log(stories)
  const div = renderStories(stories)
  Content.replaceWith(div)
}

main()
