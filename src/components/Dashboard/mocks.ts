import { GetQueryParams, Restaurant } from "../../types/dashboardTypes";

// 2. Исходные типизированные данные
const mockRestaurants: Restaurant[] = [
  { id: 1, city: "Москва", pointNumber: 101 },
  { id: 2, city: "Санкт-Петербург", pointNumber: 102 },
  { id: 3, city: "Новосибирск", pointNumber: 103 },
  { id: 4, city: "Москва", pointNumber: 104 },
  { id: 5, city: "Казань", pointNumber: 105 },
];

// 3. Имитация GET /api/restaurants с задержкой и фильтрацией
export const fetchRestaurants = (
  params: GetQueryParams = {},
): Promise<Restaurant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const search = params.search?.trim().toLowerCase();

      // Если поисковый запрос пуст, возвращаем все данные
      if (!search) {
        resolve(mockRestaurants);
        return;
      }

      // Фильтрация по городу или номеру точки
      const filteredRestaurants = mockRestaurants.filter((restaurant) => {
        const matchesCity = restaurant.city.toLowerCase().includes(search);
        const matchesPoint = String(restaurant.pointNumber).includes(search);
        return matchesCity || matchesPoint;
      });

      resolve(filteredRestaurants);
    }, 800); // имитация задержки сети 800мс
  });
};
