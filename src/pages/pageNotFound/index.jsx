import "./PageNotFound.scss";
import React from "react";
import NotFoundImage from "assets/images/404.png";
import ButtonComp from "components/buttonComp";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-minus-header flex justify-center items-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        <div className="w-full flex-1 px-2.5 md:p-3">
          <div className="mx-auto pnf-image__container">
            <div className="relative pnf-image__wrapper">
              <img
                src={NotFoundImage}
                alt="not-found"
                className="w-full h-full absolute left-0 top-0 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col justify-center items-center md:items-start text-white px-2.5 md:p-3 mt-6 md:mt-0">
          <h6 className="font-bold text-2xl md:text-5xl">Page not found</h6>
          <p className="text-lg md:text-xl mt-3.5 mb-6">
            Oops.. Looks like you got lost :(
          </p>
          <div className="max-w-xs w-full">
            <ButtonComp
              label={"Go Back Home"}
              isPrimary={true}
              btnAction={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
