import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import Login from "./Login";

const Main = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  return (
    <div>
      <Login />
      <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await increment());
        }}
      >
        Increment
      </button>
    </div>
  );
};

export default Main;
