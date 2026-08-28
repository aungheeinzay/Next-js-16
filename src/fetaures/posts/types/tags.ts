// 1. Data Structure သတ်မှတ်ခြင်း
export interface Tag {
    id: string;
    name: string;
    slug: string;
    usageCount: number;
}

// 2. Component Props သတ်မှတ်ခြင်း
export interface TagListProps {
    items: Tag[];
    onSelectTag: (tag: Tag) => void;
    isLoading?: boolean;
}

// 3. API Response Contract
export interface TagSearchResponse {
    data: Tag[];
    error?: string;
}