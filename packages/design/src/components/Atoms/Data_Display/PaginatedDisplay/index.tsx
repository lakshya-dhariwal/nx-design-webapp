import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { tv } from "tailwind-variants";

interface PaginatedDisplayProps {
  items: React.ReactNode[];
  className?: string;
  itemHeight?: number;
  containerClassName?: string;
}

const PaginatedDisplay: React.FC<PaginatedDisplayProps> = ({
  items,
  className,
  itemHeight = 26,
  containerClassName,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [pageButtons, setPageButtons] = useState<number[]>([1, 2, 3]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const sampleItemHeight = itemHeight;
        const calculatedItemsPerPage = Math.floor(
          containerHeight / sampleItemHeight,
        );
        setItemsPerPage(Math.max(1, calculatedItemsPerPage) - 1);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const displayedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const pageButtonClassName = tv({
    base: "text-center text-sm p-2 rounded-md ",
    variants: {
      active: {
        true: "bg-primary-400",
        false: "bg-white bg-opacity-10 backdrop-blur-2xl",
      },
      noPage: {
        true: "opacity-40 cursor-not-allowed",
        false: "",
      },
    },
  });

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{ height: "100%" }}
    >
      <div className={className}>
        {displayedItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className="w-fit grid grid-cols-5 gap-1 mt-4">
        <button
          className="p-2 rounded-md bg-white bg-opacity-10 backdrop-blur-2xl"
          onClick={() =>
            setPageButtons((prev) => [prev[0] - 3, prev[1] - 3, prev[2] - 3])
          }
          disabled={pageButtons[0] === 1}
        >
          <MdKeyboardArrowLeft />
        </button>
        {pageButtons.map((pageNumber) => (
          <button
            disabled={currentPage === pageNumber || pageNumber > pageCount}
            key={pageNumber}
            className={pageButtonClassName({
              active: currentPage === pageNumber,
              noPage: pageNumber > pageCount,
            })}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="p-2 rounded-md bg-white bg-opacity-10 backdrop-blur-2xl"
          disabled={pageButtons.includes(pageCount)}
          onClick={() =>
            setPageButtons((prev) => [prev[0] + 3, prev[1] + 3, prev[2] + 3])
          }
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PaginatedDisplay;
