module.exports = {
  "admin": {
    "register": {
      "emailNull":         "Please, fill up email-address",
      "emailIncorrect":    "Incorrect email-address",
      "passwordLength":    "Password should not be less than 6 and more than 50 symbols",
      "passwordsNotEqual": "Both passwords should be the same",
      "firstNameNull":     "Please, fill up first name",
      "lastNameNull":      "Please, fill up last name",
      "success":           "Your request will be reviewed by our administrator",
      "errorErrors":       "Please, fix all errors",
      "errorDuplicate":    "Request with this email-address have been already added",
      "errorDatabase":     "Service error, please try again later"
    },
    "login": {
      "emailNull":         "Please fill up email-address",
      "emailIncorrect":    "Incorrect email-address",
      "passwordNull":      "Please fill up password",
      "success":           "Credentials matched, performing login",
      "errorErrors":       "Please, fix all errors",
      "errorIncorrect":    "There are no administrator with such email and password",
      "errorDatabase":     "Service error, please try again later"
    },
    "apply" : {
      "codeNull":          "Invalid link. Nothing have been done",
      "codeApplied":       "Administrator request was approved",
      "codeApplyError":    "Administrator request was not approved because of service error, please try again later"
    },
    "decline" : {
      "codeNull":          "Invalid link. Nothing have been done",
      "codeDeclined":      "Administrator request was rejected",
      "codeDeclineError":  "Administrator request was not rejected because of service error, please try again later"
    },
    "restore": {
      "emailNull":         "Please, fill up email-address",
      "emailIncorrect":    "Incorrect email-address",
      "success":           "Password restore instructions were sent to your email-address",
      "errorErrors":       "Please, fix all errors",
      "errorIncorrect":    "There are no administrator with such email",
      "errorDatabase":     "Service error, please try again later"
    },
    "newPassword": {
      "codeNull":          "Password restore link is invalid or expired",
      "passwordLength":    "Password should not be less than 6 and more than 50 symbols",
      "passwordsNotEqual": "Both passwords should be the same",
      "errorErrors":       "Please, fix all errors",
      "errorDatabase":     "Service error, please try again later",
      "errorIncorrect":    "Password restore link is invalid or expired",
      "passwordSet":       "New password saved. You can login using new credentials."
    }
  },
  "restricted": {
    "graduates": {
      "errorDatabase":     "Service error, please try again later"
    },
    "graduate": {
      "save": {
        "fullNameNull":      "Full name cannot be empty",
        "imgNull":           "Please add an image",
        "imgWrongType":      "You can use only jpeg and png images",
        "occupancyNull":     "Please, fill up occupancy",
        "leadNull":          "Lead cannot be empty",
        "fullLeadNull":      "Full lead cannot be empty",
        "textNull":          "Text cannot be empty",
        "success":           "Graduate form saved successfully",
        "errorErrors":       "Please, fix all errors",
        "errorDatabase":     "Service error, please try again later"
      },
      "delete": {
        "success":          "Graduate record №%d successfully removed.",
        "error":            "Service error. Graduate record №%d cannot be removed."
      }
    }
  }
};