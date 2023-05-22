import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    //console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("Login successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //Login with Google
  const provider = new GoogleAuthProvider();
  const singInWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div
        className="mt-2 p-10  w-50 "
        style={{ padding: "20px", borderRadius: "10px", margin: "0px auto" }}
      >
        <h3 className="text-center mb-5">Login</h3>
        <div className="d-flex justify-content-center align-itmes-center p-10">
          <Container className="w-50">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-2 " controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
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

              <Button
                variant="primary"
                type="submit"
                className="mt-3 mb-2 lg w-100"
              >
                Login
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
                    top: "67%",
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
                className="mt-3 mb-2  lg w-100"
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
                      marginBottom: "3px",
                      color: "white",
                      fontSize: "25px",
                    }}
                  />
                  Google
                </Link>
              </Button>
              <Form.Group className="mb-3" controlId="formBasicLink">
                Don't have an account?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  SingUp
                </Link>
              </Form.Group>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Login;
