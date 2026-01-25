export interface ReactTablePagination {
  pageIndex: number;
  pageSize: number;
  search?: string;
}

export interface Pagination {
  page: number;
  limit?: number;
  search?: string;
}

export interface ProductoPagination extends Pagination {
  category?: string;
}
