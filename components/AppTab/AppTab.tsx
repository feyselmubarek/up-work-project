import { ReactNode } from "react";

interface AppTabProps {
  active: boolean;
  children: ReactNode;
}

export default function AppTab({ active, children }: AppTabProps) {
  return <div className={active ? "block" : "hidden"}>{children}</div>;
}
