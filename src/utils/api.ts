import axios from "axios";

export function checkTokenValidity(token: string) {
  let data = JSON.stringify({
    Token: token,
  });

  let config = {
    method: "post",
    url: "http://localhost:3001/v1/auth/token",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function loginUser(username: string, password: string, email: string) {
  let data = JSON.stringify({
    Username: username,
    Password: password,
    Email: email,
  });

  let config = {
    method: "post",
    url: "http://localhost:3001/v1/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function validateSudoPermRequest(phrases: any) {
  let data = JSON.stringify({
    Words: phrases,
  });

  let config = {
    method: "post",
    url: "http://localhost:3001/v1/auth/verify",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function registerUser(
  username: string,
  password: string,
  email: string
) {
  let data = JSON.stringify({
    Username: username,
    Password: password,
    Email: email,
  });

  let config = {
    method: "post",
    url: "http://localhost:3001/v1/auth/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function checkApiHealth() {
  let config = {
    method: "get",
    url: "http://localhost:3001/v1/health",
  };

  return axios(config);
}

export function getAttachmentsLength() {
  let config = {
    method: "get",
    url: "http://localhost:3001/v1/length?q=attachments",
  };

  return axios(config);
}

export function getPasswordsLength() {
  let config = {
    method: "get",
    url: "http://localhost:3001/v1/length?q=passwords",
  };

  return axios(config);
}

export function getFavouritesLength() {
  let config = {
    method: "get",
    url: "http://localhost:3001/v1/length?q=favourites",
  };

  return axios(config);
}

export function getPasswords() {
  let config = {
    method: "get",
    url: "http://localhost:3001/v1/passwords/show",
  };

  return axios(config);
}

export function saveNewPasswordViaApi(
  appicon: string,
  name: string,
  username: string,
  password: string,
  url: string
) {
  const data = JSON.stringify({
    AppIcon: appicon,
    Name: name,
    Username: username,
    Password: password,
    Url: url,
  });

  let config = {
    method: "post",
    url: "http://localhost:3001/v1/passwords/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function deletePasswordViaApi(id: string, sudoPermArray: any) {
  let data = JSON.stringify({
    Id: id,
    Words: [...sudoPermArray],
  });

  let config = {
    method: "delete",
    url: "http://localhost:3001/v1/passwords/delete",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function getAttachments() {
  let config = {
    method: "get",
    url: "http://localhost:3001/v1/attachments/show",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
}

export function deleteAttachment(id: string, sudoPermArray: any) {
  let data = JSON.stringify({
    Id: id,
    Words: [...sudoPermArray],
  });

  let config = {
    method: "delete",
    url: "http://localhost:3001/v1/attachments/delete",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function uploadAttachment(name: string, base64: string) {
  let data = JSON.stringify({
    Name: name,
    Base64: base64,
  });

  let config = {
    method: "post",
    url: "http://localhost:3001/v1/attachments/upload",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function updatePasswordData(
  Id: string,
  AppIcon: string,
  Name: string,
  Username: string,
  Password: string,
  Url: string,
  SudoPermArray: any
) {
  let config = {
    method: "patch",
    url: "http://localhost:3001/v1/passwords/update",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      Id: Id,
      AppIcon: AppIcon,
      Name: Name,
      Username: Username,
      Password: Password,
      Url: Url,
      Words: [...SudoPermArray],
    }),
  };

  return axios(config);
}

export function savePasswordToFavourites(
  Id: string,
  AppIcon: string,
  Name: string,
  Username: string,
  Password: string,
  Url: string
) {
  let config = {
    method: "post",
    url: "http://localhost:3001/v1/favourites/add",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      Id: Id,
      AppIcon: AppIcon,
      Name: Name,
      Username: Username,
      Password: Password,
      Url: Url,
    }),
  };

  return axios(config);
}

export function getFavourites() {
  let config = {
    method: "get",
    url: "http://localhost:3001/v1/favourites/show",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
}

export function deleteFavouriteViaApi(Id: string, sudoPermArray: any) {
  let config = {
    method: "delete",
    url: "http://localhost:3001/v1/favourites/delete",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      Id,
      Words: [...sudoPermArray],
    }),
  };

  return axios(config);
}

export function downloadPasswords(sudoPermArray: any) {
  let config = {
    method: "post",
    url: "http://localhost:3001/v1/download",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      Words: [...sudoPermArray],
    }),
  };

  return axios(config);
}

export function deleteAccount(
  username: string,
  password: string,
  email: string,
  sudoPermArray: any
) {
  let config = {
    method: "delete",
    url: "http://localhost:3001/v1/auth/delete",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      Words: [...sudoPermArray],
      Username: username,
      Password: password,
      Email: email,
    }),
  };

  return axios(config);
}

export function uploadPasswordsViaFileAndApi(file: any) {
  let config = {
    method: "post",
    url: "http://localhost:3001/v1/passwords/upload",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      Content: file,
    }),
  };

  return axios(config);
}
