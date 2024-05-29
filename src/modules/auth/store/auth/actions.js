// export const myAction = async ({commit}) => {};

import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;
  console.log(commit);
  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken } = data;
    const resp = await authApi.post(":update", {
      displayName: name,
      idToken,
      refreshToken,
    });
    console.log(resp, refreshToken);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};
