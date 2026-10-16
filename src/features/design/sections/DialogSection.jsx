import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/useTranslation";

/** Dialog preview demonstrating accessible modal behavior. */
export function DialogSection() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t("design.dialogTrigger")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("design.dialogTitle")}</DialogTitle>
          <DialogDescription>{t("design.dialogDescription")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{t("design.dialogCancel")}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>{t("design.dialogConfirm")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
