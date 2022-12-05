import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

import { ADD, LINK } from "../../utils/keys";
import AppTextInput from "../AppTextInput/AppTextInput";

import styles from "./AddDialog.module.css";

interface AppDialogProps {
  show: boolean;
  setShow: Function;
  socials: any[];
  addSocial: Function;
}

export default function AddDialog({
  show,
  setShow,
  socials,
  addSocial,
}: AppDialogProps) {
  const { t } = useTranslation("common");
  const [type, setType] = useState<string>("");
  const [link, setLink] = useState<string>("");

  return (
    <Dialog
      header="Add Social"
      visible={show}
      onHide={() => setShow(false)}
      className={styles.dialog}
      footer={
        <div>
          <Button
            label="Cancel"
            type="button"
            icon="pi pi-times"
            onClick={() => setShow(false)}
            className="p-button-text p-button-info"
          />
          <Button
            label={t(ADD)}
            className="p-button-info"
            icon="pi pi-check"
            type="button"
            onClick={() => {
              addSocial({ type, link });
              setShow(false);
            }}
            disabled={!type || !link}
          />
        </div>
      }
    >
      <div className="p-1">
        <div className="mb-3 relative">
          <label
            htmlFor="social-drop-down"
            className={styles.label + " block mb-2"}
          >
            Content Type
          </label>
          <Dropdown
            id="social-drop-down"
            className={styles.input}
            value={type}
            options={socials}
            optionLabel="type"
            optionValue="type"
            onChange={(e) => setType(e.value)}
            placeholder="Select social"
            valueTemplate={(option) =>
              option && <span className={styles.value}>{option.type}</span>
            }
            itemTemplate={(option) => {
              return (
                <span className="product-badge flex align-items-center">
                  <img src={option.src} alt="social-icon" width={25} />
                  <span className="ml-2 capitalize">{option.type}</span>
                </span>
              );
            }}
          />
        </div>
        <AppTextInput
          id="link"
          label={t(LINK)}
          value={link}
          onChange={(e: any) => setLink(e.target.value)}
        />
      </div>
    </Dialog>
  );
}
