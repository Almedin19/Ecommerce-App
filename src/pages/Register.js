import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "../App.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    console.log(email, password, cPassword);
    if (password !== cPassword) {
      toast.error("Password not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("Registration succssesfuelly");
        navigate("/login");
        e.target.value = "";
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //SingIn with Google
  const provider = new GoogleAuthProvider();
  const singInWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Register Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div
        className="mt-2 w-50 "
        style={{
          padding: "10px",
          margin: "0px auto",
        }}
      >
        <h3 className="text-center mb-4">Register</h3>
        <div className="d-flex justify-content-center align-itmes-center p-15">
          <Container className="w-50 bg-succses text-dodgerblue">
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-2 w-100" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="w-100"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2 " controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-2 "
                controlId="formBasicConfirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicLink">
                Alerady have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  SingIn
                </Link>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-2 mb-2 lg w-100"
              >
                Register
              </Button>
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  margin: "20px 0px",
                  backgroundColor: "lightgray",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    position: "absolute",
                    top: "79%",
                    left: "48%",
                    padding: "0px 7px ",
                    backgroundColor: "white",
                  }}
                >
                  OR
                </p>
              </div>
              <Button
                variant="dark"
                type="submit"
                className="mt-2 mb-4  lg w-100"
                onClick={singInWithGoogle}
              >
                <Link
                  to=""
                  style={{
                    textDecoration: "none",
                    marginRight: "2px",
                    color: "white",
                  }}
                >
                  <FcGoogle
                    style={{
                      marginRight: "10px",
                      color: "white",
                      fontSize: "25px",
                    }}
                  />
                  Google
                </Link>
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Register;
