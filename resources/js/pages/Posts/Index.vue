<script lang="ts" setup>
import Container from '@/components/ui/Container.vue';
import type { Post } from '@/types';

type Props = {
    posts: Post[];
};

defineProps<Props>();
</script>

<template>
    <Container>
        <ul class="divide-y">
            <li v-for="post in posts" :key="post.id" class="px-2 py-4">
                <span class="text-lg font-bold">
                    {{ post.title }}
                </span>
            </li>
        </ul>
    </Container>
</template>
