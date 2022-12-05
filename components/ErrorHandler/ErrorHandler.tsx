import React from "react";
import { useTranslation } from "next-i18next";
import { Button } from "primereact/button";

import Props from "../children";
import { RETRY, SERVICE_ERROR } from "../../utils/keys";
import { INFO_MAIL } from "../../utils/APIClient";

import styles from "./ErrorHandler.module.css";

interface ErrorHandlerProps extends Props {
  message?: string;
  onTryAgain: any;
}

export default function ErrorHandlder({ onTryAgain }: ErrorHandlerProps) {
  const { t } = useTranslation("common");
  return (
    <div className={`text-red-600 ${styles.container}`}>
      <div className="border-red-600 border-1 p-4 border-round-md bg-red-100">
        <i className={`pi pi-times-circle block ${styles.icon}`} />
        <p className="mb-5">{t(SERVICE_ERROR, { v0: INFO_MAIL })}</p>
        <Button
          className="p-button-danger"
          label={t(RETRY)}
          onClick={onTryAgain}
        />
      </div>
    </div>
  );
}
