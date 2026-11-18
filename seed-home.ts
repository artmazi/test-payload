import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function run() {
  const payload = await getPayload({ config })
  
  const homePages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })
  const home = homePages.docs[0]
  
  const media = await payload.find({ collection: 'media', limit: 1 })
  const imageId = media.docs.length ? media.docs[0].id : null
  
  const content = [
    {
      blockType: 'homeHero',
      title: 'infra3D Platform',
      description: 'Das Ökosystem für digitale Strassen & Schienen',
      content: 'infra3D ist die smarte Plattform für digitalisierte Strassen und Schienen. Diese bietet intuitive Software-Tools und smarte Applikationen. Damit haben Sie als Verwaltung, Infrastruktureigentümer, Energieversorger, Ingenieurbüro oder Unternehmen ein smartes Werkzeug für die Planung, Verwaltung und Nutzung öffentlicher Strassen- und Schienenräume.',
      button: 'Trial',
      buttonLink: 'https://app.infra3d.com/signup/trial',
      button2: 'Zu den Daten',
      buttonLink2: '/verwaltungen/data-map',
      heroImg: imageId,
    },
    {
      blockType: 'homeNews',
      title: 'News',
    },
    {
      blockType: 'homeInfo',
      title: 'Warum infra3D?',
      infoHero: imageId,
    },
    {
      blockType: 'homeSlider',
      title: 'Über 1000 Organisationen vertrauen auf uns',
    },
    {
      blockType: 'homeUseCases',
      title: 'Fallstudien',
    },
    {
      blockType: 'homeSoftware',
      title: 'Software',
    },
    {
      blockType: 'homeData',
      title: 'Daten',
    },
    {
      blockType: 'homeApplications',
      title: 'Applikationen',
    },
    {
      blockType: 'homeFrame',
    },
    {
      blockType: 'homeProductVS2',
    },
    {
      blockType: 'homeContentVersions',
    },
    {
      blockType: 'homeFacts',
    }
  ]
  
  await payload.update({
    collection: 'pages',
    id: home.id,
    data: {
      content: content
    }
  })
  
  console.log("Updated home page successfully")
  process.exit(0)
}

run()
