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

// Элемент ответа расширяет Metric, добавляя value

// 2. Словарь доступных метрик (только id и name)
const AVAILABLE_METRICS: Record<string, string> = {
  1: "Выручка",
  2: "Количество заказов",
  3: "Средний чек",
  4: "Отмененные заказы",
  5: "Касса за день",
};

/**
 * Генерация ответа по контракту DashboardDataResponse[]
 */
export function generateMockDashboardData(
  request: DashboardDataRequest,
): DashboardDataResponse[] {
  return request.metricIds.map((id: string): DashboardDataResponse => {
    const name = AVAILABLE_METRICS[id] || `Метрика ${id}`;

    // Генерация псевдослучайных данных
    const baseValue = Math.floor(Math.random() * 500) + 10;
    const value = id === "revenue" ? baseValue * 20 : baseValue;

    return {
      id,
      name,
      value,
    };
  });
}

/**
 * Имитация асинхронного сетевого запроса с задержкой
 */
export function fetchMockDashboardData(
  request: DashboardDataRequest,
): Promise<DashboardDataResponse[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockDashboardData(request));
    }, 500);
  });
}
