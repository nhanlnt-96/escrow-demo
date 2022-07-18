import {useEffect, useState} from "react";

export const DropdownComp = ({
                               label,
                               data,
                               defaultIndex,
                               value,
                               setValue
                             }) => {
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    setValue(data[defaultIndex]);
  }, []);
  const onSelectCurrencyCrypto = (val) => {
    setValue(val);
    setIsShowDropdownMenu(false);
  };
  return (
    <div className="relative">
      <button
        className="w-full text-black bg-white hover:bg-violet-hover-color hover:text-white focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center flex justify-between items-center"
        type="button"
        onClick={() => setIsShowDropdownMenu(!isShowDropdownMenu)}
      >
        {
          value ? (
            <div className="flex items-center flex-1">
              <div className="flex items-center">
                <img src={value.icon} alt={value.name}/>
                <p className="font-bold uppercase ml-4">{value.symbol}</p>
              </div>
              {value.badge &&
                <div className="bg-green-light text-white text-10px rounded-full uppercase font-medium flex justify-center items-center p-1.5 ml-1.5">{value.badge}</div>}
            </div>
          ) : label
        }
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
          />
        </svg>
      </button>
      <div
        className={`z-10 w-60 bg-white rounded shadow absolute w-full mt-1.5 ${
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
                />
              </svg>
            </div>
            <input
              type="text"
              className="block p-2 pl-10 w-full text-base text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={searchInput}
              placeholder="Search crypto"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <ul className="overflow-y-auto pt-2 h-48 text-sm text-gray-700">
          {data.filter((val) => (val.name.toLowerCase().includes(searchInput?.trim().toLowerCase()) || val.symbol.toLowerCase().includes(searchInput?.trim().toLowerCase()))).map((val, index) => (
            <li
              key={index}
              className="flex justify-center items-center py-3 px-6 transition-all cursor-pointer hover:bg-gray-lighter"
              onClick={() => onSelectCurrencyCrypto(val)}
            >
              <div className="flex items-center flex-1">
                <div className="flex items-center">
                  <img src={val.icon} alt={val.name}/>
                  <p className="font-bold uppercase ml-4 text-black text-lg">{val.symbol}</p>
                </div>
                {val.badge &&
                  <div className="bg-green-light text-white text-10px rounded-full uppercase font-medium flex justify-center items-center p-1.5 ml-1.5">{val.badge}</div>}
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
