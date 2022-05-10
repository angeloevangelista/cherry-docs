async function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, milliseconds);
  });
}

export { wait };
