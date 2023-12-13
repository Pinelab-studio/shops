import { LanguageCode } from '@vendure/core';

export const validateDescription = (value: string) => {
  if (value?.length > 255) {
    return [
      {
        value: 'Meta description can be max 255 characters',
        languageCode: LanguageCode.en,
      },
    ];
  }
};
