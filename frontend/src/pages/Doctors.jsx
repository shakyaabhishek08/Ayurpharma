import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const {speciality} = useParams()
  const {doctors} = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter,setShowFilter]=useState(false)
  const applyFilter = () => {
    if(speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const navigate = useNavigate();

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
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>
            General physician
          </p>
          <p onClick={() => speciality === 'Stri Roga' ? navigate('/doctors') : navigate('/doctors/Stri Roga')}
             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>
            Stri Roga
          </p>
          <p onClick={() => speciality === 'Kaya Chikitsa' ? navigate('/doctors') : navigate('/doctors/Kaya Chikitsa')}
             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>
            Kaya Chikitsa
          </p>
          <p onClick={() => speciality === 'Bala Roga' ? navigate('/doctors') : navigate('/doctors/Bala Roga')}
             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>
            Bala Roga
          </p>
          <p onClick={() => speciality === 'Vata Vyadhi Specialist' ? navigate('/doctors') : navigate('/doctors/Vata Vyadhi Specialist')}
             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>
            Vata Vyadhi Specialis
          </p>
          <p onClick={() => speciality === 'Agni & Pachan Tantra)' ? navigate('/doctors') : navigate('/doctors/Agni & Pachan Tantra)')}
             className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>
            Agni & Pachan Tantra
          </p>
        </div>
        
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 gap-y-6 auto-rows-fr'>
          {
            filterDoc.map((item, index) => (
              <div 
                key={index} 
                onClick={() => navigate(`/appointment/${item._id}`)} 
                className="flex flex-col bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full min-h-[280px] max-w-[300px] mx-auto w-full"
              >
                {/* Available Badge */}
                <div className="self-start mb-3">
                  <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    Available
                  </span>
                </div>

                {/* Doctor Image or Avatar with Initials */}
                <div className="flex justify-center mb-4">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 rounded-full object-cover bg-blue-50"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-semibold">
                        {getInitials(item.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Doctor Info - Flexible space */}
                <div className="text-center flex-grow">
                  <h3 className="text-gray-900 text-lg font-semibold mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.speciality}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors