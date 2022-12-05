import { useTranslation } from "next-i18next";
import { Dropdown } from "primereact/dropdown";
import { Control, Controller } from "react-hook-form";
import { getParsedTranslations } from "../../utils/helpers";

import { COUNTRY } from "../../utils/keys";
import { countryRules } from "../../utils/rules";

import styles from "./AppCountrySelect.module.css";

interface AppCountrySelectProps {
  control: Control<any>;
  error: any;
  className: string;
}

export default function AppCountrySelect({
  control,
  error = "",
  className = "",
}: AppCountrySelectProps) {
  const { t } = useTranslation("common");
  const countries: any[] = getParsedTranslations(
    t("country", { returnObjects: true })
  );

  const selectedCountryTemplate = (option: any, props: any) => (
    <div>
      <div className={styles.selectPlaceholder}>{props.placeholder}</div>
      {option && <div className={`${styles.option} mt-2`}> {option.name}</div>}
    </div>
  );

  const countryOptionTemplate = (option: any) => (
    <div className="country-item"> {option.name}</div>
  );

  return (
    <div className={className} data-check={error ? "error" : ""}>
      <Controller
        control={control}
        name="country"
        rules={countryRules}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <Dropdown
              id="country"
              className={`${styles.countrySelect} ${
                error && styles.errorBoder
              }`}
              value={value}
              options={countries}
              onChange={(e: any) => onChange(e.value)}
              optionLabel="name"
              filter
              filterBy="name"
              inputRef={ref}
              placeholder={t(COUNTRY)}
              aria-describedby="error-help"
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
            />
          );
        }}
      />
      {error && (
        <small id="error-help" className={`block mt-1 ${styles.help}`}>
          {t(error)}
        </small>
      )}
    </div>
  );
}
