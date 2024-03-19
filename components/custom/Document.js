import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Document = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your documents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Fecha de actualización</TableHead>
            <TableHead className="text-right">Documento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">2024-03-19</TableCell>
            <TableCell className="text-right">Documento1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ) 
}
