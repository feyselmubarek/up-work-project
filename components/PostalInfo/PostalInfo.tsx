import React from "react";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form";

import {
  CITY,
  CITY_HELP,
  POSTAL_ADDRESS,
  STATE,
  POSTAL_HELP,
  ZIP,
} from "../../utils/keys";
import { cityRules, stateRules } from "../../utils/rules";
import AppTextInput from "../AppTextInput/AppTextInput";
import { registerInput } from "../../utils/helpers";
import AppCountrySelect from "../AppCountrySelect/AppCountrySelect";

import styles from "./PostalInfo.module.css";

export default function PostalInfo() {
  const { t } = useTranslation("common");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-5">
      <div className="mx-2">
        <h2 className={styles.heading}>Postal Information</h2>
      </div>

      <div className={`${styles.formItem} mb-3`}>
        <AppTextInput
          id="postalAddress"
          className="mx-2"
          label={t(POSTAL_ADDRESS)}
          register={{ ...register("postalAddress") }}
          error={errors.postalAddress && errors.postalAddress.message}
        />
        <p className={`mx-2 ${styles.help}`}>{t(POSTAL_HELP)}</p>
      </div>

      <div className={`${styles.formItem} mb-3`}>
        <div className={`${styles.formItem} ${styles.customPanel} mx-2`}>
          <AppTextInput
            id="zip"
            className={`${styles.zip} mr-2`}
            label={t(ZIP)}
            register={{ ...register("zip") }}
            error={errors.zip && errors.zip.message}
          />
          <AppTextInput
            id="city"
            className={`${styles.city} ml-2`}
            label={t(CITY)}
            register={registerInput(register, "city", cityRules)}
            error={errors.city && errors.city.message}
          />
        </div>
        <p className={`${styles.help} mx-2`}>{t(CITY_HELP)}</p>
      </div>

      <div className={`${styles.formItem} mb-3`}>
        <AppTextInput
          id="state"
          className="mx-2"
          label={t(STATE)}
          register={registerInput(register, "state", stateRules)}
          error={errors.state && errors.state.message}
        />
      </div>

      <AppCountrySelect
        className="mx-2"
        control={control}
        error={errors.country && errors.country.message}
      />
    </div>
  );
}
