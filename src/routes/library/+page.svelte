<script lang="ts">
	import type { PageData } from './$types';

	// Thanks Stack Overflow :)
	function camelise(str: string) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}

	export let data: PageData;
	let fileLinks: string[] = [];
	let dirLinks: string[] = [];

	for (let i = 0; i < data.files.length; i++) {
		let raw = camelise(data.files[i]);
		raw = raw.charAt(0).toUpperCase() + raw.slice(1);

		fileLinks.push(raw);
	}

	for (let i = 0; i < data.directories.length; i++) {
		let raw = camelise(data.directories[i]);
		raw = raw.charAt(0).toUpperCase() + raw.slice(1);
		dirLinks.push(raw);
	}
</script>

<svelte:head>
	<title>Sylgar - Library</title>
</svelte:head>

<h1 class="title large">Library</h1>
<h2 class="subtitle small">Select from a range of TTRPGs</h2>

<div class="container-flex">
	<div class="row">
		<div class="col-lg-6">
			<div class="exterior">
				<h2 class="subtitle medium">Individual Source Books</h2>

				{#each data.files as file, i}
					<a href="/book/{fileLinks[i]}" class="link medium">{file}</a>
				{/each}
			</div>
		</div>
		<div class="col-lg-6">
			<div class="exterior">
				<h2 class="subtitle medium">TTRPG Sets</h2>

				{#each data.directories as dir, i}
					<a href="/ttrpg/{dirLinks[i]}" class="link medium">{dir}</a>
				{/each}
			</div>
		</div>
	</div>
</div>
