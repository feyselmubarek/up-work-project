import { useTranslation } from "next-i18next";
import { InputText } from "primereact/inputtext";

import styles from "./AppTextInput.module.css";

interface AppTextInputProps {
  id: string;
  label?: string;
  error?: any;
  className?: string;
  disabled?: boolean;
  register?: any;
  defaultValue?: string;
  value?: string;
  onChange?: Function;
}

export default function AppTextInput({
  id,
  label = "",
  error = "",
  className,
  disabled = false,
  register,
  defaultValue = "",
  value,
  onChange,
}: AppTextInputProps) {
  const { t } = useTranslation("common");

  return (
    <div
      className={`${className} ${styles.wrapper} field`}
      data-check={error ? "error" : ""}
    >
      <span className="p-input-icon-right" style={{ width: "100%" }}>
        {error && <i className={`pi pi-exclamation-triangle text-red-600`} />}
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <InputText
          id={id}
          name={id}
          className={`block ${styles.input}`}
          disabled={disabled}
          aria-describedby="full-name-help"
          {...(defaultValue ? { defaultValue } : {})}
          {...(value ? { value } : {})}
          {...(onChange ? { onChange } : {})}
          {...(register ? { ...register } : {})}
        />
      </span>
      {error && (
        <small id="full-name-help" className="block text-xs text-red-600">
          {t(error)}
        </small>
      )}
    </div>
  );
}
