import React from "react";
import { DropdownComp } from "./components";
import { cryptoCurrencyList } from "configs";

const ChooseCurrencyPopup = () => {
  return (
    <div className="overflow-y-auto bg-black-light overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative bg-violet-light rounded-lg shadow text-white">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-8 text-2xl text-center font-medium text-white">
              Choosing pair of crypto
            </h3>
            <form className="space-y-6" action="#">
              <div>
                <DropdownComp label={"From"} data={cryptoCurrencyList} />
              </div>
              <div></div>
              <div className="rounded-30px border border-violet-hover-color p-1.5">
                <button
                  type="submit"
                  className="py-2.5 px-8 text-center bg-violet-hover-color transition-all border-violet-hover-color border rounded-3xl w-full font-bold text-lg hover:bg-violet-hover-alt-color"
                >
                  Choose
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCurrencyPopup;
