// export const myAction = async ({commit}) => {};

import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
  const { /*  name, */ email, password } = user;
console.log(commit);
  try {
    console.log(email, password);
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(data);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response };
  }
};
