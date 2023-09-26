import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import Login from "./components/Login";
import InstallAppPrompt from "./components/InstallAppPrompt";

const Main = () => {
  const {
    components: { Counter },
    systemCalls,
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  return (
    <div>
      <InstallAppPrompt />
      <Login />
      <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await systemCalls?.increment());
        }}
      >
        Increment
      </button>
    </div>
  );
};

export default Main;
