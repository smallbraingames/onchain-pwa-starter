import { usePrivy } from "@privy-io/react-auth";

const Login = () => {
  const { login } = usePrivy();
  return <button onClick={login}>Log in</button>;
};

export default Login;
