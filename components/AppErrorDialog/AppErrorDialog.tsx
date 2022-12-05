import { Dialog } from "primereact/dialog";

interface AppErrorDialogProps {
  visible: boolean;
  onHide: Function;
  title: string;
  detail: string;
}

export function AppErrorDialog({
  visible,
  onHide,
  title,
  detail,
}: AppErrorDialogProps) {
  return (
    <Dialog
      visible={visible}
      onHide={() => onHide()}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw" }}
      headerClassName="bg-red-50 absolute right-0"
      contentClassName="bg-red-50 border-round-sm"
    >
      <div className="text-center text-overflow-ellipsis text-red-600 pt-4">
        <i className="pi pi-exclamation-triangle text-7xl" />
        <h4 className="mb-3 text-xl">{title}</h4>
        <p>{detail}</p>
      </div>
    </Dialog>
  );
}
