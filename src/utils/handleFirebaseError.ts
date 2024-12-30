import { toast } from "sonner";

type FirebaseError = {
  code: string;
  message: string;
};

export function handleFirebaseError(error: FirebaseError) {
  let errorMessage = "Something went wrong. Please try again.";

  if (error && error.code) {
    switch (error.code) {
      // Authentication Errors
      case "auth/user-not-found":
        errorMessage = "No user found with this email address.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password. Please try again.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address. Please check and try again.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error. Please check your connection.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many attempts. Please try again later.";
        break;
      case "auth/email-already-in-use":
        errorMessage =
          "This email is already in use. Please try a different one.";
        break;
      case "auth/weak-password":
        errorMessage =
          "The password is too weak. Please choose a stronger password.";
        break;

      case "auth/invalid-credential":
        errorMessage = "Invalid credentials. Please try again.";
        break;

      // Database Operation Errors
      case "permission-denied":
        errorMessage = "You don't have permission to perform this action.";
        break;
      case "unavailable":
        errorMessage =
          "The service is currently unavailable. Please try again later.";
        break;
      case "data-loss":
        errorMessage = "Data loss error. Please try again.";
        break;
      case "resource-exhausted":
        errorMessage = "Quota exceeded. Please try again later.";
        break;

      // Document/Collection Errors
      case "not-found":
        errorMessage = "The requested document was not found.";
        break;
      case "already-exists":
        errorMessage = "A document with this ID already exists.";
        break;
      case "invalid-argument":
        errorMessage = "Invalid data provided. Please check and try again.";
        break;

      // Storage Errors
      case "storage/object-not-found":
        errorMessage = "File not found. Please check the path and try again.";
        break;
      case "storage/unauthorized":
        errorMessage = "Not authorized to access this file.";
        break;
      case "storage/canceled":
        errorMessage = "Upload canceled.";
        break;
      case "storage/quota-exceeded":
        errorMessage = "Storage quota exceeded.";
        break;

      // Transaction Errors
      case "failed-precondition":
        errorMessage =
          "Operation failed. The database may be in an invalid state.";
        break;
      case "aborted":
        errorMessage = "Transaction was aborted. Please try again.";
        break;
      case "out-of-range":
        errorMessage = "Operation was attempted past the valid range.";
        break;

      // Rate Limiting
      case "deadline-exceeded":
        errorMessage = "Request timeout. Please try again.";
        break;
      case "resource-exhausted":
        errorMessage = "Too many requests. Please try again later.";
        break;

      default:
        errorMessage = "An unknown error occurred. Please try again.";
    }
  }

  console.error("Firebase Error:", {
    code: error?.code,
    message: error?.message,
    fullError: error,
  });

  toast.error(errorMessage);
}
