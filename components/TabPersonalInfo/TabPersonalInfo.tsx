import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Button } from "primereact/button";
import { useFormContext } from "react-hook-form";
import {
  CHANGE_ACCOUNT_INFO_URL,
  CHANGE_PASSWORD_URL,
  MEMBER_URL,
} from "../../utils/APIClient";
import { registerInput } from "../../utils/helpers";
import {
  ACCOUNT_INFO,
  BIRTH_DATE,
  CERTIFICATE_HELP_NAME,
  CHANGE_ACCOUNT,
  CHANGE_ACCOUNT_INFO,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_INFO,
  CUSTOM_URL_HELP,
  EMAIL,
  FULL_NAME,
  PICTURE,
  PRIVACY_AGORA,
  PRIVACY_PRIVATE,
  PRIVACY_PUBLIC,
  USERNAME,
} from "../../utils/keys";
import {
  birthDayRules,
  cetificateRules,
  customURLRules,
  profilePicRules,
} from "../../utils/rules";
import AppCalendar from "../AppCalendar/AppCalendar";
import AppTextInput from "../AppTextInput/AppTextInput";
import ProfileUpload from "../ProfileUpload/ProfileUpload";

import styles from "./TabPersonalInfo.module.css";

export default function PersonalInfoTab() {
  const { t } = useTranslation("common");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {/* Account Information ---------------------------- START */}
      <h2 className="mx-2">{t(ACCOUNT_INFO)}</h2>
      <p className={`${styles.subtitle} mx-2`}>{t(PRIVACY_PRIVATE)}</p>

      <div className={styles.formItem}>
        <AppTextInput
          id="fullName"
          className="mx-2"
          label={t(FULL_NAME)}
          disabled
          register={{ ...register("fullName") }}
          error={errors.fullName && errors.fullName.message}
        />
        <AppTextInput
          id="email"
          className="mx-2"
          label={t(EMAIL)}
          disabled
          register={{ ...register("email") }}
          error={errors.email && errors.email.message}
        />
      </div>

      <div className={`${styles.formItem} mb-3`}>
        <AppTextInput
          id="accountName"
          className="mx-2"
          label={t(USERNAME)}
          disabled
          register={{ ...register("accountName") }}
          error={errors.accountName && errors.accountName.message}
        />
        <p className={`mx-2 ${styles.help}`}>{t(CERTIFICATE_HELP_NAME)}</p>
      </div>

      <div className={`${styles.formItem} my-2`}>
        <p className={`${styles.help} ${styles.btnHelper} mx-2`}>
          {t(CHANGE_ACCOUNT_INFO)}
        </p>
        <Link href={CHANGE_ACCOUNT_INFO_URL}>
          <a className={styles.btn}>
            <Button
              type="button"
              className="p-button-info mx-2 w-full"
              label={t(CHANGE_ACCOUNT)}
              icon={<img src="/icons/user.svg" alt="contact" width={25} />}
            />
          </a>
        </Link>
      </div>

      <div className={`${styles.formItem} mt-2 mb-5`}>
        <p className={`mx-2 ${styles.help} ${styles.btnHelper}`}>
          {t(CHANGE_PASSWORD_INFO)}
        </p>
        <Link href={CHANGE_PASSWORD_URL}>
          <a className={styles.btn}>
            <Button
              type="button"
              className="p-button-info mx-2 w-full"
              label={t(CHANGE_PASSWORD)}
              icon={<img src="/icons/lock.svg" alt="contact" width={25} />}
            />
          </a>
        </Link>
      </div>
      {/* Account Information ---------------------------- END */}

      {/* Public Information ----------------------------- START */}
      <h2 className="mx-2 pt-5">Public Profile Information</h2>
      <p className={`mx-2 ${styles.subtitle}`}>{t(PRIVACY_AGORA)}</p>

      <div className={`${styles.formItem} mb-3`}>
        <div className={`${styles.formItem} ${styles.customPanel} mx-2`}>
          <AppTextInput
            id="urlPrefix"
            className={`${styles.urlPrefix}`}
            disabled
            defaultValue={MEMBER_URL}
          />
          <AppTextInput
            id="publicUrlName"
            className={`${styles.customUrl}`}
            label="Custom Url"
            register={registerInput(register, "publicUrlName", customURLRules)}
            error={errors.publicUrlName && errors.publicUrlName.message}
          />
        </div>
        <p className={`${styles.help} mx-2`}>{t(CUSTOM_URL_HELP)}</p>
      </div>

      <div className={`${styles.formItem} mb-3`}>
        <AppTextInput
          id="certificateName"
          className="mx-2"
          label={"Full Name for Certificate"}
          register={registerInput(register, "certificateName", cetificateRules)}
          error={errors.certificateName && errors.certificateName.message}
        />
        <p className={`${styles.help} mx-2`}>{t(CERTIFICATE_HELP_NAME)}</p>
      </div>

      <AppCalendar
        id="birthday"
        className={`mx-2 mb-5 ${styles.customPanel}`}
        control={control}
        label={t(BIRTH_DATE)}
        rules={birthDayRules}
        error={errors.birthday && errors.birthday.message}
      />

      <h3 className={`${styles.header} mx-2`}>{t(PICTURE)}</h3>
      <p className={`${styles.subtitle} mb-2 mx-2`}>{t(PRIVACY_PUBLIC)}</p>

      <ProfileUpload
        name="profilePic"
        className="mx-2"
        control={control}
        rules={profilePicRules}
        error={errors.profilePic ? errors.profilePic.message : ""}
      />
      {/* Public Information ----------------------------- END */}
    </>
  );
}
