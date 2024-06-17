import { Divider, Image } from "@nextui-org/react";
import Counter from "./Counter";

const CardPedido = ({ id, customId, name, price, cantidad, ingredientes, onIncrement, onDecrement }) => {
  // Utiliza id para la imagen y customId (si existe) para identificar de manera única cada producto en el pedido
  return (
    <>
      <div className="box-border p-2 rounded-xl flex gap-2 bg-[#fff]">
        <div className="min-w-[100px]">
          <Image
            width={100}
            className="aspect-square object-cover"
            alt="Imagen del producto"
            src={`..\\src\\assets\\img\\${id}.jpg`} // Usa el id original para la imagen
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h5 className="font-bold">{name}</h5>
          {ingredientes && (
            <ul className="text-sm">
              {Object.entries(ingredientes).map(([ingredient, quantity]) => (
                <li key={ingredient} className="text-zinc-600">
                  {quantity > 0 ? `${ingredient}: ${quantity}` : `Sin ${ingredient}`}
                </li>
              ))}
            </ul>
          )}
          <div>
            <Divider className="mb-1" />
            <div className="flex justify-between">
              <p className="font-bold text-orange-500">{price}€</p>
              <Counter cantidad={cantidad} onIncrement={onIncrement} onDecrement={onDecrement} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPedido;
