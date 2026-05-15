<script lang="ts" setup>
import { Link, usePage } from '@inertiajs/vue3';
import { LayoutGrid, LogIn, NotepadText } from 'lucide-vue-next';
import AppLogo from '@/components/AppLogo.vue';
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { dashboard, login } from '@/routes';
import { index as posts } from '@/routes/posts';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        isShown: !!usePage().props.auth.user,
    },
    {
        title: 'Posts',
        href: posts(),
        icon: NotepadText,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Log In',
        href: login(),
        icon: LogIn,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton as-child size="lg">
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter v-if="!$page.props.auth.user" :items="footerNavItems" />
            <NavUser v-else />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
