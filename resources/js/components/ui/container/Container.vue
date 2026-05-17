<script lang="ts" setup>
import { Head } from '@inertiajs/vue3';

defineProps<{title: string}>();
</script>

<template>
    <Head :title="title"/>

    <div class="max-w-7xl py-10 sm:px-7 lg:px-8 px-4 mx-auto w-full">
        <slot />
    </div>
</template>
