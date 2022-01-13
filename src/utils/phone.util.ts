import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const formatPhoneNumber = (phoneNumber, code: 'MY') => {
  try {
    const phone = phoneUtil.parseAndKeepRawInput(phoneNumber, code);
    return phoneUtil.format(phone, PhoneNumberFormat.E164);
  } catch (error) {
    console.error(error);
    return phoneNumber;
  }
};
