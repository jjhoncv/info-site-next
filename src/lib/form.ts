export const handleKeyDown = async (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (form) {
      form.requestSubmit();
    }
  }
};
