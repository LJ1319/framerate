export type PaginationMeta = {
    current_page: number;
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
