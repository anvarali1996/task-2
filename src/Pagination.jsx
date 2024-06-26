import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";

const PaginationButton = ({ setCurrentPage, currentPage, totalPages }) => {
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1); 
  };

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div variants={paginationVariants} initial="hidden" animate="visible">
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4"><BsChevronRight/></span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel={<span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4"><BsChevronLeft/></span>}
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-purple text-white"
      />
    </motion.div>
  );
};

export default PaginationButton;
