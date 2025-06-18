export default defineAppConfig({
  ui: {
    colors: {
      neutral: "zinc",
      primary: "blue",
    },
    tooltip: {
      slots: {
        text: "whitespace-pre-line leading-snug",
        content:
          "flex items-center gap-1 bg-white dark:bg-black text-highlighted shadow-sm rounded-sm ring ring-default h-auto px-2.5 py-2 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
      },
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
      defaultVariants: {
        size: "sm",
      },
    },
    toast: {
      slots: {
        progress: "hidden",
        title: "text-primary-800 dark:text-primary-200",
        icon: "text-primary-800! dark:text-primary-200!",
        root: "bg-primary-100 dark:bg-primary-950",
      },
    },
  },
});
