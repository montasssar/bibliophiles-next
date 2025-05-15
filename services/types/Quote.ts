
export interface Quote {
  id: string;
  text: string;
  author: string;
  tags: string[];
}

export interface FilterArgs {
  tag?: string;
  author?: string;
  search?: string;
  page?: number;
  limit?: number;
  matchAll?: boolean;
  }