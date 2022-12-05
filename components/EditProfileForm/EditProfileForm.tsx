import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import { TabViewTabChangeParams } from "primereact/tabview";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { Subscription } from "react-hook-form/dist/utils/createSubject";

import Props from "../children";
import TabPersonalInfo from "../TabPersonalInfo/TabPersonalInfo";
import TabContactInfo from "../TabContactInfo/TabContactInfo";
import AppTab from "../AppTab/AppTab";
import {
  getDefaultValues,
  getMenuItems,
  getParsedFormData,
  getToastMessages,
  setPostError,
} from "../../utils/helpers";
import { UPDATE } from "../../utils/keys";
import { EditForm } from "../../utils/types";

import styles from "./EditProfileForm.module.css";

interface EditProfileFormProps extends Props {
  data: any;
  onEdit: Function;
  postError?: any;
  isLoading?: boolean;
  setFormState?: Function;
  setToast: Function;
}

export default function EditProfileForm({
  data,
  onEdit,
  postError,
  setFormState = () => {},
  setToast = () => {},
}: EditProfileFormProps) {
  const { t } = useTranslation("");
  const menu = useRef<any>(null);

  const countries: object = t("country", { returnObjects: true });
  const languages: object = t("language.native", { returnObjects: true });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onTabChange = ({ index }: TabViewTabChangeParams) =>
    setActiveIndex(index);

  const methods: UseFormReturn<EditForm, object> = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: getDefaultValues(data, countries, languages),
    shouldUnregister: false,
  });

  const items = getMenuItems(
    setActiveIndex,
    <TabPersonalInfo />,
    <TabContactInfo />,
    methods.formState.errors,
    styles.errorTab
  );

  const isUpdateDisabled = (): boolean => {
    const errors = methods.formState.errors;
    return (
      errors &&
      Object.keys(errors).length > 0 &&
      Object.getPrototypeOf(errors) === Object.prototype
    );
  };

  const onSubmit = async (formData: any) => onEdit(getParsedFormData(formData));

  const onError = (errors: any) => {
    const message = getToastMessages(errors, t);
    if (message.length > 0) setToast(message);
  };

  // This watchs the change and save them if there is so that we can retive
  useEffect(() => {
    const subscription: Subscription = methods.watch((value) =>
      setFormState(value)
    );
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  useEffect(() => {
    if (postError) {
      setPostError(postError, methods.setError);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <Menu model={items} popup ref={menu} id="popup_menu" />
        <div className={styles.mobileOptions}>
          <Button
            type="button"
            icon="pi pi-bars"
            className={`p-button-text`}
            onClick={(event) => menu.current.toggle(event)}
            aria-controls="popup_menu"
            aria-haspopup
          />
          <Button
            type="submit"
            label={t(UPDATE)}
            disabled={isUpdateDisabled()}
            className="p-button-info"
            iconPos="right"
          />
        </div>

        <Button
          type="submit"
          label={t(UPDATE)}
          disabled={isUpdateDisabled()}
          className={`p-button-info ${styles.desktopOptions} ${styles.submitBtn}`}
          iconPos="right"
        />

        <TabMenu
          model={items}
          className={styles.desktopOptions}
          activeIndex={activeIndex}
          onTabChange={onTabChange}
        />

        <div className={styles.tabPanelContainer}>
          {items.map((item: any, key: number) => (
            <AppTab key={key} active={activeIndex === key}>
              {item.component}
            </AppTab>
          ))}
        </div>
      </form>
    </FormProvider>
  );
}
