import React from 'react';
import { useLocation } from 'react-router-dom';
import ProfileSection from './ProfileSection'; // Import the new component

const Navbar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const currentPage = pathnames[0] || 'dashboard';

  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold capitalize">
          {currentPage.replace('-', ' ')}
        </h2>
      </div>
      <ProfileSection />
    </div>
  );
};

export default Navbar;