import type { User } from '@/types/auth';

export type Comment = {
    id: number;
    body: string;
    created_at: string;
    user: User;
    can: {
        delete: boolean | null;
    };
};
