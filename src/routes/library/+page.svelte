<script lang="ts">
    import { base } from '$app/paths';

    import type { PageData } from './$types';
    
    export let data: PageData;

    console.log(data);
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

                {#each data.files as file}
                    <a href="/book/{file}" class="link medium">{file}</a>
                {/each}
            </div>
        </div>
        <div class="col-lg-6">
            <div class="exterior">
                <h2 class="subtitle medium">TTRPG Sets</h2>

                {#each data.directories as dir}
                    <a href="/ttrpg/{dir}" class="link medium">{dir}</a>
                {/each}
            </div>
        </div>
    </div>
</div>