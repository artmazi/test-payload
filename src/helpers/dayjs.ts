import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import durationPlugin from 'dayjs/plugin/duration';
import utcPlugin from 'dayjs/plugin/utc';

function setupDayjs() {
	dayjs.extend(durationPlugin);
	dayjs.extend(relativeTime);
	dayjs.extend(updateLocale);
	dayjs.extend(utcPlugin);
	dayjs.updateLocale('en', {
		relativeTime: {
			future: 'in %s',
			past: '%s',
			s: '%ds',
			m: 'a min',
			mm: '%dm',
			h: 'an hour ago',
			hh: '%d hours ago',
			d: 'a day ago',
			dd: '%d days ago',
			M: 'a month',
			MM: '%d months',
			y: 'a year',
			yy: '%d years',
		},
	});
}

export function getFormattedDate(
	date?: string | number | Date | dayjs.Dayjs | null | undefined,
	format?: dayjs.OptionType | undefined,
	strict?: boolean | undefined
) {
	return dayjs(typeof date === 'number' ? date * 1000 : date, format, strict).format('MM.DD.YYYY');
}

export function getFormattedTime(
	date?: string | number | Date | dayjs.Dayjs | null | undefined,
	format?: dayjs.OptionType | undefined,
	strict?: boolean | undefined
) {
	return dayjs(typeof date === 'number' ? date * 1000 : date, format, strict).format('HH:mm');
}

export default setupDayjs;
