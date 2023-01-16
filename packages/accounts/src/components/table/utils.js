export function calculatePaginationEntries(
    totalCount,
    pageNumber,
    pageLimit
  ) {
    return {
      lastPage: Math.ceil(totalCount / pageLimit),
      from: (pageNumber - 1) * pageLimit + 1,
      to: pageNumber * pageLimit < totalCount ? pageNumber * pageLimit : totalCount
    };
  }
  
export const numberWithCommas = (x) => x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
