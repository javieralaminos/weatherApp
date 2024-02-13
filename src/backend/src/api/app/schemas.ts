import { z } from 'zod';
import { WeatherType } from '../../models';

export const GetTimeSeriesWeatherPropsSchema = z.object({
  startDate: z.number(),
  endDate: z.number(),
  type: z.nativeEnum(WeatherType),
});
export type GetTimeSeriesWeatherProps = z.infer<typeof GetTimeSeriesWeatherPropsSchema>;

export const TimeSerieSchema = z.object({
  timestamp: z.number(),
  value: z.number(),
  type: z.nativeEnum(WeatherType),
});

export const TimeSeriesResponseSchema = z.object({
  timeSeries: z.array(TimeSerieSchema),
});
export type TimeSeriesResponse = z.infer<typeof TimeSeriesResponseSchema>;

export const SetWeatherPropsSchema = z.object({
  timestamp: z.number(),
  value: z.number(),
  type: z.nativeEnum(WeatherType),
});
export type SetWeatherProps = z.infer<typeof SetWeatherPropsSchema>;
