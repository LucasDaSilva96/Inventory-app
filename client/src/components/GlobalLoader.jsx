import { Spinner } from "@nextui-org/react";

function GlobalLoader() {
  return (
    <div className=" fixed w-screen h-screen top-0 left-0 z-50 backdrop-blur-md flex items-center justify-center">
      <Spinner size="lg" label="Loading..." />
    </div>
  );
}

export default GlobalLoader;
