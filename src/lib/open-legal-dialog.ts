export function openLegalDialog(id: string) {
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement)) return;

  if (!dialog.dataset.bound) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.dataset.bound = "true";
  }

  // Open on the next frame so the originating click cannot hit the backdrop
  // and close the dialog in the same gesture.
  requestAnimationFrame(() => {
    if (!dialog.open) dialog.showModal();
  });
}
