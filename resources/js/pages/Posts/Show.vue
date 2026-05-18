<script lang="ts" setup>
import { router, useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import Comment from '@/components/Comment.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container/Container.vue';
import { Label } from '@/components/ui/label';
import Pagination from '@/components/ui/pagination/Pagination.vue';
import TextArea from '@/components/ui/textarea/TextArea.vue';
import { destroy, update } from '@/routes/comments';
import { store } from '@/routes/posts/comments';
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

const commentForm = useForm({
    body: '',
});

const options = {
    query: {
        page: props.comments.meta.current_page,
    },
};

const commentTextAreaRef = ref<HTMLTextAreaElement | null>(null);
const commentIdBeingEdited = ref<CommentType['id'] | null>(null);
const commentBeingEdited = computed(() =>
    props.comments.data.find(
        (comment) => comment.id === commentIdBeingEdited.value,
    ),
);
const editComment = (commentId: CommentType['id']) => {
    commentIdBeingEdited.value = commentId;

    if (!commentBeingEdited.value?.body) {
        return;
    }

    commentForm.body = commentBeingEdited.value.body;

    commentTextAreaRef.value?.focus();
};

const cancelEditComment = () => {
    commentIdBeingEdited.value = null;
    commentForm.reset();
};

const addComment = () =>
    commentForm.post(store(props.post.id).url, {
        preserveScroll: true,
        onSuccess: () => commentForm.reset(),
    });

const updateComment = () => {
    if (!commentIdBeingEdited.value) {
        return;
    }

    const route = update(commentIdBeingEdited.value, options);

    commentForm.put(route.url, {
        preserveScroll: true,
        onSuccess: cancelEditComment,
    });
};

const deleteComment = (commentId: CommentType['id']) => {
    const route = destroy(commentId, options);

    router.delete(route.url, {
        preserveScroll: true,
    });
};
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

            <form
                v-if="$page.props.auth.user"
                class="mt-4"
                @submit.prevent="
                    () =>
                        commentIdBeingEdited ? updateComment() : addComment()
                "
            >
                <div>
                    <Label class="sr-only" for="body">Comment</Label>
                    <TextArea
                        id="body"
                        ref="commentTextAreaRef"
                        v-model="commentForm.body"
                        placeholder="Speak your mind Spock..."
                        rows="4"
                    />
                    <InputError :message="commentForm.errors.body" />
                </div>

                <Button
                    :disabled="commentForm.processing"
                    class="mt-3"
                    type="submit"
                >
                    {{
                        commentIdBeingEdited ? 'Update Comment' : 'Add Comment'
                    }}
                </Button>
                <Button
                    v-if="commentIdBeingEdited"
                    class="ml-2"
                    type="button"
                    variant="secondary"
                    @click="cancelEditComment"
                >
                    Cancel
                </Button>
            </form>

            <ul class="mt-4 divide-y">
                <li
                    v-for="comment in comments.data"
                    :key="comment.id"
                    class="bg-sidebar px-2 py-4"
                >
                    <Comment
                        :comment="comment"
                        @delete="deleteComment"
                        @edit="editComment"
                    />
                </li>
            </ul>

            <Pagination :meta="comments.meta" :only="['comments']" />
        </div>
    </Container>
</template>
