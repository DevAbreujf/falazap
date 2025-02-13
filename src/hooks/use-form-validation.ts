
import { useState, useCallback } from 'react';
import { z } from 'zod';

interface ValidationOptions<T> {
  schema: z.ZodType<T>;
  onSuccess?: (data: T) => void;
  onError?: (errors: Record<string, string[]>) => void;
}

export function useFormValidation<T>({ schema, onSuccess, onError }: ValidationOptions<T>) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const validate = useCallback(
    (data: unknown) => {
      try {
        const validatedData = schema.parse(data);
        setErrors({});
        onSuccess?.(validatedData);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<string, string[]> = {};
          error.errors.forEach((err) => {
            const path = err.path.join('.');
            if (!formattedErrors[path]) {
              formattedErrors[path] = [];
            }
            formattedErrors[path].push(err.message);
          });
          setErrors(formattedErrors);
          onError?.(formattedErrors);
        }
        return false;
      }
    },
    [schema, onSuccess, onError]
  );

  const getFieldError = useCallback(
    (field: string) => {
      return errors[field]?.[0];
    },
    [errors]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validate,
    getFieldError,
    clearErrors,
  };
}
