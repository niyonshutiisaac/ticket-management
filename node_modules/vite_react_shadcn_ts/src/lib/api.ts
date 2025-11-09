// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// API client with error handling
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(endpoint: string) {
    // endpoint already starts with '/'
    return `${this.baseUrl}${endpoint}`;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = this.buildUrl(endpoint);

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    };

    // Add auth token if available (in-memory token store)
    const token = tokenStore.get();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config as RequestInit);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      // Try to parse JSON. If empty body, return null
      const text = await response.text();
      return text ? JSON.parse(text) : (null as unknown as T);
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

// API Endpoints - These will be connected to your backend
export const endpoints = {
  // Authentication
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },

  // Routes and Search
  routes: {
    search: '/routes/search',
    details: (id: string) => `/routes/${id}`,
    popular: '/routes/popular',
  },

  // Trips
  trips: {
    details: (id: string) => `/trips/${id}`,
    seats: (id: string) => `/trips/${id}/seats`,
    holdSeat: (id: string) => `/trips/${id}/hold-seat`,
  },

  // Bookings
  bookings: {
    create: '/bookings',
    list: '/bookings',
    details: (id: string) => `/bookings/${id}`,
    byReference: (reference: string) => `/bookings/${reference}`,
    cancel: (id: string) => `/bookings/${id}/cancel`,
    qr: (id: string) => `/bookings/${id}/qr`,
  },

  // Payments
  payments: {
    initiate: '/payments/initiate',
    status: (id: string) => `/payments/${id}/status`,
  },

  // Companies
  companies: {
    list: '/companies',
    details: (id: string) => `/companies/${id}`,
    reviews: (id: string) => `/companies/${id}/reviews`,
  },
};

/* Helper: build simple query string from an object */
function qs(obj: Record<string, any> = {}) {
  const parts: string[] = [];
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v === undefined || v === null || v === '') continue;
    parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(String(v)));
  }
  return parts.length ? `?${parts.join('&')}` : '';
}

/* Token helpers used by UI (in-memory only) */
let _inMemoryToken: string | null = null;

export const tokenStore = {
  set(token: string | null) {
    _inMemoryToken = token;
  },
  get(): string | null {
    return _inMemoryToken;
  },
  remove() {
    _inMemoryToken = null;
  },
};

/* High-level API wrappers matching frontend usage */
export const backendApi = {
  auth: {
    register: async (data: { name?: string; email: string; password: string; phone?: string; language_preference?: string }) => {
      const res = await api.post<{ user?: any; token?: string }>(endpoints.auth.register, data);
      if ((res as any)?.token) tokenStore.set((res as any).token);
      return res;
    },
    login: async (data: { email: string; password: string }) => {
      const res = await api.post<{ user: any; token: string }>(endpoints.auth.login, data);
      if ((res as any)?.token) tokenStore.set((res as any).token);
      return res;
    },
    logout: async () => {
      tokenStore.remove();
      return api.post(endpoints.auth.logout);
    },
    refresh: async () => {
      const res = await api.post(endpoints.auth.refresh);
      if ((res as any)?.token) tokenStore.set((res as any).token);
      return res;
    },
    profile: async () => {
      return api.get(endpoints.auth.profile);
    },
  },

  routes: {
    search: async (params: Record<string, any>) => {
      return api.get(`${endpoints.routes.search}${qs(params)}`);
    },
    details: async (id: string) => {
      return api.get(endpoints.routes.details(id));
    },
    popular: async () => {
      return api.get(endpoints.routes.popular);
    },
  },

  trips: {
    details: async (id: string) => api.get(endpoints.trips.details(id)),
    seats: async (id: string) => api.get(endpoints.trips.seats(id)),
    holdSeat: async (id: string, body: any) => api.post(endpoints.trips.holdSeat(id), body),
  },

  bookings: {
    create: async (body: any) => api.post(endpoints.bookings.create, body),
    list: async () => api.get(endpoints.bookings.list),
    details: async (id: string) => api.get(endpoints.bookings.details(id)),
    byReference: async (ref: string) => api.get(endpoints.bookings.byReference(ref)),
    cancel: async (id: string) => api.post(endpoints.bookings.cancel(id)),
    qr: async (id: string) => api.get(endpoints.bookings.qr(id)),
  },

  payments: {
    initiate: async (body: any) => api.post(endpoints.payments.initiate, body),
    status: async (id: string) => api.get(endpoints.payments.status(id)),
  },

  companies: {
    list: async () => api.get(endpoints.companies.list),
    details: async (id: string) => api.get(endpoints.companies.details(id)),
    reviews: async (id: string) => api.get(endpoints.companies.reviews(id)),
  },
};

export default backendApi;
