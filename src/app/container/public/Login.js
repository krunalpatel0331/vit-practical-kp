import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/ui/TextField";
import { regxvalidator } from "../../helpers/constant";

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [errorList, setErrorList] = useState([]);

  const doFormValidation = () => {
    let tempErrorList = [];

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

    if (tempErrorList.length) {
      setErrorList(tempErrorList);
      return;
    } else {
      checkCredentials();
    }
  };

  const checkCredentials = () => {
    const registerDetail = JSON.parse(
      localStorage.getItem("registerDetail") || false
    );
    if (registerDetail) {
      if (!registerDetail?.find((x)=>x.email ===email)) {
        setLoginError("Email not matched");
        return;
      } else if (!registerDetail?.find((x)=>x.password ===password)) {
        setLoginError("Password not matched");
        return;
      } else {
        //   Store a email in VIITCUR key to validation that the user ahs register is same who try to login into the panel
        localStorage.setItem("VIITCUR", email);
        navigation("/");
      }
    } else {
      setLoginError("No profile found please register first!");
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <form>
        <TextField
          label="Email*"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errorList.find((x) => x.field === "email") || false}
        />
        <TextField
          label="Password*"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errorList.find((x) => x.field === "password") || false}
        />

        <br />

        {loginError && <h3>{loginError}</h3>}
        <button type="button" onClick={doFormValidation}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
