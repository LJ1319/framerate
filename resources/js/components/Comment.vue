<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/composables/useInitials';
import type { Comment } from '@/types';
import { relativeDate } from '@/Utilities/date.js';

defineProps<{ comment: Comment }>();
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

        <div>
            <p class="break-all">{{ comment.body }}</p>
            <span
                class="mt-1 block text-xs text-gray-300 first-letter:uppercase"
            >
                By {{ comment.user.name }}
                {{ relativeDate(comment.created_at) }} ago
            </span>
        </div>
    </div>
</template>
