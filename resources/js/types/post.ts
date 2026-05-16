import type { User } from '@/types/auth';

export type Post = {
    id: number;
    title: string;
    body: string;
    created_at: string;
    user: User;
};
