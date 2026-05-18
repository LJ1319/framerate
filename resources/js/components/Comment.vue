<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/composables/useInitials';
import type { Comment } from '@/types';
import { relativeDate } from '@/Utilities/date.js';

defineProps<{ comment: Comment }>();

defineEmits<{
    delete: [id: Comment['id']];
    edit: [id: Comment['id']];
}>();
</script>

<template>
    <div class="gap-4 sm:flex">
        <Avatar class="size-8 overflow-hidden rounded-full">
            <AvatarImage
                v-if="comment.user.avatar"
                :alt="comment.user.name"
                :src="comment.user.avatar"
            />
            <AvatarFallback
                class="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white"
            >
                {{ getInitials(comment.user?.name) }}
            </AvatarFallback>
        </Avatar>

        <div class="flex-1">
            <p class="break-all">{{ comment.body }}</p>

            <span
                class="mt-1 block text-xs text-gray-300 first-letter:uppercase"
            >
                By {{ comment.user.name }}
                {{ relativeDate(comment.created_at) }} ago
            </span>

            <div class="mt-2 flex justify-end gap-x-3 empty:hidden">
                <form
                    v-if="comment.can.update"
                    @submit.prevent="$emit('edit', comment.id)"
                >
                    <button
                        class="font-mono text-xs text-yellow-500 hover:font-semibold"
                    >
                        Edit
                    </button>
                </form>

                <form
                    v-if="comment.can.delete"
                    @submit.prevent="$emit('delete', comment.id)"
                >
                    <button
                        class="font-mono text-xs text-red-500 hover:font-semibold"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
