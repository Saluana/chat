export const useSettingsRef = () => {
  const settingsRef = useState("settingsRef", () => false);
  return {
    settingsRef,
  };
};
