import type { PageServerLoad, Actions } from './$types';
import fs from 'fs';

export const load = (async ({ params }) => {
	const slug = params.slug;
	const elements = fs.readdirSync('./static/library/' + slug + '/');
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

	const name = slug.replace(/([A-Z])/g, ' $1');

	return {
		name: name,
		slug: slug,
		directories: dirs,
		rawDirs: rawDirs,
		files: files,
		rawFiles: rawFiles
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params }) => {
		const reqData = await request.formData();

		// Read directory
		const slug = params.slug;
		const data = fs.readdirSync('./static/library/' + slug + '/' + reqData.get('action') + '/');

		// Check if any data ends with .pdf
		const rawFiles = [];
		const rawDirs = [];

		for (let i = 0; i < data.length; i++) {
			if (data[i].endsWith('.pdf')) {
				rawFiles.push(data[i]);
			} else {
				rawDirs.push(data[i]);
			}
		}

		// Convert files from CamelCase to Sentence Case
		const files = [];
		const dirs = [];

		for (let i = 0; i < rawFiles.length; i++) {
			let temp: string = rawFiles[i].replace(/([A-Z])/g, ' $1');
			temp = temp.charAt(0).toUpperCase() + temp.slice(1);
			temp = temp.slice(1, -4); // Because otherwise there'd be a space before the first word. Also removes '.pdf'
			files.push(temp);
		}

		// Convert files from CamelCase to Sentence Case
		for (let i = 0; i < rawDirs.length; i++) {
			let temp: string = rawDirs[i].replace(/([A-Z])/g, ' $1');
			temp = temp.charAt(0).toUpperCase() + temp.slice(1);
			temp = temp.slice(1); // Because otherwise there'd be a space before the first word. Also removes '.pdf'
			dirs.push(temp);
		}

		const path = reqData.get('action') + '/';

		return {
			status: 200,
			files: files,
			dirs: dirs,
			rawFiles: rawFiles,
			rawDirs: rawDirs,
			path: path,
			slug: slug
		};
	}
} satisfies Actions;
