export const shuffle = <T>(arr: Array<T>) => {
  if (arr.length < 2) return;

  const array = arr;
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
};

export const getRandomNumber = (maxNumber: number) => Math.floor(Math.random() * (maxNumber + 1));
export const getRandomOrder = (length: number) => {
  const order = [];

  for (let i = 0; i < length; i += 1) {
    order[i] = i;
  }

  shuffle(order);
  return order;
};
