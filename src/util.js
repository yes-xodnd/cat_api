export function createTemplateFragment(template) {
  const t = document.createElement('template');
  t.innerHTML = template;
  return t.content.cloneNode(true);
}