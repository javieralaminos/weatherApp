import { z } from 'zod';
import { AverageType, WeatherType } from './models';

export const GetTimeSeriesWeatherPropsSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  type: z.nativeEnum(WeatherType),
  averageType: z.nativeEnum(AverageType),
});
export type GetTimeSeriesWeatherProps = z.infer<typeof GetTimeSeriesWeatherPropsSchema>;

export const TimeSeriesSchema = z.object({
  datetime: z.string().datetime(),
  value: z.number(),
  type: z.nativeEnum(WeatherType),
});

export const TimeSeriesResponseSchema = z.object({
  timeSeries: z.array(TimeSeriesSchema),
});
export type TimeSeriesResponse = z.infer<typeof TimeSeriesResponseSchema>;

export const SetWeatherPropsSchema = z.object({
  datetime: z.string().datetime(),
  value: z.number(),
  type: z.nativeEnum(WeatherType),
});
export type SetWeatherProps = z.infer<typeof SetWeatherPropsSchema>;
