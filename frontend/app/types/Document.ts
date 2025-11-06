export interface Document{
    id: string,
    title: string,
    slug: string,
    owner_id: number,
    text: string, 
    date_created: string,
    date_modified: string, 
    is_public: boolean
}