import { useTranslation } from "next-i18next";
import { Controller, useFormContext } from "react-hook-form";

import { getParsedInterests } from "../../utils/helpers";
import { interestRules } from "../../utils/rules";

import styles from "./AppCheckBox.module.css";

interface AppCheckBox {
  error?: any;
  className: string;
}

export default function AppCheckBox({
  error = "",
  className = "",
}: AppCheckBox) {
  const { control, trigger } = useFormContext();
  const { t } = useTranslation("common");
  const interests = getParsedInterests(
    t("profile.personal.interests", { returnObjects: true })
  );

  return (
    <>
      <Controller
        name="interests"
        rules={interestRules}
        control={control}
        render={({ field: { value, onChange, name } }) => (
          <div
            className={`${styles.container} ${className} ${
              error && "border-1 border-red-600"
            }`}
          >
            {interests.map((interest: any, key: number) => (
              <div key={key} className="field-checkbox">
                <input
                  id={`interest-${key}`}
                  type="checkbox"
                  name={name}
                  className="p-checkbox"
                  style={{ width: "3em" }}
                  value={interest.value}
                  checked={value.includes(interest.value)}
                  onChange={() => {
                    let newValue = [];
                    if (value.includes(interest.value)) {
                      newValue = value.filter(
                        (i: string) => i !== interest.value
                      );
                    } else {
                      newValue = [...value, interest.value];
                    }
                    onChange(newValue);
                    trigger("interests");
                  }}
                />
                <label
                  htmlFor={`interest-${key}`}
                  className="text-sm capitalize"
                >
                  {interest.name}
                </label>
              </div>
            ))}
          </div>
        )}
      />
      {error && (
        <small id="error-help" className="block mt-1 mx-2 text-xs text-red-600">
          {t(error)}
        </small>
      )}
    </>
  );
}
