const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 items-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border border-border rounded-md disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm text-text-muted">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border border-border rounded-md disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;