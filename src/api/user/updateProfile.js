import { defApiFunc } from '../index';

const updateProfile = async (id, newData) => {
  let currentUserData = {};
  const currentUser = await defApiFunc('getAccountProfile', {
    userid: id,
  }).then(
    res => {
      console.log('USERID', res.data);
      currentUserData = res.data[0];
    },
    err => {
      console.log('err', err);
    },
  );

  const reverse = str => {
    return str.split('-').reverse().join('-').replaceAll('-', '.');
  };
  return await defApiFunc('setMemberUpdate', {
    userid: id,
    firstnameInput: newData?.firstnameInput ?? currentUserData.NAME,
    lastnameInput: newData?.lastnameInput ?? currentUserData.LASTNAME,
    DateBirth: newData?.DateBirth ?? reverse(currentUserData.BIRTHDATE),
    cboCity: newData?.cboCity ?? currentUserData.CITY,
    cboKurum: currentUserData.COMPANY,
    cboOkul: currentUserData.SCHOOL,
    cboSinif: currentUserData.SINIF,
    cboSube: currentUserData.SUBE,
    cboSezon: currentUserData.SEASON,

    videoInput: !isNaN(newData?.videoInput) ? newData?.videoInput : currentUserData.TARGET_VIDEO,
    questionInput: !isNaN(newData?.questionInput)
      ? newData?.questionInput
      : currentUserData.TARGET_QUESTION,
    paragraphInput: !isNaN(newData?.paragraphInput)
      ? newData?.paragraphInput
      : currentUserData.TARGET_PARAGRAPH,
    cboQuality: newData?.cboQuality ?? currentUserData.VIDEOQUALITY,
    smsNotification: !isNaN(newData?.smsNotification)
      ? newData?.smsNotification
      : currentUserData.SMSNOTIFICATION,
    emailNotification: !isNaN(newData?.emailNotification)
      ? newData?.emailNotification
      : currentUserData.EMAILNOTIFICATION,
    saveType: 2,
    familyname: newData?.familyname ?? currentUserData?.FAMILYNAME,
    familyphone: newData?.familyphone ?? currentUserData?.FAMILYPHONE,
    avatar: newData?.avatar ?? currentUserData?.AVATAR,
  });
};

export default updateProfile;
