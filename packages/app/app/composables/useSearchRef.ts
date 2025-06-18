export const useSearchRef = () => {
  const searchRef = useState("searchRef", () => false);
  return {
    searchRef,
  };
};
