import bcryptjs from "bcryptjs";

export const hashPassword = async ({ password }) => {
  try {
    const hashPassword = await bcryptjs.hash(password, 10);

    return hashPassword;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const comparePassword = async (password, checkPassword) => {
  try {
    const isMatch = await bcryptjs.compare(password, checkPassword);
    return isMatch;
  } catch (error) {
    return error;
  }
};



