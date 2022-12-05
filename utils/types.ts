export interface EditForm {
  publicUrlName: any;
  certificateName: any;
  birthday: Date;
  profilePic: any;
  fullName: any;
  email: any;
  accountName: any;
  postalAddress: any;
  zip: any;
  city: any;
  state: any;
  country: {
    name: any;
    code: any;
  };
  spokenLanguages: any;
  interests: any;
  socials: any;
}

export interface Rules {
  required?: any;
  validate?: any;
}
