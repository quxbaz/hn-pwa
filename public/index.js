'use strict';

/* Variables and constants */

const ENDPONTS = {
  // Matches the URL to retrieve the front page of HN in structured data (JSON).
  frontPage: 'http://hn.algolia.com/api/v1/search?tags=front_page',
}

/* DOM render functions */

/*
  `className` should be an `attrs` object.
*/
function element (tag, className, children) {
  const el = document.createElement(tag)
  if (className != null)
    el.classList.add(className)
  if (typeof children === 'string') {
    el.innerText = children
  } else if (Array.isArray(children)) [
    children.forEach((child) => el.appendChild(child))
  ]
  return el
}

const dom = {

  Points (number) {
    return element('span', null, `${number} points`)
  },

  Comments (story) {
    const link = element('a', 'Comments', `${story.num_comments} comments`)
    link.href = `https://news.ycombinator.com/item?id=${story.objectID}`
    return link
  },

  ObjectId (id) {
    const objectId = element('span', 'ObjectId', `id=${id}`)
    return objectId
  },

  Meta (story) {
    return element('div', 'Meta', [
      dom.Points(story.points),
      dom.Comments(story),
      dom.ObjectId(story.objectID),
    ])
  },

  Title (story, index) {
    const link = element('a', null, `${story.title}`)
    link.href = story.url
    return element('span', 'Title', [
      element('span', null, `${index + 1}. `),
      link,
    ])
  },

  Story (story, index) {
    return element('li', null, [
      dom.Title(story, index),
      dom.Meta(story),
    ])
  },

  Stories (stories) {
    return element('ol', null, stories.map(dom.Story))
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
  initServiceWorker()
  const Content = document.getElementById('Content')
  const stories = await getFrontPage()
  // console.log(stories)
  const div = dom.Stories(stories)
  Content.replaceWith(div)
}

main()
