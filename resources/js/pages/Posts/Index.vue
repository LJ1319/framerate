<script lang="ts" setup>
import Container from '@/components/ui/Container.vue';
import Pagination from '@/components/ui/Pagination.vue';
import type { PaginationMeta, Post } from '@/types';

type Props = {
    posts: {
        data: Post[];
        meta: PaginationMeta;
    };
};

defineProps<Props>();
</script>

<template>
    <Container>
        <ul class="divide-y">
            <li
                v-for="post in posts.data"
                :key="post.id"
                class="bg-sidebar px-2 py-4"
            >
                <span class="text-lg font-bold">
                    {{ post.title }}
                </span>
            </li>
        </ul>
        <Pagination :meta="posts.meta" />
    </Container>
</template>
