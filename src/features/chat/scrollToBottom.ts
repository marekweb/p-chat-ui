export function scrollToBottom(): void {
  if (window && window.scrollTo && document && document.body) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    })
  }
}
