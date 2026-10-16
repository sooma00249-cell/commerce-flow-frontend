import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Illustrative table used only to demonstrate table styling and RTL alignment.
 * The rows below are static sample content, not real orders from the backend.
 */
const SAMPLE_ROWS = [
  { id: "CF-1042", customer: "Sample Customer A", status: "paid", total: "$1,299.00", date: "2026-09-02" },
  { id: "CF-1041", customer: "Sample Customer B", status: "shipped", total: "$249.50", date: "2026-09-01" },
  { id: "CF-1040", customer: "Sample Customer C", status: "pending", total: "$89.00", date: "2026-08-31" },
  { id: "CF-1039", customer: "Sample Customer D", status: "delivered", total: "$2,040.00", date: "2026-08-30" },
  { id: "CF-1038", customer: "Sample Customer E", status: "cancelled", total: "$159.99", date: "2026-08-29" },
];

const STATUS_VARIANT = {
  paid: "success",
  shipped: "default",
  pending: "warning",
  delivered: "secondary",
  cancelled: "destructive",
};

export function SampleOrdersTable() {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("table.order")}</TableHead>
          <TableHead>{t("table.customer")}</TableHead>
          <TableHead>{t("table.status")}</TableHead>
          <TableHead className="text-end">{t("table.total")}</TableHead>
          <TableHead>{t("table.date")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SAMPLE_ROWS.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell className="text-muted-foreground">{row.customer}</TableCell>
            <TableCell>
              <Badge variant={STATUS_VARIANT[row.status]}>
                {t(`status.${row.status}`)}
              </Badge>
            </TableCell>
            <TableCell className="text-end font-medium tabular-nums">
              {row.total}
            </TableCell>
            <TableCell className="tabular-nums text-muted-foreground">
              {row.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
