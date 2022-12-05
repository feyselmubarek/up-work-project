import { useTranslation } from "next-i18next";
import { Calendar } from "primereact/calendar";
import {
  Control,
  Controller,
  FieldValues,
} from "react-hook-form";
import { Rules } from "../../utils/types";

import styles from "./AppCalendar.module.css";

interface AppCalendarProps {
  id?: string;
  label?: string;
  rules?: Rules;
  control: Control<FieldValues, any>;
  className?: string;
  error?: any;
}

export default function AppCalendar({
  id = "",
  label = "",
  rules,
  control,
  error = "",
  className = "",
}: AppCalendarProps) {
  const { t } = useTranslation("common");

  return (
    <Controller
      control={control}
      name={id}
      rules={rules}
      render={({ field: { onChange, value, name, ref } }) => {
        return (
          <div className={className} data-check={error ? "error" : ""}>
            <label htmlFor={name} className={`block ${styles.customLabel}`}>
              {label}
            </label>
            <Calendar
              className="w-full"
              name={name}
              value={value}
              onChange={(e) => {
                if (e.value) {
                  onChange(e.value);
                }
              }}
              aria-describedby="error-help"
              inputRef={ref}
              showIcon
              inputClassName={`${styles.customInput} ${
                error && "border-red-600"
              }`}
            />
            {error && (
              <small
                id="error-help"
                className="block mt-1 text-xs text-red-600"
              >
                {t(error)}
              </small>
            )}
          </div>
        );
      }}
    />
  );
}
