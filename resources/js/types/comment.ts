import type { User } from '@/types/auth';

export type Comment = {
    id: number;
    body: string;
    created_at: string;
    user: User;
    can: {
        update: boolean | null;
        delete: boolean | null;
    };
};
