import {
  DashboardDataRequest,
  DashboardDataResponse,
  GetQueryParams,
  Restaurant,
} from "../../types/dashboardTypes";

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

// 1. Интерфейсы по вашему контракту
export interface Metric {
  name: string;
  id: number;
}

// 2. Исходные типизированные данные
const mockMetrics: Metric[] = [
  { id: 1, name: "Выручка" },
  { id: 2, name: "Количество заказов" },
  { id: 3, name: "Средний чек" },
  { id: 4, name: "Отмененные заказы" },
  { id: 5, name: "Новые клиенты" },
];

// 3. Имитация GET /api/metrics с задержкой сети
export const fetchMetrics = (): Promise<Metric[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMetrics);
    }, 600); // имитация задержки сети 600мс
  });
};

const METRICS_DICTIONARY: Record<string, string> = {
  revenue: "Выручка",
  orders_count: "Количество заказов",
  average_bill: "Средний чек",
  canceled_orders: "Отмененные заказы",
  new_customers: "Новые клиенты",
};

// Имитация POST /api/dashboardData
export const fetchDashboardData = (
  body: DashboardDataRequest,
): Promise<DashboardDataResponse[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Валидация обязательных полей
      if (!body.restaurantId || !body.dateStart || !body.dateEnd) {
        reject(
          new Error(
            "Missing required parameters: restaurantId, dateStart, or dateEnd",
          ),
        );
        return;
      }

      if (!body.metricIds || body.metricIds.length === 0) {
        resolve([]);
        return;
      }

      // Генерация псевдослучайных данных на основе переданных metricIds
      const response: DashboardDataResponse[] = body.metricIds.map((id) => {
        const metricName = METRICS_DICTIONARY[id] || `Метрика ${id}`;

        // Генерация случайного значения (можно привязать к restaurantId для стабильности)
        const randomValue = Math.floor(Math.random() * 10000) + 50;

        return {
          name: metricName,
          value: randomValue,
        };
      });

      resolve(response);
    }, 1000); // имитация задержки сети 1000мс
  });
};
