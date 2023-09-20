<script lang="ts">
    import { LogIn } from "lucide-svelte";
</script>

<svelte:head>
    <title>Sylgar</title>
</svelte:head>

<h1 class="title large">Sylgar</h1>
<h2 class="subtitle medium">PDF Hosting</h2>

<form method="POST">
    <label for="password">
        <span class="label">Password</span>
    </label>
    <input type="password" name="password" placeholder="password" id="password" />

    <div class="form-element">
        <button type="submit" class="">
            <LogIn color="var(--green)" size="24" />
            Login
        </button>
    </div>
</form>