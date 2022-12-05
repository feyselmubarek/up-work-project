import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from "next-i18next";
import { Toast } from "primereact/toast";

import Props from "../children";
import Loader from "../general/Loader/Loader";
import { editUserDetail, getUserDetail } from "../../utils/APIClient";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import {
  createFormData,
  getErrorFromResponse,
  getToastMessages,
  getToastObj,
} from "../../utils/helpers";
import { AppErrorDialog } from "../AppErrorDialog/AppErrorDialog";
import { UPDATE_SUCCESS } from "../../utils/keys";

import styles from "./MemberProfile.module.css";

interface MemberProfile extends Props {
  username: string;
}

export default function MemberProfile({ username }: MemberProfile) {
  const { t, i18n } = useTranslation("common");
  const locale = i18n.resolvedLanguage;

  const [formState, setFormState] = useState<any>(null);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorDailogData, setErrorDialogData] = useState<any>({
    title: "",
    detail: "",
  });

  const toast = useRef<any>(null);

  const setToast = (messages: any) => {
    toast?.current.show(messages);
  };

  const { isLoading: isFetchLoading, data } = useQuery(username, () =>
    getUserDetail(username, locale)
  );

  const {
    mutate,
    isLoading: isPostLoading,
    error,
  } = useMutation(
    (data: any) => editUserDetail(data, username, i18n.resolvedLanguage),
    {
      onSuccess() {
        setToast(getToastObj("success", "Done", t(UPDATE_SUCCESS)));
      },
      onError(error: any) {
        const errors = getErrorFromResponse(error);
        let messages = getToastMessages(errors, t);

        if (messages.length > 0) setToast(messages);

        const { $protocol, $security } = errors;
        if ($protocol || $security) {
          setErrorDialogData({
            title: $protocol ? "Protocol Error" : "Security Error",
            detail: $protocol || $security,
          });
          setShowErrorDialog(true);
        }
      },
    }
  );

  return (
    <div className={`page mb-5`}>
      <Toast ref={toast} position="bottom-center" />
      <AppErrorDialog
        title={errorDailogData.title}
        detail={errorDailogData.detail}
        visible={showErrorDialog}
        onHide={() => setShowErrorDialog(false)}
      />

      {isFetchLoading || isPostLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <EditProfileForm
          data={createFormData(data.data, formState)}
          postError={getErrorFromResponse(error, true)}
          onEdit={mutate}
          setFormState={setFormState}
          setToast={setToast}
        />
      )}
    </div>
  );
}
