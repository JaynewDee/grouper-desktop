import { useCallback, useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";

type UpdateStore<T> = (key: string, value: T) => Promise<void>;
type GetFromStore = (key: string) => Promise<{ value: string } | null>;

interface StoreHandle {
  settings: Store;
  getSettings: GetFromStore;
  updateSettings: UpdateStore<any>;
}

const StorageHandler = (
  //
  settingsStore = new Store(".settings.dat")
  //
): StoreHandle => ({
  //
  settings: settingsStore,
  //
  getSettings: async (key) => await settingsStore.get(key),
  //
  updateSettings: async (key: string, value: any) =>
    await settingsStore.set(key, { value })
  //
});

export const useSettingsStore = () => {
  const [settings, setSettings] = useState<{ value: any } | null>();

  useEffect(() => {
    const initialize = async () => {
      const { getSettings, updateSettings } = StorageHandler();
      const current = await getSettings("settings");
      if (!current) {
        await updateSettings("settings", { window: "sm" });
      } else {
        setSettings(current);
      }
    };
    initialize();
  }, []);

  const updateSettings = useCallback(async ({ value }: { value: string }) => {
    const { updateSettings } = StorageHandler();
    return await updateSettings("settings", value);
  }, []);

  return [settings, updateSettings];
};
