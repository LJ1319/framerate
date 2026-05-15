export type PaginationMeta = {
    from: string;
    to: string;
    total: number;
    links: PaginationLink[];
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};
