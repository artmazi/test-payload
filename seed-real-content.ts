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
      content: 'infra3D ist die smarte Plattform für digitalisierte Strassen und Schienen. Diese bietet intuitive Software-Tools und smarte Applikationen. Damit haben Sie als Verwaltung, Infrastruktureigentümer, Energieversorger, Ingenieurbüro oder Unternehmen ein smartes Werkzeug für die Planung, Verwaltung und Nutzung öffentlicher Strassen- und Schienenräume.\n\nGleichzeitig werden Ihre Strassen- und Schienennetze durch die Digitalisierung Bestandteil eines wachsenden Ökosystems. Unterschiedliche Akteure können sich am Ökosystem beteiligen und darauf neue Dienstleistungen erbringen oder solche beziehen. Damit eröffnen sich innovative und spannende Perspektiven für Ihre Region.',
      button: 'Trial',
      buttonLink: 'https://app.infra3d.com/signup/trial',
      button2: 'Zu den Daten',
      buttonLink2: '/verwaltungen/data-map',
      heroImg: imageId,
    },
    {
      blockType: 'homeNews',
      title: 'News',
      news: [
        {
          title: 'infra3D Platfom Release: Administration',
          date: '02.12.2025',
          link: 'https://www.inovitas.ch/de/infra3d-platfom-release-administration',
        },
        {
          title: 'Neuer infra3D NextGen Feature Release verfügbar!',
          date: '13.08.2025',
          link: 'https://www.inovitas.ch/de/neuer-infra3d-nextgen-feature-release-Aug25',
        },
        {
          title: 'Neue Features: Projekte und Schnittstelle',
          date: '02.04.2025',
          link: 'https://inovitas.ch/de/neue-features-projekte-und-schnittstelle',
        },
        {
          title: 'Das neue Mobile Mapping System Rail und Content 3.0 Rail sind da!',
          date: '18.06.2026',
          link: 'https://inovitas.ch/de/das-neue-mobile-mapping-system-rail-und-content-30-rail-sind-da',
        }
      ]
    },
    {
      blockType: 'homeInfo',
      title: 'Warum infra3D?',
      infoHero: imageId,
      items: [
        { text: 'Optimieren Sie Ihre Prozesse' },
        { text: 'Treiben Sie die Digitale Transformation voran' },
        { text: 'Fördern Sie eine bessere und nachhaltige Zukunft' },
        { text: 'Visualisieren, analysieren und planen Sie direkt im digitalen 3D-Abbild (digitaler Zwilling) des Strassen- und Schienenraums' },
        { text: 'Nutzen Sie die wertvollen 3D-Informationen der Applikationen für effizientere Entscheide und Prozesse' },
        { text: 'Sie müssen nicht mehr für jeden Sachverhalt ins Feld, weil der 3D-Raum jetzt zu Ihnen an den Arbeitsplatz kommt' },
        { text: 'Sparen Sie bis zu 25% ihrer Arbeitszeit ein – egal ob Sie infra3D als Ingenieur, Projektleiterin oder Werkhof-Mitarbeitende nutzen' }
      ]
    },
    {
      blockType: 'homeSlider',
      title: 'Über 1000 Organisationen vertrauen auf uns',
      sliderItems: [],
      testimonials: [
        {
          name: 'Christian Peterlein',
          text: '«Die Anwendung von infra3D spart uns eine Menge Zeit und Geld. Ausserdem ist es ein sehr benutzerfreundliches Tool!»',
          description: 'Geomatik, Stadt Zürich'
        },
        {
          name: 'Sabine Bolfing',
          text: '«Dank infra3D haben wir eine lückenlose 3D-Visualisierung des gesamten Strassenraums.»',
          description: 'Projektleiterin, Tiefbauamt Kanton Zürich'
        },
        {
          name: 'Stephan Meyer',
          text: '«Dank infra3D müssen wir weniger oft ins Feld. Die Massabfragen im 3D-Bild sind einfach und präzise.»',
          description: 'Projektleiter, Tiefbauamt Kanton Aargau'
        }
      ]
    },
    {
      blockType: 'homeUseCases',
      title: 'Fallstudien',
      items: [
        { title: 'Kanton Aargau', text: 'Fallstudie Kanton Aargau' },
        { title: 'Stadt Zug', text: 'Fallstudie Stadt Zug' },
        { title: 'Gemeinde Glarus Nord', text: 'Fallstudie Gemeinde Glarus Nord' }
      ]
    },
    {
      blockType: 'homeSoftware',
      title: 'Software',
      contentTitle: 'Smarte Software-Tools für das Infrastrukturmanagement',
      content: 'Die intuitive Software-Tools ermöglichen die Visualisierung, Analyse und Planung im digitalen 3D-Abbild der Strassen und Schienen.',
      contentButton: 'Zur Software',
      contentButtonLink: '/software',
      items: [
        { title: 'infra3D View', text: 'Visualisieren, analysieren und planen Sie im digitalen 3D-Abbild' },
        { title: 'infra3D Edit', text: 'Erfassen und bewirtschaften Sie Ihre Geodaten' },
        { title: 'Add-ons', text: 'Erweitern Sie infra3D mit zusätzlichen Modulen' },
        { title: 'Integrations', text: 'Integrieren Sie infra3D in Ihre Umsysteme' }
      ]
    },
    {
      blockType: 'homeData',
      title: 'Daten',
      text: 'Basierend auf den neusten Technologien erfassen wir für Sie Strassen und Schienen und bereiten die 3D-Bilddaten massgeschneidert auf.',
      items: [
        { title: 'infra3D Generate', text: 'Wir erfassen Ihre Strassen- und Schienennetze' },
        { title: 'infra3D Access', text: 'Greifen Sie auf das grösste mobile Mapping Datenarchiv der Schweiz zu' },
        { title: 'infra3D Integrate', text: 'Integrieren Sie eigene Punktwolken oder Bilder' }
      ]
    },
    {
      blockType: 'homeApplications',
      title: 'Applications',
      contentTitle: 'Gemeinsam Mehrwert für das Infrastrukturmanagement generieren.',
      contentText: 'Gewinnen Sie wertvolle Einblicke und Erkenntnisse durch unsere verschiedenen Anwendungen. Sie gehen auf spezifische Marktbedürfnisse ein und nutzen u.a. künstliche Intelligenz (KI).',
      contentButton: 'Zur Unternehmensseite',
      contentButtonLink: 'https://inovitas.ch',
      items: [
        { title: 'Pavement.AI', text: 'Strassenzustand' },
        { title: 'Signs.AI', text: 'Verkehrsschilder' },
        { title: 'Drains.AI', text: 'Schächte' }
      ]
    },
    {
      blockType: 'homeFrame',
    },
    {
      blockType: 'homeProductVS2',
    },
    {
      blockType: 'homeContentVersions',
      title: 'Content Versionen',
      items: [
        { title: 'Content 2.2', content: 'Höhere Bildqualität und Genauigkeit von 3D-Information' },
        { title: 'Content 2.1', content: 'Verbesserte 3D-Intelligenz und Messsicherheit' },
        { title: 'Content 3.0', content: 'Maximale Bildqualität, Präzision, Effizienz und Datenschutz' }
      ]
    },
    {
      blockType: 'homeFacts',
      title: 'Facts & Figures',
      subTitle: 'iNovitas in Zahlen',
      factsLeft: [{title:'Führend', text:'Wir sind die führende Technologieanbieterin im Bereich Mobile Mapping'}],
      factsRight: [{title:'Einzigartig', text:'Mit infra3D bieten wir eine einzigartige smarte Plattform'}],
      factsMosaic: {
        fm1: { title: '12+', text: 'Jahre Erfahrung' },
        fm2: { title: '1000+', text: 'Organisationen' },
        fm3: { title: '400,000+', text: 'Kilometer digitalisiert' },
        fm4: { title: '3', text: 'Länder' },
        fm5: { text1: 'Smarte', text2: 'Plattform', text3: 'Lösungen' },
        fm6: { text1: 'Cloud', text2: 'Native', text3: 'Infrastruktur' },
        fm7: { text1: 'Künstliche', text2: 'Intelligenz', text3: '(KI/ML)' },
        fm8: { text1: 'Datenschutz', text2: 'konform', text3: 'Sicher' }
      }
    }
  ]
  
  await payload.update({
    collection: 'pages',
    id: home.id,
    data: {
      content: content
    }
  })
  
  console.log("Updated home page content successfully")
  process.exit(0)
}

run()
