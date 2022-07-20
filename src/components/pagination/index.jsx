import React, { useEffect, useState } from "react";
import ArrowLeft from "assets/icons/pagination-arrow-left.png";
import ArrowRight from "assets/icons/pagination-arrow-right.png";

export const Pagination = ({
  totalPage,
  currentPage,
  onClickPageNumberBtnClick,
  onClickNextPageBtnClick,
  onClickPrevPageBtnClick,
}) => {
  return (
    <div className="w-full flex justify-center items-center mt-3.5">
      <div className="inline-flex justify-center items-center">
        <button
          disabled={currentPage <= 1}
          className={`flex justify-center items-center bg-violet-hover-alt-color rounded-lg w-14 h-10 transition-all mr-5 ${
            !(currentPage <= 1)
              ? "hover:bg-violet-hover-color"
              : "cursor-not-allowed"
          }`}
          onClick={onClickPrevPageBtnClick}
        >
          <img src={ArrowLeft} alt="pagination-arrow-icon" />
        </button>
        <div className="hidden md:flex">
          {[...new Array(totalPage)].map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-full text-white border-none font-bold hover:bg-violet-hover-color flex justify-center items-center transition-all p-1.5 mx-2 ${
                currentPage === index + 1
                  ? "bg-violet-hover-color"
                  : "bg-violet-hover-alt-color"
              }`}
              onClick={() => onClickPageNumberBtnClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage >= totalPage}
          className={`flex justify-center items-center bg-violet-hover-alt-color rounded-lg w-14 h-10 transition-all ml-5 ${
            !(currentPage >= totalPage)
              ? "hover:bg-violet-hover-color"
              : "cursor-not-allowed"
          }`}
          onClick={onClickNextPageBtnClick}
        >
          <img src={ArrowRight} alt="pagination-arrow-icon" />
        </button>
      </div>
    </div>
  );
};
