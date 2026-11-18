import { t } from 'i18next';

export default [
	{
		title: t('globals.footer.links.1.title'),
		link: '/agb',
	},
	{
		title: t('globals.footer.links.2.title'),
		link: '/impressum',
	},
	{
		title: t('globals.footer.links.3.title'),
		link: '/datenschutz',
	},
	{
		title: t('globals.footer.links.4.title'),
		link: '/nutzungsbedingungen',
	},
];

export const categoryFooter = (categoryLink: string) => [
	{
		title: t('globals.footer.links.1.title'),
		link: `/${categoryLink}/agb`,
	},
	{
		title: t('globals.footer.links.2.title'),
		link: `/${categoryLink}/impressum`,
	},
	{
		title: t('globals.footer.links.3.title'),
		link: `/${categoryLink}/datenschutz`,
	},
	{
		title: t('globals.footer.links.4.title'),
		link: `/nutzungsbedingungen`,
	},
];
