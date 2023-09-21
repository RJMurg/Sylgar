import type { PageServerLoad } from './$types';
import fs from 'fs';

export const load = (async () => {
    let filenames = fs.readdirSync('./static/library');

    console.log(filenames);
    return {};
}) satisfies PageServerLoad;