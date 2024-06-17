import { Textarea, Button } from "@nextui-org/react";
import CardPedido from "../components/CardPedido";
import { ArrowBack } from "../assets/svg/ArrowBack";
import { useNavigate } from "react-router-dom";

const Carrito = ({ order, setOrder, submitOrder }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (item, quantity) => {
    if (quantity > 0) {
      setOrder(
        order.map((orderItem) =>
          orderItem.producto_id === item.producto_id
            ? { ...orderItem, cantidad: quantity }
            : orderItem
        )
      );
    } else {
      handleRemoveItem(item);
    }
  };

  const handleRemoveItem = (item) => {
    setOrder(
      order.filter((orderItem) => orderItem.producto_id !== item.producto_id)
    );
  };

  const totalPrice = order
    .reduce((total, item) => total + item.precio * item.cantidad, 0)
    .toFixed(2);

  const handleSubmitOrder = () => {
    submitOrder(() => navigate("/pedido-confirmado"));
  };

  return (
    <>
      <div className="pl-6 pr-6 pt-11 pb-8 h-full flex flex-col justify-between">
        <div className="flex flex-row items-center">
          <Button variant="light" isIconOnly onClick={() => navigate("/menu")}>
            <ArrowBack />
          </Button>
          <h1 className="font-bold text-3xl">Tu pedido</h1>
        </div>
        <div className="flex flex-col gap-6 h-full justify-between">
          <div className="mt-4">
            <h3 className="font-bold text-xl mb-2">Comida</h3>
            {order.map((item) => (
              <div className="mb-2" key={item.customId}>
                <CardPedido
                  id={item.producto_id}
                  name={item.nombre}
                  price={item.precio.toFixed(2)}
                  cantidad={item.cantidad}
                  ingredientes={item.ingredientes}
                  onIncrement={() => handleQuantityChange(item, item.cantidad + 1)}
                  onDecrement={() => handleQuantityChange(item, item.cantidad - 1)}
                />
              </div>
            ))}
          </div>
          <div>
            <Textarea
              label="Observaciones"
              placeholder="¿Hay algo que necesites decirnos sobre tu pedido?"
              className="w-full"
              classNames={{
                label: "font-bold text-black",
                description: "text-zinc-500",
                inputWrapper: "bg-[#fff]",
              }}
            />
            <Button
              color="primary"
              className="w-full mt-9"
              onClick={handleSubmitOrder}
              disabled={order.length === 0}
            >
              Confirmar pedido por {totalPrice}€
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
