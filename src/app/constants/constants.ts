export enum paths {
  main = 'main',
  time = 'time',
  city = 'city',
}

export const GLOBALS = {
  ONE_SECOND_IN_MS: 1000,
  MIN_LENGHT_OF_CITY_QUERY: 3,
}

export const tabs = [
  { path: paths.main, label: 'Главная' },
  { path: paths.time, label: 'Время' },
  { path: paths.city, label: 'Город' },
];
