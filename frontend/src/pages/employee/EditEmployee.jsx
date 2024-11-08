import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox
} from '@mui/material';
import { fetchEmployeeByIdAction, updateEmployeeAction } from '../../redux/actions'; 

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BACKEND_URL;

  const employee = useSelector(state => state.userReducer.employeeById); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
    resume: null
  });

  const [imageText, setImageText] = useState('No file selected.');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
  
    dispatch(fetchEmployeeByIdAction(id, (response) => {
      if (response) {
        console.log(response);
        setFormData(response.data.data); 
        if (response.data.data.image) {
          setImagePreview(response.data.data.image); 
        }
      }
    }));
  }, [id, dispatch]);


  useEffect(() => {
    if (employee) {
      setFormData(employee);
      if (employee.image) {
        setImagePreview(employee.image); 
      }
    }
  }, [employee]);



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ?
        checked ? [...prevData[name], value] : prevData[name].filter(item => item !== value)
        : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file
      }));
      setImageText(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(updateEmployeeAction({...formData,id},(response)=>{
      if(response.success){
        navigate('/employee/manage');
      }
      else{
        console.error('Failed to update employee',response.message);
      }
    }))

  };

  return (
    <Card sx={{ p: 4, mx: 'auto' }}>
      <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
        Edit Employee
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile No"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Designation</InputLabel>
              <Select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                label="Designation"
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Courses</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="courses"
                      value="MCA"
                      checked={formData.courses.includes('MCA')}
                      onChange={handleInputChange}
                    />
                  }
                  label="MCA"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="courses"
                      value="BCA"
                      checked={formData.courses.includes('BCA')}
                      onChange={handleInputChange}
                    />
                  }
                  label="BCA"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="courses"
                      value="BSC"
                      checked={formData.courses.includes('BSC')}
                      onChange={handleInputChange}
                    />
                  }
                  label="BSC"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Image: {imageText}
              </Typography>
              <Button variant="contained" component="label" color="primary">
                Upload Image
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  hidden
                />
              </Button>
              {imagePreview && (
                <Box mt={2}>
                  <img
                    src={`${url}${imagePreview}`}
                    alt="Image Preview"
                    style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default EditEmployee;
