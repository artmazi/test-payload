	},
	{
		component: 'hero',
		data: {
			heroImg: HeroImg,
			title: t('platform.hero.title'),
			description: t('platform.hero.description'),
			content: t('platform.hero.content'),
			button: t('platform.hero.button'),
			buttonLink: 'https://app.infra3d.com/signup/trial',
			button2: t('platform.hero.button2'),
			buttonLink2: `/${baseCategoryUrls.verwaltungen}/data-map`,
		},
	},
	{
		component: 'news',
		data: {
			title: t('platform.news.title'),
			news: [
				{
					img: newsCustomImage,
					title: 'infra3D Platfom Release: Administration',
					date: '02.12.2025',
					link: 'https://www.inovitas.ch/de/infra3d-platfom-release-administration',
				},
				{
					img: 'https://www.inovitas.ch/sites/all/pliki/styles/top_podstrony_desktop_duzy/public/heros_images/infra3d-release-linref-tablet-header-website.png?itok=TBkC-711',
					title: 'Neuer infra3D NextGen Feature Release verfügbar!',
					date: '13.08.2025',
					link: 'https://www.inovitas.ch/de/neuer-infra3d-nextgen-feature-release-Aug25',
				},
				{
					img: 'https://inovitas.ch/sites/all/pliki/styles/case_study/public/heros_images/nfra3d-nextgen-feature-release-newsticker.png?itok=XDif8Y95',
					title: 'Neue Features: Projekte und Schnittstelle',
					date: '02.04.2025',
					link: 'https://inovitas.ch/de/neue-features-projekte-und-schnittstelle',
				},
				{
					img: 'https://inovitas.ch/sites/all/pliki/styles/top_podstrony_desktop/public/heros_images/infra3d-software-und-smarail_header-2.png?itok=QmjtRlTt',
					title: 'Das neue Mobile Mapping System Rail und Content 3.0 Rail sind da!',
					date: '18.06.2026',
					link: 'https://inovitas.ch/de/das-neue-mobile-mapping-system-rail-und-content-30-rail-sind-da',
				},
				{
					img: 'https://inovitas.ch/sites/all/pliki/styles/top_podstrony_desktop_duzy/public/heros_images/infra3d-nextgen-neue-plugins-header-newsletter_eng.png?itok=vqQMX_DW',
					title: 'QGIS, ArcGIS Pro und WebOffice jetzt in infra3D NextGen verfügbar',
					date: '25.06.2026',
					link: 'https://inovitas.ch/de/qgis-arcgis-pro-und-weboffice-in-infra3d-nextgen-verfuegbar',
				},
			],
		},
	},
	{
		component: 'info',
		data: {
			infoHero: infoHero,
			title: t('platform.info.title'),
			items: [
				t('platform.info.items.1'),
				t('platform.info.items.2'),
				t('platform.info.items.3'),
				t('platform.info.items.4'),
				t('platform.info.items.5'),
				t('platform.info.items.6'),
				t('platform.info.items.7'),
			],
		},
	},
	{
		component: 'slider',
		data: {
			title: t('platform.slider.title'),
			description: 'platform.slider.description',
			sliderItems: [
				logo29,
				logo30,
				logo31,
				logo32,
				logo33,
				logo34,
				logo35,
				logo36,
				logo37,
				logo38,
				logo39,
				logo41,
				logo42,
				logo43,
				logo44,
				logo45,
				logo46,
                logo50,
                logo51,
                logo52
			],
			testimonials: [
				{
					img: ChristianPeterlein,
					text: t('platform.slider.testimonials.1.text'),
					name: t('platform.slider.testimonials.1.name'),
					description: t('platform.slider.testimonials.1.description'),
				},
				{
					img: SabineBolfing,
					text: t('platform.slider.testimonials.2.text'),
					name: t('platform.slider.testimonials.2.name'),
					description: t('platform.slider.testimonials.2.description'),
				},
				{
					img: stephan,
					text: t('platform.slider.testimonials.3.text'),
					name: t('platform.slider.testimonials.3.name'),
					description: t('platform.slider.testimonials.3.description'),
				},
			],
		},
	},
	{
		component: 'use-cases',
		data: {
			title: t('platform.use-cases.title'),
			items: [
				{
					title: t('platform.use-cases.items.1.title'),
					text: t('platform.use-cases.items.1.text'),
					background: useCase1,
					link: 'https://inovitas.ch/de/fallstudien/infra3d-fuer-den-kanton-aargau',
				},
				{
					title: t('platform.use-cases.items.2.title'),
					text: t('platform.use-cases.items.2.text'),
					background: useCase1,
					link: 'https://inovitas.ch/de/fallstudien/infra3d-fuer-die-stadt-zug',
				},
				{
					title: t('platform.use-cases.items.3.title'),
					text: t('platform.use-cases.items.3.text'),
					background: useCase1,
					link: 'https://inovitas.ch/de/fallstudien/infra3d-fuer-die-gemeinde-glarus-nord',
				},
			],
		},
	},
	{
		component: 'software',
		data: {
			title: t('platform.software.title'),
			contentTitle: t('platform.software.content-title'),
			content: 'platform.software.content',
			contentImg: software,
			items: [
				{
					title: t('platform.software.items.1.title'),
					icon: iconView,
					link: `/${baseCategoryUrls.verwaltungen}/software/infra3d-view`,
				},
				{
					title: t('platform.software.items.2.title'),
					icon: iconEdit,
					link: `/${baseCategoryUrls.verwaltungen}/software/infra3d-edit`,
				},
				{
					title: t('platform.software.items.3.title'),
					icon: iconAddon,
					link: `/${baseCategoryUrls.verwaltungen}/software/add-ons/linref`,
				},
				{
					title: t('platform.software.items.4.title'),
					icon: iconAddon,
					link: `/${baseCategoryUrls.verwaltungen}/software/integrations`,
				},
			],
		},
	},
	{
		component: 'data',
		data: {
			title: t('platform.data.title'),
			text: 'platform.data.text',
			img: data,
			items: [
				{
					title: t('platform.data.items.1.title'),
					text: t('platform.data.items.1.text'),
					icon: dataGenerate,
					link: `/${baseCategoryUrls.verwaltungen}/data/infra3d-generate`,
				},
				{
					title: t('platform.data.items.2.title'),
					text: t('platform.data.items.2.text'),
					icon: dataIntegrate,
					link: `/${baseCategoryUrls.verwaltungen}/data/infra3d-integrate`,
				},
				{
					title: t('platform.data.items.3.title'),
					text: t('platform.data.items.3.text'),
					icon: dataLicense,
					link: `/${baseCategoryUrls.verwaltungen}/data/infra3d-access`,
				},
			],
		},
	},
	{
		component: 'content-versions',
		data: {
			title: t('platform.content-versions.title'),
			items: [
				{
					title: t('platform.content-versions.items.3.title'),
					content: t('platform.content-versions.items.3.content'),
					icon: Cv3,
					link: `/${baseCategoryUrls.verwaltungen}/data/infra3d-content-3-0`,
				},
				{
					title: t('platform.content-versions.items.1.title'),
					content: t('platform.content-versions.items.1.content'),
					icon: Cv1,
					link: `/${baseCategoryUrls.verwaltungen}/data/infra3d-content-2-2`,
				},
				{
					title: t('platform.content-versions.items.2.title'),
					content: t('platform.content-versions.items.2.content'),
					icon: Cv2,
					link: `/${baseCategoryUrls.verwaltungen}/data/infra3d-content-2-1`,
				},
			],
		},
	},
	{
		component: 'applications',
		data: {
			title: t('platform.applications.title'),
			text: t('platform.applications.text'),
			items: [
				{
					title: t('platform.applications.items.1.title'),
					text: t('platform.applications.items.1.text'),
					leftText: t('platform.applications.items.1.leftText'),
					rightText: t('platform.applications.items.1.rightText'),
					icon: app1,
					link: `/${baseCategoryUrls.verwaltungen}/applications/pavement-ai`,
