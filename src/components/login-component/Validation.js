import * as Yup from "yup";
 

const UpdatepasswordValidation = Yup.object({
  newPassword: Yup.string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Password must match")
    .required("Confirm password is required"),
});



export default UpdatepasswordValidation;