<script lang="ts" setup>
import { formatDistance, parseISO } from 'date-fns';
import { computed } from 'vue';
import Container from '@/components/ui/Container.vue';
import type { Post } from '@/types';

type Props = {
    post: Post;
};

const props = defineProps<Props>();

const formattedDate = computed(() =>
    formatDistance(parseISO(props.post.created_at), new Date()),
);
</script>

<template>
    <Container :title="post.title">
        <h1 class="text-2xl font-bold">{{ post.title }}</h1>
        <span class="mt-1 block text-sm text-gray-300">
            {{ formattedDate }} ago by {{ post.user.name }}
        </span>

        <article class="mt-6">
            <pre class="font-sans whitespace-pre-wrap">{{ post.body }}</pre>
        </article>
    </Container>
</template>
