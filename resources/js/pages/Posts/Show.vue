<script lang="ts" setup>
import { computed } from 'vue';
import Comment from '@/components/Comment.vue';
import Container from '@/components/ui/Container.vue';
import Pagination from '@/components/ui/Pagination.vue';
import type { Comment as CommentType, PaginationMeta, Post } from '@/types';
import { relativeDate } from '@/Utilities/date';

type Props = {
    post: Post;
    comments: {
        data: CommentType[];
        meta: PaginationMeta;
    };
};

const props = defineProps<Props>();

const formattedDate = computed(() => relativeDate(props.post.created_at));
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

        <div class="mt-12">
            <h2 class="text-xl font-semibold">Comments</h2>

            <ul class="mt-4 divide-y">
                <li
                    v-for="comment in comments.data"
                    :key="comment.id"
                    class="bg-sidebar px-2 py-4"
                >
                    <Comment :comment="comment" />
                </li>
            </ul>

            <Pagination :meta="comments.meta" :only="['comments']" />
        </div>
    </Container>
</template>
