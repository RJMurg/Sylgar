import type { PageServerLoad } from './$types';
import fs from 'fs';

export const load = (async () => {
	const elements = fs.readdirSync('./static/library');
	const files = [];
	const dirs = [];
	const rawFiles = [];
	const rawDirs = [];

	// Move all elements into relevant array.
	for (let i = 0; i < elements.length; i++) {
		// Files
		if (elements[i].endsWith('.pdf')) {
			files.push(elements[i]);
			rawFiles.push(elements[i].slice(0, -4));
		}
		// Directories
		else {
			dirs.push(elements[i]);
			rawDirs.push(elements[i]);
		}
	}

	// Convert files from CamelCase to Sentence Case
	for (let i = 0; i < files.length; i++) {
		let temp: string = files[i].replace(/([A-Z])/g, ' $1');
		temp = temp.charAt(0).toUpperCase() + temp.slice(1);
		temp = temp.slice(1, -4); // Because otherwise there'd be a space before the first word. Also removes '.pdf'
		files[i] = temp;
	}

	// Convert files from CamelCase to Sentence Case
	for (let i = 0; i < dirs.length; i++) {
		let temp: string = dirs[i].replace(/([A-Z])/g, ' $1');
		temp = temp.charAt(0).toUpperCase() + temp.slice(1);
		temp = temp.slice(1); // Because otherwise there'd be a space before the first word. Also removes '.pdf'
		dirs[i] = temp;
	}

	return {
		directories: dirs,
		rawDirs: rawDirs,
		files: files,
		rawFiles: rawFiles
	};
}) satisfies PageServerLoad;
