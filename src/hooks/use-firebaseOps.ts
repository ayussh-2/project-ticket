import { useState } from "react";
import * as hackerOperations from "@/firebase/hackerOps";
import { handleFirebaseError } from "@/utils/handleFirebaseError";
import { FirebaseError } from "@/types";

type FirebaseOperation = keyof typeof hackerOperations;
type OperationData<T extends FirebaseOperation> = Parameters<
  (typeof hackerOperations)[T]
>;

export function useFirebaseOperation<T extends FirebaseOperation>(
  operationName: T,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeOperation = async (...args: OperationData<T>) => {
    setIsLoading(true);
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      const operation = hackerOperations[operationName] as Function;
      const result = await operation(...args);
      return result;
    } catch (err) {
      handleFirebaseError(err as FirebaseError);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute: executeOperation,
    isLoading,
    error,
  };
}
