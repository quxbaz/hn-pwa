'use strict';

/* Variables and constants */

const ENDPONTS = {
  // Matches the URL to retrieve the front page of HN in structured data (JSON).
  frontPage: 'http://hn.algolia.com/api/v1/search?tags=front_page',
}

/* DOM render functions */

function element (tag, className) {
  const el = document.createElement(tag)
  el.classList.add(className)
  return el
}

const dom = {

  Comments (story) {
    const link = element('a')
    link.href = `https://news.ycombinator.com/item?id=${story.objectId}`
    link.innerText = `${story.num_comments} comments`
    return link
  },

  Meta (story) {
    const meta = element('div')
    meta.appendChild(dom.Comments(story))
    meta.innerText = `${story.points} points, ${story.num_comments} comments`
    return meta
  },

  Title (story, index) {
    const title = element('a')
    title.innerText = `${index + 1}. ${story.title}`
    title.href = story.url
    return title
  },

  Story (story, index) {
    const component = element('li')
    component.appendChild(dom.Title(story, index))
    component.appendChild(dom.Meta(story))
    return component
  },

  Stories (stories) {
    const component = element('ol')
    stories.forEach((story, i) => {
      component.appendChild(dom.Story(story, i))
    })
    return component
  },

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
  const div = dom.Stories(stories)
  Content.replaceWith(div)
}

main()
