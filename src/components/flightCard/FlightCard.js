import React from 'react';
import { Link } from 'react-router-dom';

export default function FlightCard({
  imageSrc,
  imageAlt,
  title,
  price,
  features = [],
  buttonText = 'Book now',
  imageLink
}) {
  return (
    <div className="flex flex-col p-8 gap-8 w-full bg-[#eec09a] rounded-2xl max-w-full md:max-w-none">
      {/* Title at the very top */}
      <div className="flex justify-between items-start w-full">
        <h3 className=" text-2xl font-bold text-black" style={{textIndent:"50px"}}>{title}</h3>
        <span className="text-lg font-bold text-black">
          Price: <span className="text-[#b94c2a] text-2xl">${price}</span>
        </span>
      </div>

      {/* Content row (image + details) */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Image Section */}
        <div className="w-full md:w-2/5 flex items-center justify-center">
          {imageLink ? (
            <Link to={imageLink} className="block w-full h-full">
              <img 
                src={imageSrc} 
                alt={imageAlt}
                className="rounded-2xl object-cover w-full h-[300px] md:h-[340px] transition-transform hover:scale-105 cursor-pointer"
                style={{ objectPosition: 'center' }}
              />
            </Link>
          ) : (
            <img 
              src={imageSrc} 
              alt={imageAlt}
              className="rounded-2xl object-cover w-full h-[300px] md:h-[340px]"
              style={{ objectPosition: 'center' }}
            />
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-3/5 flex flex-col justify-between">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-2xl mt-1">{feature.icon}</span>
                <div>
                  <span className="font-bold text-black">{feature.label}</span>
                  <div className="text-black/80 text-sm">{feature.description}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-end mt-8">
            <Link to="/booking" className="bg-[#b94c2a] hover:scale-110 transition-all duration-300 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-bold text-lg uppercase tracking-wider transition-colors shadow-lg">
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
            