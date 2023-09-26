import { usePrivy } from "@privy-io/react-auth";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";

const Login = () => {
  const { login, logout } = usePrivy();
  const { wallet: activeWallet } = usePrivyWagmi();
  return (
    <div>
      <div>
        Active wallet: <span>{activeWallet?.address ?? "None"}</span>
      </div>
      <button onClick={login}>Log in</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Login;
