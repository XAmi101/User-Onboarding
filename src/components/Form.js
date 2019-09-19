import React, {  useState, useEffect } from 'react';
import { Form as FormikForm, Field, withFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import "../App.css"

const Form = ({ errors, touched, status, values }) => {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
        if(status){
            setUsers(users => [...users, status]);
        }
    }, [status]);


  return (
    <div>
      <h1>User Form</h1>
      <FormikForm className='user-form'>
        <label>
          Username:
          <Field type='text' name='username' />
          {touched.username && errors.username && (
            <p className='error'>{errors.username}</p>
          )}
        </label>
        <label>
          Name:
          <Field type='text' name='name' />
          {touched.name && errors.name && (
            <p className='error'>{errors.name}</p>
          )}
        </label>
        <label>
          Role:
          <Field component='select' name='role'>
            <option>Select a Role</option>
            <option value='Full Stack Developer'>Full Stack Developer</option>
            <option value='Software Developer'>Software Developer</option>
            <option value='Data Scientist'>Data Scientist</option>
            <option value='UX Designer'>UX Designer</option>
          </Field>
          {touched.role && errors.role && (
            <p className='error'>{errors.role}</p>
          )}
        </label>
        <label>
          Email:
          <Field type='email' name='email' />
          {touched.email && errors.email && (
            <p className='error'>{errors.email}</p>
          )}
        </label>
        <label>
          Password:
          <Field type='password' name='password' />
          {touched.password && errors.password && (
            <p className='error'>{errors.password}</p>
          )}
        </label>
        <label>
          Terms of Service:
          <Field
            type='checkbox'
            name='termOfService'
            checked={values.termOfService}
          />
          {touched.termOfService && errors.termOfService && (
            <p className='error'>{errors.termOfService}</p>
          )}
        </label>
        <button type='submit' className='user-form-submit'>
          Submit
        </button>
      </FormikForm>


<br /><br /><br /><br /><br /><br />



<div className='userList'>
  {users.map(user => (
  <div className='userCards'key={user.id}><h4>List of Users</h4>
      <span>Name: {user.username}</span>
      <br></br>
      <span>Email: {user.email}</span>
      <br></br>
      <span>Role: {user.role}</span>
  </div>
  ))}
</div>


            <br /><br /><br /><br />
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(values) {
    return {
      username: values.username || '',
      name: values.name || '',
      role: values.role || '',
      email: values.email || '',
      password: values.password || '',
      termOfService: values.termOfService || false,
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string()
      .lowercase()
      .required('Username is required'),
    name: Yup.string()
      .lowercase()
      .required('Name is required'),
    role: Yup.string().required('Role is required'),
    email: Yup.string()
      .lowercase()
      .email('Invalid e-mail')
      .required('E-mail is a required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters and 1 number')
      .required('Password is a required'),
    termOfService: Yup.bool()
      .oneOf([true], 'Terms of Service must be checked')
      .required(),
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    // console.log(values);
    axios.post('https://reqres.in/api/users', values).then(res => {
      console.log('HTTP POST response: ', res);
      setStatus(res.data);
      resetForm();
    });
  },
})(Form);

export default FormikUserForm;
