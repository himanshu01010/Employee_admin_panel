import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  LineChart,
  FolderTree,
  ListOrdered,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Truck,
  Store,
  ShoppingCart,
  Users
} from 'lucide-react';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    categories: false,
    paidAds: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    { 
      icon: <LayoutDashboard className="w-5 h-5 mr-2" />, 
      text: 'DASHBOARD', 
      path: '/dashboard' 
    },
    { 
      icon: <Users className="w-5 h-5 mr-2" />, 
      text: 'EMPLOYEE', 
      submenu:[
        {icon:<PlusCircle className='w-5 h-5 mr-2'/>, text:'Create Employee', path:'/Employee/create'},
        {icon:<ListOrdered className='w-5 h-5 mr-2'/>, text:'Manage Employee', path:'/Employee/manage'}
      ]
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg">
      <div className="p-4 text-xl font-bold border-b">
        Admin Panel
      </div>
      <div className="p-4 text-sm font-medium text-gray-600">
        MENU
      </div>
      <nav className="px-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.submenu ? (
              <div>
                <div
                  onClick={() => toggleMenu(item.text.toLowerCase().replace(' ', ''))}
                  className="flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                  {openMenus[item.text.toLowerCase().replace(' ', '')] ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                  }
                </div>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openMenus[item.text.toLowerCase().replace(' ', '')] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center p-2 ml-6 rounded-lg cursor-pointer transition-colors duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-green-400 to-purple-500 text-white'
                            : 'hover:bg-gray-100'
                        }`
                      }
                    >
                      {subItem.icon}
                      <span className='text-sm'>{subItem.text}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-green-400 to-purple-500 text-white'
                      : 'hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                <span>{item.text}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;