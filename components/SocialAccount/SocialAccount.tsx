import { useState } from "react";
import { useTranslation } from "next-i18next";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Control, Controller } from "react-hook-form";

import {
  ADD,
  DELETE,
  PRIVACY_PUBLIC,
  SOCIAL_CONTACT,
  SOCIAL_PERSONAL,
} from "../../utils/keys";
import { getParsedSocials } from "../../utils/helpers";
import AddDialog from "../AddDialog/AddDialog";

import styles from "./SocialAccount.module.css";

interface SocialAccountProps {
  control: Control<any>;
}

export default function SocialAccount({ control }: SocialAccountProps) {
  const { t } = useTranslation("common");
  const data: any = t("contact", { returnObjects: true });
  const socials: any[] = getParsedSocials(data);

  const linkEditor = (options: any) => (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
    />
  );

  const contentTypeEditor = (options: any) => (
    <Dropdown
      value={options.value}
      options={socials}
      optionLabel="type"
      optionValue="type"
      onChange={(e) => {
        return options.editorCallback(e.value);
      }}
      placeholder="Select social"
      itemTemplate={(option) => {
        return (
          <span className="product-badge flex align-items-center capitalize">
            <img src={option.src} alt="social-icon" width={25} />
            <span className="ml-2">{option.type}</span>
          </span>
        );
      }}
    />
  );

  const statusBodyTemplate = (rowData: any) => (
    <div className={styles.bodyTemplate}>
      <img width={30} src={data[rowData.type].image} alt="icon" />
      <span className="ml-2 capitalize "> {rowData.type}</span>
    </div>
  );

  return (
    <>
      <div className={`mb-5 ${styles.socialContainer}`}>
        <div className="mx-2">
          <h2 className={styles.heading}>{t(SOCIAL_CONTACT)}</h2>
          <p className={styles.subtitle}>
            {`${t(PRIVACY_PUBLIC)} ${t(SOCIAL_PERSONAL)}`}
          </p>
        </div>

        <Controller
          control={control}
          name="socials"
          render={({ field }) => {
            const [show, setShow] = useState(false);
            const [selected, setSelected] = useState<any>(null);

            const onRowEditComplete = (e: any) => {
              let contacts = [...field.value];
              let { newData, index } = e;
              contacts[index] = newData;
              field.onChange(contacts);
            };

            const onAdd = (social: any) => {
              let contacts = [
                ...field.value,
                { ...social, id: field.value.length },
              ];
              field.onChange(contacts);
            };

            const onDelete = () => {
              let contacts = field.value.filter(
                (contact: any) => contact.id !== selected.id
              );
              field.onChange(contacts);
              setSelected(null);
            };

            return (
              <>
                <DataTable
                  className="p-datatable"
                  selectionMode="single"
                  selection={selected}
                  onSelectionChange={(e) => setSelected(e.value)}
                  value={field.value}
                  editMode="row"
                  dataKey="id"
                  onRowEditComplete={onRowEditComplete}
                  responsiveLayout="scroll"
                >
                  <Column
                    field="type"
                    header="Content Type"
                    body={statusBodyTemplate}
                    bodyClassName={styles.body}
                    editor={(options) => contentTypeEditor(options)}
                  />
                  <Column
                    field="link"
                    header="Link"
                    editor={(options) => linkEditor(options)}
                    bodyClassName={styles.body}
                  />
                  <Column rowEditor bodyClassName={styles.body} />
                </DataTable>

                <div className="mt-5 flex align-items-center justify-content-center">
                  <Button
                    type="button"
                    className="p-button-info py-2"
                    label={t(ADD)}
                    onClick={() => setShow(true)}
                    icon={
                      <img
                        src="/icons/plus.svg"
                        className="mr-2"
                        alt="contact"
                        width={25}
                      />
                    }
                  />
                  <AddDialog
                    show={show}
                    setShow={setShow}
                    socials={socials}
                    addSocial={onAdd}
                  />
                  <Button
                    type="button"
                    disabled={!selected}
                    className="p-button-info py-2 mx-2"
                    label={t(DELETE)}
                    onClick={onDelete}
                    icon={
                      <img
                        src="/icons/minus.svg"
                        className="mr-2"
                        alt="contact"
                        width={25}
                      />
                    }
                  />
                </div>
              </>
            );
          }}
        />
      </div>
    </>
  );
}
