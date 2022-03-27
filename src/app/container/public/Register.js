import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
// A text field component with label and error code 
import TextField from "../../components/ui/TextField";
import { regxvalidator } from "../../helpers/constant";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return state;
  }
};
const Register = () => {
  const navigation = useNavigate();

//   Added reducer to handle complex data
  const [registrationData, dispatch] = useReducer(reducer, initialData);

//   Error list which store all the erorr on time of submission and show to users
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState('');

//   Updating reducer data with dynamic field and value
  const handleChange = (event) => {
    const dispatchpayload = {
      type: "UPDATE",
      field: event.target.name,
      payload: event.target.value,
    };
    dispatch(dispatchpayload);
  };

//   call once clicked on Registration button
  const doFormValidation = () => {
    let tempErrorList = [];
    const { firstName, lastName, email, password, confirmPassword } =
      registrationData;
    if (!firstName || !regxvalidator["name"].test(firstName)) {
      tempErrorList.push({
        field: "firstName",
        error: "Please provide valid first name!",
        hint: "Must be of  2 to 8 charcacter",
      });
    }
    if (!lastName || !regxvalidator["name"].test(lastName)) {
      tempErrorList.push({
        field: "lastName",
        error: "Please provide valid last name!",
        hint: "Must be of  2 to8 charcacter",
      });
    }
    if (!email) {
      tempErrorList.push({
        field: "email",
        error: "Please provide valid email!",
      });
    }
    if (!password || !regxvalidator["password"].test(password)) {
      tempErrorList.push({
        field: "password",
        error: "Please provide valid password !",
        hint: "password must be between 6 to 20 character with this special char (- , _ @)",
      });
    }

    if (
      !confirmPassword ||
      password !== confirmPassword ||
      !regxvalidator["password"].test(password)
    ) {
      tempErrorList.push({
        field: "confirmPassword",
        error: "Confirm password not match with password!",
        hint:
          password !== confirmPassword
            ? "Password not match with confirm password"
            : "password must be between 6 to 20 character with this special char (- , _ @)",
      });
    }

    if (tempErrorList.length) {
        // return errors
      setErrorList(tempErrorList);
      return;
    } else {
      //   Stire registration data into localstorage for further verification
      let registerArray=JSON.parse(localStorage.getItem('registerDetail'))

      console.log("registerArray.length",registerArray.length)
        if(registerArray.length)
        {
            let findSameData=registerArray.find((x)=>x.email===registrationData.email)
            if(!findSameData)
            {
            registerArray.push(registrationData)
            localStorage.setItem("registerDetail", JSON.stringify(registerArray));
            }
            else{
                setError('Email already registered!')
                return
            }

        }
        else{
      localStorage.setItem("registerDetail", JSON.stringify([registrationData]));
        }
      navigation("/login");
    }
  };

  return (
    <>
      <h1>Registration Page</h1>
      <form>
        <TextField
          label="First Name*"
          name="firstName"
          type="text"
          value={registrationData.firstName}
          onChange={handleChange}
          error={errorList.find((x) => x.field === "firstName") || false}
        />

        <TextField
          label="Last Name*"
          name="lastName"
          type="text"
          value={registrationData.lastName}
          onChange={handleChange}
          error={errorList.find((x) => x.field === "lastName") || false}
        />
        <TextField
          label="Email*"
          name="email"
          type="email"
          value={registrationData.email}
          onChange={handleChange}
          error={errorList.find((x) => x.field === "email") || false}
        />
        <TextField
          label="Password*"
          name="password"
          type="password"
          value={registrationData.password}
          onChange={handleChange}
          error={errorList.find((x) => x.field === "password") || false}
        />
        <TextField
          label="Confirm Password*"
          name="confirmPassword"
          type="password"
          value={registrationData.confirmPassword}
          onChange={handleChange}
          error={errorList.find((x) => x.field === "confirmPassword") || false}
        />

        <br />

        {error && <strong>{error}</strong>}
        <button type="button" onClick={doFormValidation}>
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
