export default function showToast(message: string = "", error: string = "") {
  const toast = useToast();
  toast.add({
    title: message,
    icon: error ? "material-symbols:error-outline" : "i-lucide:check-circle",
    duration: 2000,
    close: {
      class: "hidden",
    },
    color: error ? "error" : "primary",
  });
}
