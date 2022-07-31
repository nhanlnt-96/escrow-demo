import React from "react";

export const CurrencyListHeader = ({
  setIsFilterBy,
  isFilterBy,
  status,
  totalItem,
}) => {
  const onFilterListBtnClick = (filterBy) => {
    if (filterBy !== "all") {
      setIsFilterBy(filterBy);
    } else {
      setIsFilterBy("");
    }
  };
  return (
    <div className="flex justify-between items-center flex-col xl:flex-row my-3.5 md:my-0 md:mb-3.5">
      <div className="flex items-center flex-wrap gap-1.5">
        <div className="mr-1.5 last:mr-0">
          <button
            className={`py-2.5 px-5 text-center transition-all border-violet-hover-color border rounded-3xl w-full font-bold text-lg text-white capitalize hover:bg-violet-hover-color ${
              !isFilterBy
                ? "bg-violet-hover-color"
                : "bg-violet-hover-alt-color"
            }`}
            onClick={() => onFilterListBtnClick("all")}
          >
            All
          </button>
        </div>
        {status.map((val, index) => (
          <div key={index} className="mr-1.5 last:mr-0">
            <button
              className={`py-2.5 px-5 text-center transition-all border-violet-hover-color border rounded-3xl w-full font-bold text-lg text-white capitalize hover:bg-violet-hover-color ${
                isFilterBy === val
                  ? "bg-violet-hover-color"
                  : "bg-violet-hover-alt-color"
              }`}
              onClick={() => onFilterListBtnClick(val)}
            >
              {val.toLowerCase()}
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end w-full xl:w-max xl:justify-center mt-3.5 xl:mt-0">
        <p className="text-white text-lg">Total items: {totalItem}</p>
      </div>
    </div>
  );
};
