<script lang="ts" setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { PaginationMeta } from '@/types';

type Props = {
    meta: PaginationMeta,
}

const props = defineProps<Props>();

const previousUrl = computed(() => props.meta.links[0]?.url ?? undefined);
const nextUrl = computed(() => props.meta.links.at(-1)?.url ?? undefined);
</script>

<template>
    <div
        class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
    >
        <div class="flex flex-1 justify-between sm:hidden">
            <Link
                :href="previousUrl"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Previous
            </Link>
            <Link
                :href="nextUrl"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Next
            </Link>
        </div>
        <div
            class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
        >
            <div>
                <p class="text-sm text-gray-700">
                    Showing
                    {{ " " }}
                    <span class="font-medium">{{ meta.from }}</span>
                    {{ " " }}
                    to
                    {{ " " }}
                    <span class="font-medium">{{ meta.to }}</span>
                    {{ " " }}
                    of
                    {{ " " }}
                    <span class="font-medium">{{ meta.total }}</span>
                    {{ " " }}
                    results
                </p>
            </div>
            <div>
                <nav
                    aria-label="Pagination"
                    class="isolate inline-flex -space-x-px rounded-md bg-sidebar shadow-sm"
                >
                    <template v-for="link in meta.links" :key="link.url">
                        <Link
                            v-if="link.url"
                            :class="{
                                'z-10 bg-sidebar-accent': link.active,
                            }"
                            :href="link.url"
                            class="relative inline-flex items-center px-3 py-2 first-of-type:rounded-l-md last-of-type:rounded-r-md ring-gray-300 ring-1 ring-inset"
                        >
                            <span v-html="link.label"></span>
                        </Link>
                    </template>
                </nav>
            </div>
        </div>
    </div>
</template>

