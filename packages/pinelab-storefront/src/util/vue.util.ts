import Vue from 'vue';

/**
 * Format Vendure's integer (1233) to euro format: €12,33
 */
export function formatEuro(value?: number) {
  if (!value) {
    value = 0;
  }
  const currencyString =
    value < 0
      ? `- €${Math.abs(value / 100)
          .toFixed(2)
          .replace('.', ',')}`
      : `€${(value / 100).toFixed(2).replace('.', ',')}`;
  if (currencyString.endsWith('00')) {
    return currencyString.replace(new RegExp('00$'), '-');
  }
  return currencyString;
}

/**
 * @deprecated Migrate to {@link createlabelFunction}
 *
 * Adds a global function to the Vue instance to get display labels.
 * @example
 * setLabelFunction(Vue, require('labels.json'))
 * // Get labels in Vue templates
 * $l('basket.title')
 */
export function setLabelFunction(vue: typeof Vue, labels: any) {
  vue.prototype.$l = (key: string) => {
    const [group, labelKey] = key.split('.');
    return labels[group]?.[labelKey] || key;
  };
}

/**
 * Adds a global function to the Vue instance to get display labels with multilingual support.
 *
 * Each label file must have a "lang":"en" root property to distinguish between locales.
 * @example
 * Vue.prototype.$l = createlabelFunction(Vue, [require('en.json'), require('nl.json')])
 *
 * // Get labels in Vue templates
 * // Uses $context.lang to determine the language
 * $l('basket.title')
 *
 * // Force a specific language
 * $l('basket.title', 'en')
 */
export function createLabelFunction(labelFiles: any[]) {
  if (!labelFiles.length) {
    throw Error(`Need at least 1 label file`);
  }
  return function (this: any, key: string, lang?: string) {
    const language = lang || this.$context?.lang;
    const labelFile = language
      ? labelFiles.find((labelFile) => labelFile.lang === language)
      : labelFiles[0];
    if (lang && !labelFile) {
      throw Error(`No label file found that contains "language":"${lang}"`);
    }
    const [group, labelKey] = key.split('.');
    const label = labelFile[group]?.[labelKey];
    if (label === undefined || label === null) {
      // Only log for undefined or null, empty strings are valid labels
      console.warn(`No label found for '${key}'`);
      return key;
    }
    return label;
  };
}
