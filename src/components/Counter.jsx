import { Button } from "@nextui-org/react";

const Counter = ({ cantidad, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={onDecrement}
        variant="bordered"
        radius="full"
        isIconOnly
        className="w-6 h-6 min-w-6"
      >
        -
      </Button>
      <span>{cantidad}</span>
      <Button
        onClick={onIncrement}
        radius="full"
        isIconOnly
        className="w-6 h-6 min-w-6 bg-black text-white"
      >
        +
      </Button>
    </div>
  );
};

export default Counter;