import { defApiFunc } from "../index";

const getWords = async (props) => {
  const { lang } = props;
  return await defApiFunc("getWords", {
    type: 2,
    count: 100,
    lang: lang,
    user: 150,
  });
};

export default getWords;
