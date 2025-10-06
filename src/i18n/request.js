import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the [locale] segment
	let locale = await requestLocale;

	// Ensure that a valid locale is used
	if (!locale || !routing.locales.includes(locale)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default
	};

});

// import {getRequestConfig} from 'next-intl/server';

// export default getRequestConfig(async ({requestLocale}) => {
// 	const requested = await requestLocale;
// 	// Use the requested locale or fall back to 'en'
// 	const activeLocale = requested || 'en';
// 	// console.log('activeLocale', activeLocale);
// 	let messages;
// 	try {
// 		messages = (await import(`../messages/${activeLocale}.json`)).default;
// 		// console.log('messages', messages);
// 	} catch (error) {
// 		messages = (await import('../messages/en.json')).default;
// 	}
// 	return {
// 		locale: activeLocale,
// 		messages
// 	};
// });