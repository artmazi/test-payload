import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function run() {
  const payload = await getPayload({ config })
  
  const homePages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })
  
  console.log(JSON.stringify(homePages.docs[0], null, 2))
  process.exit(0)
}

run()
