import Storage from "expo-secure-store";
import { proxy, subscribe, useSnapshot } from "valtio";
import { omit, pick } from "./object";

interface WithInOrEx<T extends object> {
  include?: KeyList<T>;
  exclude?: KeyList<T>;
}

type KeyList<T extends object> = Array<keyof T>;
interface ProxyWithPersistOptions<T extends object> extends WithInOrEx<T> {
  key: string;
  onInit?(state: T): void;
}

type UseStoreReturnType<T extends object> = Pick<
  T,
  { [K in keyof T]: T[K] extends (...args: any) => any ? never : K }[keyof T]
>;

function getPersistedData(key: string) {
  try {
    const data = Storage.getItem(key);
    if (!data) return {};
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function persist<T extends object>(
  key: string,
  state: T,
  { exclude, include }: WithInOrEx<T>,
) {
  const data = include
    ? pick(state, include)
    : exclude
      ? omit(state, exclude)
      : state;
  Storage.setItem(key, JSON.stringify(data));
}

function getMergedState<T extends object>(
  initialState: T,
  persistedState: T,
): T {
  const states = { ...initialState, ...persistedState };
  Object.setPrototypeOf(states, Object.getPrototypeOf(initialState));
  return states;
}

function createPersistStore<T extends object>(
  initialObject: T,
  persistOptions: ProxyWithPersistOptions<T>,
): T {
  const { key, exclude, include, onInit } = persistOptions;
  const persistedData = getPersistedData(key);
  const mergedState = getMergedState(initialObject, persistedData);
  persist(key, mergedState, { exclude, include });
  onInit && onInit(mergedState);
  const state = proxy(mergedState);
  subscribe(state, () => {
    persist(key, state, { exclude, include });
  });
  return state;
}

function createStore<T extends object>(
  initialObject: T,
  persistOptions?: ProxyWithPersistOptions<T>,
): T {
  if (!persistOptions) return proxy(initialObject);
  return createPersistStore(initialObject, persistOptions);
}

function useStore<T extends object>(
  store: T,
  options?: {
    sync?: boolean;
  },
): UseStoreReturnType<T> {
  return useSnapshot(store, options) as UseStoreReturnType<T>;
}

export { createStore, useStore };
