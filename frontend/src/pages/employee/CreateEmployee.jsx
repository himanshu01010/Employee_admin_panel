import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
  styled,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox
} from '@mui/material';
import { createEmployeeAction } from '../../redux/actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00e676',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00c853',
  },
}));

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
  });

  const [imageText, setImageText] = useState('No file selected.');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ?
        checked ? [...prevData[name], value] : prevData[name].filter(item => item !== value)
        : type === 'file' ? e.target.files[0] : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setImageText(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmployeeAction(formData, (response) => {
      if (response.success) {
        toast.success('Employee created successfully!');
        
        setFormData({
          name: '',
          email: '',
          mobileNo: '',
          designation: '',
          gender: '',
          courses: [],
          image: null,
        });
        setImageText('No file selected.');
      } else {
        toast.error('Failed to create employee');
      }
    }));
  };

  return (
    <StyledCard>
      <ToastContainer />
      <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
        Create Employee
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile No"
              name="mobileNo"
              type="tel"
              value={formData.mobileNo}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
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
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel>Gender</FormLabel>
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
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
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
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              component="label"
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {imageText}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <StyledButton type="submit" variant="contained" size="large">
                Submit
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StyledCard>
  );
};

export default CreateEmployee;
