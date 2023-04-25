import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const formValidationSchema = yup.object({
  username: yup.string().required().min(5),
  password: yup.string().required().min(8),
  repassword: yup.string().required()
  .oneOf([yup.ref('password'), null], 'Passwords must match'
)
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Signup() {

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        password:"",
        repassword: ""
      },
      validationSchema: formValidationSchema,
      onSubmit: async (e) => {
        const result = await fetch("http://localhost:4000/signup", {
          method: "POST",
          body: JSON.stringify(e),
          headers: { "Content-Type": "application/json" },
        }).then((data) => data);
        if (result.status == 200) {
         navigate("/");
        } else {
          handleClick();
        }
        // const res =await result.json();
      },
    });
  // const loggedin = () => {
  //   const newCard = {
  //     username: username,
  //     password: password,
  //   };
  //   fetch("http://localhost:4000/signup", {
  //     method: "POST",
  //     body: JSON.stringify(newCard),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   const url = fetch("http://localhost:4000/", {
  //     headers: {
  //       "x-auth-token": "",
  //     },
  //   }).then((data) => {
  //     if (data.status == 200) {
  //       data.text().then((crd) => navigate("/user"));
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // };
  return (
    <div style={{ padding: "80px 0" }}>
      <div>
        <h1
          style={{
            margin: "auto",
            width: "115px",
          }}
        >
          DayDiet
        </h1>
      </div>
      <div className="login-box">
        <p>Log in to account</p>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            id="username"
            label="username"
            variant="outlined"
            size="small"
          />
          {touched.username && errors.username ? errors.username : null}
          <TextField
            autoComplete="on"
            id="password"
            label="password"
            variant="outlined"
            size="small"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password ? errors.password : null}
          <TextField
            autoComplete="on"
            id="repassword"
            label="retype-password"
            variant="outlined"
            size="small"
            type="password"
            name="repassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.repassword}
          />
          {touched.repassword && errors.repassword ? errors.repassword : null}
          <Button variant="contained" type="submit">
            Signup
          </Button>
          <div>
            <a onClick={(e) => navigate("/")}>Already have an account</a>
          </div>
        </form>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          User name is already exist!
        </Alert>
      </Snackbar>
      </div>
    </div>
  );
}
