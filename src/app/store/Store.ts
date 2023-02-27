import { Store } from "tauri-plugin-store-api";

type UpdateStore<T> = (key: string, value: T) => Promise<void>;
type GetFromStore = (key: string) => Promise<{ value: string } | null>;

interface StoreHandle {
  settings: Store;
  getSettings: GetFromStore;
  updateSettings: UpdateStore<string>;
}

export const StorageHandler = (
  //
  settingsStore = new Store(".settings.dat")
  //
): StoreHandle => ({
  //
  settings: settingsStore,
  //
  getSettings: async (key) => await settingsStore.get(key),
  //
  updateSettings: async (key: string, value: string) =>
    await settingsStore.set(key, { value })
  //
});
