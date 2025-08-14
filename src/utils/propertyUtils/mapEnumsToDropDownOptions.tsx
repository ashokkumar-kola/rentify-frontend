export const toTitleCase = (str: string): string => {
	return str
		.replace(/[_-]/g, " ")
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
		.join(" ");
};

export const mapEnumToDropdownOptions = (enumArray: string[] = []) => {
	return enumArray.map((item) => ({
		label: toTitleCase(item),
		value: item,
	}));
};

// const toTitleCase = (str: string) => {
//   return str
//     .split('-')
//     .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
//     .join(' ');
// };

// export default toTitleCase;

// export const mapEnumToDropdownOptions = (enumArray: string[] = []) => {
//   return enumArray.map((item) => ({
//     label: capitalizeFirstLetter(item.replace(/_/g, ' ')),
//     value: item,
//   }));
// };

// const capitalizeFirstLetter = (text: string) =>
//   text.charAt(0).toUpperCase() + text.slice(1);
