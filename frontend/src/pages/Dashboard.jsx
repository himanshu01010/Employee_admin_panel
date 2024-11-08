import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalEmployeesAction } from '../redux/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const totalEmployees = useSelector((state) => state.userReducer.totalEmployees);

  useEffect(() => {
    dispatch(fetchTotalEmployeesAction());
  }, [dispatch]);

  const stats = [
    { title: 'Total Employee', value: totalEmployees, icon: '👤' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
        >
          <div>
            <h3 className="text-gray-500 text-sm mb-2">{stat.title}</h3>
            <p className="text-2xl font-semibold text-blue-500">{stat.value}</p>
          </div>
          <div className="text-3xl">{stat.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
