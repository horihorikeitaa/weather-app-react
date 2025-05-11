import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface WeatherState {
  city: string;
  setCity: (city: string) => void;

  coordinates: { lat: number; lon: number } | null;
  setCoordinates: (coordinates: { lat: number; lon: number }) => void;

  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

const useWeatherStore = create<WeatherState>()(
  devtools((set) => ({
    city: '',
    setCity: (city) => set({ city }),

    coordinates: null,
    setCoordinates: (coordinates) => set({ coordinates }),

    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),

    error: null,
    setError: (error) => set({ error }),
  }))
);

export default useWeatherStore;
