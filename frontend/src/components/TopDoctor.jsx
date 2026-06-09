import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // Function to get initials from doctor name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 px-3 sm:px-0">
        {doctors.slice(0, 4).map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col bg-blue-50 border border-gray-200 rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full min-h-[320px]"
             onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
          >
            {/* Available Badge */}
            <div className="self-start mb-3">
              <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Available
              </span>
            </div>

            {/* Doctor Image or Avatar with Initials */}
            <div className="flex justify-center mb-6">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 rounded-full object-cover bg-blue-50"
                />
              ) : (
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-2xl font-semibold">
                    {getInitials(item.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Doctor Info - Flexible space */}
            <div className="text-center mb-6 flex-grow">
              <h3 className="text-gray-900 text-xl font-semibold mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-base">
                {item.speciality}
              </p>
            </div>

            {/* Book Appointment Button - Always at bottom */}
            <button 
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg border border-blue-200 hover:bg-blue-800 transition-colors duration-200 mt-auto text-base"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button 
        onClick={() => {
          navigate('/doctors'); 
          scrollTo(0, 0);
        }} 
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctor;