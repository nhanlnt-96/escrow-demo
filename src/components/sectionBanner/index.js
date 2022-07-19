import "./SectionBanner.scss";
import React from "react";

const SectionBanner = ({
                         title,
                         image
                       }) => {
  return (
    <div className="w-full section-banner">
      <div className="w-full section-banner__container">
        <div className="w-full relative section-banner__wrapper">
          <img
            src={image}
            alt="section-banner"
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
          <div className="container">
            {title && (
              <h6 className="font-bold text-white text-2xl md:text-5xl">{title}</h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBanner;
