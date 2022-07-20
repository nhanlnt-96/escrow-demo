import "./SectionBanner.scss";
import React from "react";
import { Parallax } from "react-parallax";
import { useLocation } from "react-router-dom";
import { routes } from "configs";
import ArrowRightIcon from "assets/icons/arrow-right.png";
import { useWindowSize } from "utils";

const SectionBanner = ({ title, image }) => {
  const { pathname } = useLocation();
  const currentWidth = useWindowSize();
  return (
    <Parallax
      bgImage={currentWidth >= 768 ? image : ""}
      className="w-full h-40 md:h-80 xl:h-480px section-banner__parallax"
    >
      <div className="w-full h-full container mx-auto flex flex-col justify-center items-center md:items-start text-white px-3 xl:px-0">
        {title && (
          <h6 className="font-bold text-2xl md:text-5xl xl:text-6xl">
            {title}
          </h6>
        )}
        <p className="text-lg flex justify-start items-center mt-2.5">
          Home
          {pathname !== "/" && (
            <>
              <img
                src={ArrowRightIcon}
                alt="arrow-right-icon"
                className="mx-2"
              />
              <span className="after:content-['*']">
                {routes.find((val) => val.path === pathname).label}
              </span>
            </>
          )}
        </p>
      </div>
    </Parallax>
  );
};

export default SectionBanner;
