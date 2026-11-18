export const get = (key: string): any => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

export const set = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getFromObject = (key: string, property: string): any => {
	const object = get(key);
	return object ? (property in object ? object[property] : null) : null;
};

export const setToObject = (key: string, property: string, value: any) => {
	const object = get(key);
	if (object) {
		object[property] = value;
		set(key, object);
	} else {
		set(key, { [property]: value });
	}
};

export const remove = (key: string) => {
	localStorage.removeItem(key);
};

export const removeAll = () => {
	localStorage.clear();
};

export default {
	get,
	set,
	getFromObject,
	setToObject,
	remove,
	removeAll,
};
