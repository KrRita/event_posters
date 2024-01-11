type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChanged: (value: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChanged,
}: PaginationProps) => {
  return (
    <div className="flex gap-3 justify-center mt-2">
      <button className="bg-[#423144] p-2 text-[#ffdbc5] text-xl rounded-xl"
        disabled={currentPage <= 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Предыдущая
      </button>
      <div className="bg-[#423144] p-2 text-[#ffdbc5] text-xl rounded-xl">
        {currentPage} / {totalPages}
      </div>
      <button className="bg-[#423144] p-2 text-[#ffdbc5] text-xl rounded-xl"
        disabled={currentPage == totalPages}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Следующая
      </button>
    </div>
  );
};
