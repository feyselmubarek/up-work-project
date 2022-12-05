import { isFileList } from "./helpers";
import {
  IMAGE_FORMAT_ERROR,
  INTERESTS_ERROR,
  LANGUAGE_ERROR,
  REQUIRED_ERROR,
} from "./keys";
import { Rules } from "./types";

export const interestRules: Rules = {
  required: { value: true, message: INTERESTS_ERROR },
};

export const cityRules: Rules = {
  required: { value: true, message: REQUIRED_ERROR },
};

export const stateRules: Rules = {
  required: { value: true, message: REQUIRED_ERROR },
};

export const countryRules: Rules = {
  required: { value: true, message: REQUIRED_ERROR },
};

export const langsRules: Rules = {
  required: { value: true, message: LANGUAGE_ERROR },
};

export const customURLRules: Rules = {
  required: { value: true, message: REQUIRED_ERROR },
};

export const cetificateRules: Rules = {
  required: {
    value: true,
    message: REQUIRED_ERROR,
  },
};

export const birthDayRules: Rules = {
  required: { value: true, message: REQUIRED_ERROR },
};

export const profilePicRules: Rules = {
  validate: {
    lessThan256KB: (files: any) => {
      if (isFileList(files)) {
        return files[0]?.size < 256000 || "Maximum image size is 256KB!";
      }
      return true;
    },
    acceptedFormats: (files: any) => {
      if (isFileList(files)) {
        return (
          ["image/jpeg", "image/png"].includes(files[0]?.type) ||
          IMAGE_FORMAT_ERROR
        );
      }
      return true;
    },
    dimenstion: async (files: FileList) => {
      const getImageDimension = new Promise((resolve) => {
        if (isFileList(files)) {
          const img = new Image();
          img.src = URL.createObjectURL(files[0]);

          img.onload = () => {
            const actualwidth = img.width;
            const actualheight = img.height;

            if (
              actualheight > 1024 ||
              actualwidth > 1024 ||
              actualheight < 256 ||
              actualwidth < 256
            ) {
              resolve("Width & height should be between 256px and 1024px!");
            } else {
              resolve(true);
            }
          };
        } else {
          resolve(true);
        }
      });

      return getImageDimension;
    },
  },
};
