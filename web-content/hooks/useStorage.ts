// import { useState, useEffect } from "react";

// /**
//  * A prefix to identify session and local storage keys saved using
//  * the storage hooks in this application.
//  */
// export const STORAGE_KEYS_PREFIX = "cecurestream_";

// /**
//  * Interface for a JSON converter which provides methods to serialize
//  * and deserialize values to and from JSON strings.
//  */
// export interface JsonConverter<AppType, ParsedType> {
//   /**
//    * Serializes a value to a JSON-compatible object.
//    * @param value The value to be serialized.
//    * @returns The JSON-compatible object representation of the value.
//    */
//   toJson: (value: AppType) => ParsedType;

//   /**
//    * Deserializes a JSON-compatible object to a value.
//    * @param storedValue The JSON-compatible object to be deserialized.
//    * @returns The deserialized value.
//    */
//   fromJson: (storedValue: ParsedType) => AppType;
// }

// const storageFactory =
//   (storage: Storage, keyPrefix: string) =>
//   <AppType, ParsedType = AppType>(
//     storageKey: string,
//     fallbackState: AppType,
//     converter?: JsonConverter<AppType, ParsedType>
//   ): [AppType, React.Dispatch<React.SetStateAction<AppType>>] => {
//     if (!storageKey)
//       throw new Error(
//         `"storageKey" must be a nonempty string, but "${storageKey}" was passed.`
//       );

//     const [value, setValue] = useState<AppType>(() => {
//       const storedString = storage && storage?.getItem(keyPrefix + storageKey);
//       if (storedString && converter) {
//         const parsedValue = JSON.parse(storedString);
//         return converter.fromJson(parsedValue);
//       } else if (storedString) {
//         console.log(storedString);
//         return JSON.parse(storedString); // If no converter provided, return the parsed JSON directly
//       } else {
//         return fallbackState;
//       }
//     });

//     useEffect(() => {
//       if (converter) {
//         const jsonValue = converter.toJson(value);
//         storage.setItem(keyPrefix + storageKey, JSON.stringify(jsonValue));
//       } else {
//         storage.setItem(keyPrefix + storageKey, JSON.stringify(value));
//       }
//     }, [value, storageKey, converter]);

//     return [value, setValue];
//   };

// /**
//  * Saves data in local storage.
//  * @param storageKey A string to identify the value being cached.
//  * @param fallbackState The default value when no value has been stored yet.
//  * @returns A stateful value, and a function to update it.
//  * @example
//  * const [collapsed, setCollapsed] = useLocalStorage('isSidebarCollapsed', false);
//  */
// const useLocalStorage = storageFactory(
//   global?.window?.localStorage,
//   STORAGE_KEYS_PREFIX
// );

// /**
//  * Saves data in session storage.
//  * @param storageKey A string to identify the value being cached.
//  * @param fallbackState The default value when no value has been stored yet.
//  * @returns A stateful value, and a function to update it.
//  * @example
//  * const [collapsed, setCollapsed] = useSessionStorage('isSidebarCollapsed', false);
//  */
// const useSessionStorage = storageFactory(
//   global?.window?.sessionStorage,
//   STORAGE_KEYS_PREFIX
// );

// export { useLocalStorage, useSessionStorage };

import { useState, useEffect } from "react";

/**
 * A prefix to identify session and local storage keys saved using
 * the storage hooks in this application.
 */
export const STORAGE_KEYS_PREFIX = "cecurestream_";

/**
 * Interface for a JSON converter which provides methods to serialize
 * and deserialize values to and from JSON strings.
 */
export interface JsonConverter<AppType, ParsedType> {
  /**
   * Serializes a value to a JSON-compatible object.
   * @param value The value to be serialized.
   * @returns The JSON-compatible object representation of the value.
   */
  toJson: (value: AppType) => ParsedType;

  /**
   * Deserializes a JSON-compatible object to a value.
   * @param storedValue The JSON-compatible object to be deserialized.
   * @returns The deserialized value.
   */
  fromJson: (storedValue: ParsedType) => AppType;
}

const storageFactory =
  (storage: Storage, keyPrefix: string) =>
  <AppType, ParsedType = AppType>(
    storageKey: string,
    fallbackState: AppType,
    converter?: JsonConverter<AppType, ParsedType>
  ): [AppType, React.Dispatch<React.SetStateAction<AppType>>] => {
    if (!storageKey)
      throw new Error(
        `"storageKey" must be a nonempty string, but "${storageKey}" was passed.`
      );

    const [value, setValue] = useState<AppType>(() => {
      const storedString = storage && storage?.getItem(keyPrefix + storageKey);
      if (storedString && converter) {
        const parsedValue = JSON.parse(storedString);
        return converter.fromJson(parsedValue);
      } else if (storedString) {
        return JSON.parse(JSON.stringify(storedString)); // If no converter provided, return the parsed JSON directly
      } else {
        return fallbackState;
      }
    });

    useEffect(() => {
      if (typeof value === "string") {
        storage.setItem(keyPrefix + storageKey, value);
      } else if (converter) {
        const jsonValue = converter.toJson(value);
        storage.setItem(keyPrefix + storageKey, JSON.stringify(jsonValue));
      } else {
        storage.setItem(keyPrefix + storageKey, JSON.stringify(value));
      }
    }, [value, storageKey, converter]);

    return [value, setValue];
  };

/**
 * Saves data in local storage.
 * @param storageKey A string to identify the value being cached.
 * @param fallbackState The default value when no value has been stored yet.
 * @returns A stateful value, and a function to update it.
 * @example
 * const [collapsed, setCollapsed] = useLocalStorage('isSidebarCollapsed', false);
 */
const useLocalStorage = storageFactory(
  global?.window?.localStorage,
  STORAGE_KEYS_PREFIX
);

/**
 * Saves data in session storage.
 * @param storageKey A string to identify the value being cached.
 * @param fallbackState The default value when no value has been stored yet.
 * @returns A stateful value, and a function to update it.
 * @example
 * const [collapsed, setCollapsed] = useSessionStorage('isSidebarCollapsed', false);
 */
const useSessionStorage = storageFactory(
  global?.window?.sessionStorage,
  STORAGE_KEYS_PREFIX
);

export { useLocalStorage, useSessionStorage };
