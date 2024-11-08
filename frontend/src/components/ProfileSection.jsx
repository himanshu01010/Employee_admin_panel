import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../redux/actions';
import { useDispatch } from 'react-redux';


const ProfileSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email')
  const user = {
    name: name,
    email: email,
    avatar: '/api/placeholder/32/32'
  };

  const handleLogout = () => {
    dispatch(logoutAction((response) => {
      if (response.success) {
        console.log("Logged out successfully");
        navigate("/login");  
      } else {
        console.error("Logout failed:", response.message);
      }
    }));
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
          src={user.avatar}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-gray-700">{user.name}</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              navigate('/profile');
              setIsDropdownOpen(false);
            }}
          >
            Your Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              navigate('/settings');
              setIsDropdownOpen(false);
            }}
          >
            Settings
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={() => {
              handleLogout();
              setIsDropdownOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;