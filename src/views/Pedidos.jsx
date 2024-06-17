import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider
} from "@nextui-org/react";

export default function Pedidos() {
  return (
    <>
      
        <h1 className="font-bold text-3xl mb-6">Pedidos</h1>
        <div className="flex flex-col gap-3">
          <Table
            color="primary"
            selectionMode="multiple"
            aria-label="Example static collection table"
            className="text-left"
          >
            <TableHeader>
              <TableColumn className="text-xl font-bold">Mesa 1</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="font-bold">Tony Reichert</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="font-bold">Zoey Lang</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="font-bold">Jane Fisher</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell className="font-bold">William Howard</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider />
        </div>
      
    </>
  );
}
