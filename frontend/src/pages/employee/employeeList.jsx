import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesAction, deleteEmployeeAction } from '../../redux/actions';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const imgurl = `${url}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(state => state.userReducer.employees);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    dispatch(fetchEmployeesAction());
  }, [dispatch]);

  const createEmployee = () => {
    navigate('/employee/create');
  };

  const handleEdit = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  const filteredEmployees = (employees || []).filter(employee =>
    employee.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    employee.mobileNo.includes(searchKeyword)
  );

  const handleDelete = (id) => {
    console.log("Deleting Employee ID:", id);
    if (!id) {
      alert("Employee ID not found");
      return;
    }
    dispatch(deleteEmployeeAction(id, (response) => {
      if (response.success) {
        alert("Employee deleted successfully");
        dispatch(fetchEmployeesAction());
      } else {
        alert("Failed to delete employee");
      }
    }));
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Employee List</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
        />
        <Button variant="contained" color="primary" onClick={createEmployee}>
          Create Employee
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sno</TableCell> 
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow key={employee.sno}>  
                <TableCell>{index + 1}</TableCell>  
                <TableCell>
                  <img src={`${imgurl}${employee.image}`} alt={employee.name} style={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobileNo}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.courses.join(', ')}</TableCell>
                <TableCell>{new Date(employee.createdDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleEdit(employee.uniqueId)}>Edit</Button>
                  <Button variant="outlined" color="error" size="small" sx={{ ml: 1 }} onClick={() => handleDelete(employee.uniqueId)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default EmployeeList;
