import getIsIOS from "../pwa/getIsIOS";
import getIsMobile from "../pwa/getIsMobile";
import getIsPWA from "../pwa/getIsPwa";

const InstallAppPrompt = () => {
  const isPWA = getIsPWA();
  const isMobile = getIsMobile();
  const isIOS = getIsIOS();

  if (isPWA) return <></>;

  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      {!isMobile ? (
        <div>
          <div>Must open this app on a mobile device</div>
          <div>
            If you are a developer, simulate this in your browser developer
            tools and reload
          </div>
          <div>
            Modify this modal in
            packages/client/src/components/InstallAppPrompt.tsx
          </div>
        </div>
      ) : (
        <div>
          <div>Install this app to your home screen</div>
          <ol>
            <li>Tap the share button</li>
            <li>Tap Add to Home Screen</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default InstallAppPrompt;
