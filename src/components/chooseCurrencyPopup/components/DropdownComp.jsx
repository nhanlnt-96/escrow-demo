import { useState } from "react";

export const DropdownComp = ({ label, data }) => {
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  return (
    <div className="relative">
      <button
        className="w-full text-white bg-violet-hover-color hover:bg-violet-hover-alt-color focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center flex justify-between items-center"
        type="button"
        onClick={() => setIsShowDropdownMenu(!isShowDropdownMenu)}
      >
        {label}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`z-10 w-60 bg-violet-hover-color rounded shadow absolute w-full mt-1.5 ${
          !isShowDropdownMenu && "hidden"
        }`}
      >
        <div className="p-3">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search crypto"
            />
          </div>
        </div>
        <ul className="overflow-y-auto pb-3 h-48 text-sm text-gray-700">
          {data.map((val, index) => (
            <li
              key={index}
              className="flex justify-center items-center py-3 px-6 transition-all cursor-pointer hover:bg-violet-hover-alt-color"
            >
              <div className="flex items-center flex-1">
                <div className="flex items-center">
                  <img src={val.icon} alt={val.name} />
                  {val.badge && <div>{val.badge}</div>}
                </div>
                <p className="font-bold uppercase ml-1.5">{val.symbol}</p>
              </div>
              <div className="flex-1">
                <p className="text-center text-gray-light capitalize">
                  {val.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
