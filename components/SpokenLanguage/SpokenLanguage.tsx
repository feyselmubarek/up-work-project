import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { ListBox } from "primereact/listbox";
import { Controller, useFormContext } from "react-hook-form";
import { getParsedTranslations } from "../../utils/helpers";
import { langsRules } from "../../utils/rules";

import styles from "./SpokenLanguage.module.css";

interface SpokeLanguageProps {
  className?: string;
  control: any;
  error: any;
}

export default function SpokenLanguage({
  className = "",
  control,
  error = "",
}: SpokeLanguageProps) {
  const { t } = useTranslation("common");
  const { setFocus, trigger } = useFormContext();
  const languages: any[] = getParsedTranslations(
    t("language.native", { returnObjects: true })
  );
  useEffect(() => {
    if (error) {
      setFocus("spokenLanguages");
    }
  }, []);
  return (
    <div className={className} data-check={error ? "error" : ""}>
      <Controller
        control={control}
        name="spokenLanguages"
        rules={langsRules}
        render={({ field: { ref, value, onChange } }) => {
          return (
            <ListBox
              className={`${styles.langListBox} ${
                error && styles.errorBorder
              } mx-2 p-2 lang-list-box p-list-box-info`}
              value={value}
              multiple
              filter
              listClassName={styles.list}
              itemTemplate={(option: any) => <div>{option.name}</div>}
              options={languages}
              onChange={(e) => {
                onChange(e.value);
                trigger("spokenLanguages");
              }}
              optionLabel="name"
              filterInputProps={{
                ref: ref,
                placeholder: "Search languages...",
                autoFocus: error,
              }}
            />
          );
        }}
      />

      {error && (
        <small id="error-help" className={`block mx-2 mt-1 ${styles.help}`}>
          {t(error)}
        </small>
      )}
    </div>
  );
}
