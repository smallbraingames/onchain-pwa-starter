import { usePrivy } from "@privy-io/react-auth";

const Login = () => {
  const { login, logout } = usePrivy();
  return (
    <div>
      <button onClick={login}>Log in</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Login;
