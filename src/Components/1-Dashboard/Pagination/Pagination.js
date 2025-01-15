import Pagination from '@mui/material/Pagination';

export function PaginatedItems({ itemsPerPage, total, setPage }) {
  const pageCount = Math.ceil(total / itemsPerPage);
  return (
    <div >
      <Pagination
        count={pageCount} // Make sure `pageCount` is defined
        variant="outlined"
        shape="rounded"
        color='primary'
        onChange={(event, value) => setPage(value)} // Adjust to your page state management
      />
    </div>
  );
}