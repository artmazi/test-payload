import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function run() {
  const payload = await getPayload({ config })
  
  const allPages = await payload.find({
    collection: 'pages',
    limit: 100,
  })
  
  console.log(JSON.stringify(allPages.docs, null, 2))
  process.exit(0)
}

run()
