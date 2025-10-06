export interface ReactTablePagination {
  pageIndex: number;
  pageSize: number;
}

export interface Pagination {
  page: number;
  limit?: number;
  search?: string;
}
