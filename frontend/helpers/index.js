import IntlMessageFormat from 'intl-messageformat';
import { appConfig } from '@shopgate/engage';

const messageCache = {};

/**
 * @param {Object} obj .
 * @param {string} prefix .
 * @return {Object}
 */
function flattenObj(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const kkey = `${prefix}${key}`;

    if (!obj[key]) {
      acc[kkey] = obj[key];
    } else if (typeof obj[key] === 'object') {
      return {
        ...acc,
        ...flattenObj(obj[key], `${kkey}-`),
      };
    } else {
      acc[kkey] = obj[key];
    }
    return acc;
  }, {});
}

/**
 * @param {string} format .
 * @param {Object} formats .
 * @returns {IntlMessageFormat}
 */
export const getIntlMessage = (format, formats) => {
  if (!messageCache[format]) {
    try {
      messageCache[format] = new IntlMessageFormat(
        format,
        appConfig.language,
        formats
      );

      messageCache[format].origFormat = messageCache[format].format;
      messageCache[format].format = data => (
        messageCache[format].origFormat(flattenObj(data))
      );
    } catch (err) {
      messageCache[format] = {
        format: () => format,
      };
    }
  }
  return messageCache[format];
};
