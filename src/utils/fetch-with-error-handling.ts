import { errorMessages } from '../error-messages';

export const fetchWithErrorHandling = async (
  fetcher: () => Promise<unknown>,
  rejectWithValue: (value: unknown) => unknown,
  executeOnError?: (originalMessage: string) => unknown
): Promise<unknown> => {
  try {
    return await fetcher();
  } catch (error: any) {
    const responseData = error.response?.data?.message;

    const originalMessage = (
      Array.isArray(responseData) ? responseData[0] : responseData
    ) as keyof typeof errorMessages;

    executeOnError?.(originalMessage);

    return rejectWithValue(errorMessages[originalMessage] || originalMessage);
  }
};
