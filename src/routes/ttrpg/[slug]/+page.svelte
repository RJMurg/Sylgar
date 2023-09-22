<script lang="ts">
	import type { PageData, ActionData } from './$types';
    import { ExternalLink, ChevronLeft } from 'lucide-svelte';

	// Thanks Stack Overflow :)
	function camelise(str: string) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}

	export let data: PageData;
	export let form: ActionData;
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
		<div class="col-lg-12">
			{#if !form}	
				<div class="exterior">
					<h2 class="title large">{data.name}</h2>

					{#each data.files as file, i}
						<a href="/library/{data.slug}/{data.rawFiles[i]}.pdf" class="link medium">{file}</a>
					{/each}

					{#each data.rawDirs as dir, i}
						<form method="POST">
							<input type="hidden" name="action" value={data.rawDirs[i]}/>
							<button class="link medium">
								<ExternalLink color="var(--blue)" size="32"/>
								{data.directories[i]}
							</button>
						</form>
					{/each}
				</div>
			{:else}
				<div class="exterior">
					<button class="link medium" onclick="window.history.back()">
						<ChevronLeft color="var(--blue)" size="32"/>
						Back
					</button>

					{#each form.files as file, i}
						<a href="/library/{form.slug}/{form.path}{form.rawFiles[i]}" class="link medium">{file}</a>
					{/each}

					{#each form.rawDirs as dir, i}
						<form method="POST">
							<input type="hidden" name="action" value={form.path + form.rawDirs[i]}/>
							<button class="link medium">
								<ExternalLink color="var(--blue)" size="32"/>
								{form.dirs[i]}
							</button>
						</form>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
