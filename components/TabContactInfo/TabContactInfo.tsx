import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form";
import {
  INTERESTS_QUESTION,
  LANGUAGE_SPOKEN,
  PRIVACY_PUBLIC,
} from "../../utils/keys";
import AppCheckBox from "../AppCheckbox/AppCheckBox";
import PostalInfo from "../PostalInfo/PostalInfo";
import SocialAccount from "../SocialAccount/SocialAccount";
import SpokenLanguage from "../SpokenLanguage/SpokenLanguage";

import styles from "./TabContactInfo.module.css";

export default function TabContactInfo() {
  const { t } = useTranslation("common");
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {/* Postal Information ---------------------------- START */}
      <PostalInfo />
      {/* Postal Information ---------------------------- END */}

      {/* Language & Interest ---------------------------- START */}
      <div className="mt-3" style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="mx-2 mb-5">
          <h3 className={styles.heading}>{t(LANGUAGE_SPOKEN)}</h3>
          <p className={styles.subtitle}>{t(PRIVACY_PUBLIC)}</p>
          <SpokenLanguage
            control={control}
            error={errors.spokenLanguages && errors.spokenLanguages.message}
          />
        </div>

        <div className="mx-5 mb-5">
          <h2 className={styles.heading}>{t(INTERESTS_QUESTION)}</h2>
          <p className={styles.subtitle}>{t(PRIVACY_PUBLIC)}</p>
          <AppCheckBox
            error={errors.interests && errors.interests.message}
            className="mx-2"
          />
        </div>
      </div>
      {/* Language & Interest ---------------------------- END */}

      {/* Social Accounts ---------------------------- START */}
      <SocialAccount control={control} />
      {/* Social Accounts ---------------------------- END */}
    </>
  );
}
