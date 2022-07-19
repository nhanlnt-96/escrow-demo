import React from "react";

const ButtonComp = ({
                      label,
                      isPrimary,
                      isDisabled,
                      btnAction
                    }) => {
  return (
    <div
      className={
        isPrimary
          ? "rounded-30px border border-violet-hover-color p-1.5 flex items-center justify-center"
          : ""
      }
    >
      <button
        disabled={isDisabled}
        type="submit"
        onClick={(e) => btnAction(e)}
        className={`py-2.5 px-8 text-center bg-violet-hover-color transition-all border-violet-hover-color border rounded-3xl w-full font-bold text-lg text-white ${
          !isDisabled ? "hover:bg-violet-hover-alt-color" : "cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    </div>
  );
};

export default ButtonComp;
