import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "next-i18next";
import { Control, Controller, useFormContext } from "react-hook-form";

import { Rules } from "../../utils/types";
import styles from "./ProfileUpload.module.css";
import { CLICK_TO_UPLOAD } from "../../utils/keys";

interface ProfileUploadProps {
  name: string;
  control?: Control<any>;
  rules?: Rules;
  error?: any;
  className?: string;
}

export default function ProfileUpload({
  name,
  control,
  rules,
  error = "",
}: ProfileUploadProps) {
  const { t } = useTranslation("common");
  const inputRef = useRef<any>(null);
  const { trigger } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <div className={`${styles.imgContainer}`}>
          {!field.value && (
            <Button
              type="button"
              onClick={() => inputRef.current.click()}
              label={t(CLICK_TO_UPLOAD)}
              className={`p-button-${error ? "danger" : "info"} ${
                styles.chooseBtn
              }`}
            />
          )}
          <input
            ref={inputRef}
            id={name}
            name={name}
            type="file"
            onChange={(e: any) => {
              if (e.target.files.length > 0) {
                field.onChange(e.target.files);
                trigger(name);
              }
            }}
            className={styles.hiddenInput}
            accept="image/jpeg, image/png"
            aria-describedby="error-help"
          />
          {field.value && (
            <div
              className={`${styles.imagePanel} ${error && styles.errorBorder}`}
            >
              <img
                src={
                  typeof field.value == "string"
                    ? field.value
                    : URL.createObjectURL(field.value[0])
                }
                className={styles.img}
              />
              <Button
                type="button"
                icon={<img src="/icons/cancel.svg" alt="contact" width={35} />}
                className={`p-button-rounded p-button-danger ${styles.cancelBtn}`}
                aria-label="Filter"
                onClick={() => {
                  inputRef.current.value = "";
                  field.onChange("");
                }}
              />
              <Button
                type="button"
                onClick={() => inputRef.current.click()}
                icon={
                  <img src="/icons/upload_image.svg" alt="contact" width={35} />
                }
                className={`p-button-rounded p-button-info ${styles.uploadBtn}`}
                aria-label="Filter"
              />
            </div>
          )}

          {error && (
            <small id="error-help" className={`block mt-2 ${styles.help}`}>
              {t(error)}
            </small>
          )}
        </div>
      )}
    />
  );
}
