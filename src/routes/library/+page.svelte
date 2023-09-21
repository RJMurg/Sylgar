<script lang="ts">
    import { base } from '$app/paths';

    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>Sylgar - Library</title>
</svelte:head>

<h1 class="title large">Library</h1>
<h2 class="subtitle small">Select from a range of sourcebooks</h2>
<a href="{base}/library/Zweihander.pdf">Test</a>