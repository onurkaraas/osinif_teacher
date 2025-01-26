import profileInput from "../../../components/main/profileInput";

const CompanySettings = ({ userInfo, handleChanges }) => {
  return (
    <>
      {profileInput({
        label: "Kurum",
        value: userInfo.COMPANY.toString(),
        disabled: true,
        placeholder: "Adınızı giriniz",
      })}
      {profileInput({
        label: "Okul",
        value: userInfo.SCHOOL.toString(),
        disabled: true,
        placeholder: "Adınızı giriniz",
      })}
      {profileInput({
        label: "Sınıf",
        disabled: true,

        value: userInfo.SINIF.toString(),
        onChangeText: (text) => {
          handleChanges(text, "NAME");
        },
        placeholder: "Adınızı giriniz",
      })}
      {profileInput({
        label: "Şube",
        disabled: true,
        value: userInfo.SUBE.toString(),
        onChangeText: (text) => {
          handleChanges(text, "LASTNAME");
        },
        placeholder: "Adınızı giriniz",
      })}
    </>
  );
};
export default CompanySettings;
