// place files you want to import through the `$lib` alias in this folder.

export const projectImgTransitionName = (id: string) =>
  `project-img-${id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
