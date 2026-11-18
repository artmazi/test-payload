import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function run() {
  const payload = await getPayload({ config })
  
  // Find verwaltungen/platform
  const sourcePages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'verwaltungen/platform',
      },
    },
  })
  
  if (!sourcePages.docs.length) {
    console.error("Could not find verwaltungen/platform")
    process.exit(1)
  }
  
  const sourcePage = sourcePages.docs[0]
  
  // Find home
  const homePages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })
  
  if (!homePages.docs.length) {
    console.log("Creating home page...")
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        _status: 'published',
        content: sourcePage.content,
      }
    })
  } else {
    console.log("Updating home page...")
    await payload.update({
      collection: 'pages',
      id: homePages.docs[0].id,
      data: {
        content: sourcePage.content,
      }
    })
  }
  
  console.log("Done")
  process.exit(0)
}

run()
