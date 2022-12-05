import { ReactNode } from "react";
import { CONTACT_TAB_ERROR, PERSONAL_TAB_ERROR } from "./keys";
import { EditForm } from "./types";

const names: any = {
  "address.address": "postalAddress",
  "address.city": "city",
  "address.countryCode": "country",
  "address.state": "state",
  "address.zipCode": "zip",
  birthday: "birthday",
  certificateName: "certificateName",
  email: "email",
  fullName: "fullName",
  interests: "interests",
  publicUrlName: "publicUrlName",
  spokenLanguages: "spokenLanguages",
  accountName: "accountName",
  $protocol: "$protocol",
  $security: "$security",
};

/**
 *
 * @param errors parsedErrors
 * @returns boolean after checking first tab inputs
 */
const hasFirstTabError = (errors: any) => {
  return (
    errors &&
    (errors.publicUrlName ||
      errors.fullName ||
      errors.email ||
      errors.accountName ||
      errors.certificateName ||
      errors.birthday ||
      errors.profilePic)
  );
};

/**
 *
 * @param errors parsedErrors
 * @returns boolean after checking second tab inputs
 */
const hasSecondTabError = (errors: any) => {
  return (
    errors &&
    (errors.city ||
      errors.postalAddress ||
      errors.zip ||
      errors.state ||
      errors.country ||
      errors.spokenLanguages ||
      errors.interests)
  );
};

/**
 *
 * @param num number to be padded
 * @returns padded number for numbers below 10
 */
const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`);

/**
 *
 * @param data form data
 * @param skipAvatar flag to add profile pic or not
 * @returns parsed json object that's ready to be send to services API
 */
const parseForm = (data: any, skipAvatar: boolean = false) => {
  if (!data) return {};
  let form: any = {
    fullName: data.fullName,
    publicUrlName: data.publicUrlName,
    interests: data.interests,
    email: data.email,
    birthday: getDateStr(data.birthday),
    accountName: data.accountName,
    certificateName: data.certificateName,
    onlineName: data.publicUrlName,
    spokenLanguages: data.spokenLanguages.map((lang: any) => lang.code),
    address: {
      address: data.postalAddress,
      state: data.state,
      city: data.city,
      zipCode: data.zip,
      countryCode: data.country.code,
    },
    contacts: data.socials.map((social: any) => ({
      contactType: `contact.${social.type}`,
      contactLink: social.link,
    })),
  };

  if (!skipAvatar) form.absoluteAvatarUrl = data.profilePic;
  return form;
};

/**
 *
 * @param date date object
 * @returns string of the date in format of YYYY-MM-DD
 */
const getDateStr = (date: Date): string => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

/**
 * This function returns error status code
 * @param errors default erros
 * @returns if any error, status of the response or 200
 */
export const getStatusCode = (errors: any): number => {
  if (!errors) return 200;
  return errors.response.status;
};

/**
 * This function checks weather an item is fileList or string
 * @param item fileList or string to be checked
 * @returns true or false
 */
export const isFileList = (item: any): boolean =>
  item && item.length && typeof item !== "string";

/**
 *
 * @param defaultValues default form values
 * @param formState current form values
 * @returns aggregate object from the two
 */
export const createFormData = (defaultValues: any, formState: any = {}) => {
  return {
    ...defaultValues,
    ...parseForm(formState),
  };
};

/**
 * This function will set form error from erros comming from server
 * by coverting them to repective input names on the form
 * @param errors default errors
 * @param setError a function to set react-hook-form error
 */
export const setPostError = (errors: any, setError: any) => {
  const keys = Object.keys(errors);
  keys.forEach((key) => {
    const message: string = errors[key][0];
    setError(key, { type: "custom", message });
  });
};

/**
 *
 * @param error error object to be extracted
 * @param filter to filter protocol and security error
 * @returns if there is an error, it returns extracted errors
 */
export const getErrorFromResponse = (error: any, filter: boolean = false) => {
  if (error && error.response?.status === 400) {
    const data: any = error.response.data;

    const keys = Object.keys(data.errors);
    let parsedErrors: any = {};
    keys.forEach((key) => {
      if (!filter || (key !== "$protocol" && key !== "$security")) {
        const message: string = data.errors[key];
        parsedErrors[names[key]] = message;
      }
    });

    return parsedErrors;
  }
  return null;
};

/**
 *
 * @param register object to register given input into react-hook-form
 * @param name name of the input
 * @param rules rules to be validated for the input
 * @returns react-hook-form register object
 */
export const registerInput = (register: any, name: string, rules: any) => {
  return { ...register(name, rules) };
};

/**
 * This function parses default list of languages to input values
 * @param items default languages
 * @returns parsed languages
 */
export const getParsedTranslations = (items: any): any => {
  const codes: string[] = Object.keys(items);
  let parsedTranslations: object[] = [];
  codes.forEach((code) => {
    parsedTranslations.push({ name: items[code].name || items[code], code });
  });
  parsedTranslations.sort((a: any, b: any) => a.name.localeCompare(b.name));
  return parsedTranslations;
};

/**
 * This function parses default list of interests to input values
 * @param interests default interests
 * @returns parsed interests
 */
export const getParsedInterests = (interests: any) => {
  const keys: string[] = Object.keys(interests);
  const parsedInterests: object[] = [];

  keys.forEach((key) => {
    if (key !== "question") {
      const interest = interests[key];
      const interestKeys = Object.keys(interest);
      parsedInterests.push({
        name: interest[interestKeys[0]],
        value: interestKeys[0],
      });
    }
  });

  return parsedInterests;
};

/**
 * This function parses default list of socials to input values
 * @param socials default socials
 * @returns parsed socials
 */
export const getParsedSocials = (socials: any) => {
  const contentTypes: string[] = Object.keys(socials);
  const parsedSocials: object[] = [];

  contentTypes.forEach((contentType: string) => {
    parsedSocials.push({ type: contentType, src: socials[contentType].image });
  });
  return parsedSocials;
};

/**
 *
 * @param setActiveIndex a function to change active tab index
 * @param TabPersonalInfo first tab of the form
 * @param TabContactInfo second tab of the form
 * @param errors any errors on the inputs
 * @param errorClassName error className to be give when any of the tab has error
 * @returns menu items for tab rendering
 */
export const getMenuItems = (
  setActiveIndex: Function,
  TabPersonalInfo: ReactNode,
  TabContactInfo: ReactNode,
  errors: any,
  errorClassName: string
) => {
  return [
    {
      label: "Personal Information",
      icon: hasFirstTabError(errors) && "pi pi-fw pi-exclamation-triangle",
      command: () => setActiveIndex(0),
      className: hasFirstTabError(errors) && errorClassName,
      component: TabPersonalInfo,
    },
    {
      label: "Contact Information",
      icon: hasSecondTabError(errors) && "pi pi-fw pi-exclamation-triangle",
      command: () => setActiveIndex(1),
      className: hasSecondTabError(errors) && errorClassName,
      component: TabContactInfo,
    },
  ];
};

/**
 * This function will return parsed default values from service API
 * @param data user data fetched from service API
 * @param countries list of counties available in translation file
 * @param languages list of langues available in translation file
 * @returns EditForm object with parsed data for each form inputs
 */
export const getDefaultValues = (
  data: any,
  countries: any,
  languages: any
): EditForm => {
  return {
    publicUrlName: data.publicUrlName,
    certificateName: data.certificateName,
    birthday: new Date(data.birthday),
    profilePic: data.absoluteAvatarUrl,
    fullName: data.fullName,
    email: data.email,
    accountName: data.accountName,
    postalAddress: data.address.address,
    zip: data.address.zipCode,
    city: data.address.city,
    state: data.address.state,
    country: {
      name: countries[data.address.countryCode].name,
      code: data.address.countryCode,
    },
    spokenLanguages: data.spokenLanguages.map((code: string) => ({
      name: languages[code],
      code,
    })),
    interests: data.interests,
    socials: data.contacts.map((contact: any, id: number) => ({
      id,
      type: contact.contactType.split(".")[1],
      icon: contact.contactTypeIcon,
      link: contact.contactLink,
    })),
  };
};

/**
 * This function creates an error object
 * @param severity tells weather the status is error or success
 * @param summary title of the toast
 * @param detail detail of the toast
 * @returns prime react toast object
 */
export const getToastObj = (
  severity: string,
  summary: string,
  detail: string
) => ({
  severity,
  summary,
  detail,
  life: 3000,
});

/**
 * This function will return list of error messages
 * @param errors erros that should be displayed
 * @param t languege translating function
 * @returns list of error object
 */
export const getToastMessages = (errors: any, t: any): object[] => {
  const messages = [];
  if (hasFirstTabError(errors)) {
    messages.push(
      getToastObj("error", "Pesonal Info Tab", t(PERSONAL_TAB_ERROR))
    );
  }
  if (hasSecondTabError(errors)) {
    messages.push(
      getToastObj("error", "Contact Info Tab", t(CONTACT_TAB_ERROR))
    );
  }

  return messages;
};

/**
 *
 * @param data form data that will be parsed to be send to API
 * @returns mutlipart of profile picture and json data
 */
export const getParsedFormData = (data: any): FormData => {
  const parsedData = parseForm(data, true);
  const formData = new FormData();
  const json = JSON.stringify(parsedData, null, 2);
  const blob = new Blob([json], {
    type: "application/json",
  });

  if (data.profilePic && typeof data.profilePic !== "string") {
    formData.append("picture", data.profilePic[0]);
  }
  formData.append("data", blob);

  return formData;
};
