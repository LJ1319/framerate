<script lang="ts" setup>
import { Link } from '@inertiajs/vue3';
import Container from '@/components/ui/Container.vue';
import Pagination from '@/components/ui/Pagination.vue';
import { show } from '@/routes/posts';
import type { PaginationMeta, Post } from '@/types';
import { relativeDate } from '@/Utilities/date';

type Props = {
    posts: {
        data: Post[];
        meta: PaginationMeta;
    };
};

defineProps<Props>();

const formattedDate = (post: Post) => relativeDate(post.created_at);
</script>

<template>
    <Container title="Posts">
        <ul class="divide-y">
            <li v-for="post in posts.data" :key="post.id" class="bg-sidebar">
                <Link :href="show(post.id)" class="group block px-2 py-4">
                    <span
                        class="text-lg font-bold group-hover:text-sidebar-ring"
                    >
                        {{ post.title }}
                    </span>

                    <span class="mt-1 block text-sm text-gray-300">
                        {{ formattedDate(post) }} ago by {{ post.user.name }}
                    </span>
                </Link>
            </li>
        </ul>
        <Pagination :meta="posts.meta" />
    </Container>
</template>
