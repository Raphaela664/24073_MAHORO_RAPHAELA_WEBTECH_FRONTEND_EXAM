export const ValidateEmailorID = (authData) => {
  const errors = {};

  if (authData.email === "") {
    errors.email = "Email/ ID is required";
  }

  return errors;
};

export const ValidatePassword = (authData) => {
  const errors = {};

  if (authData.password === "") {
    errors.password = "Password is required";
  }

  return errors;
};

export const ValidateNewPassword = (authData) => {
  const errors = {};

  const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;

  if (authData.currentPassword === "") {
    errors.currentPassword = "Current Password is required";
  }

  if (authData.newPassword === "") {
    errors.newPassword = "New Password is required";
  } else if (!passwordPattern.test(authData.newPassword)) {
    errors.newPassword =
      "New Password must be at least 8 characters long and contain 1 Capital Letter, 1 Symbol, and 1 Number";
  }

  if (authData.confirmPassword === "") {
    errors.confirmPassword = "Confirm Password is required";
  } else if (authData.newPassword !== authData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
