export const matchName = (name, keyword) => {
  let keyLen = keyword.length;
  name = name.toLowerCase().substring(0, keyLen);
  return name == keyword && keyLen != 0;
};