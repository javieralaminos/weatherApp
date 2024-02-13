import { z } from 'zod';
import { WeatherType } from '../../models';

export const GetTimeSeriesWeatherPropsSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  type: z.nativeEnum(WeatherType),
});
export type GetTimeSeriesWeatherProps = z.infer<typeof GetTimeSeriesWeatherPropsSchema>;

export const TimeSeriesSchema = z.object({
  datetime: z.string(),
  value: z.number(),
  type: z.nativeEnum(WeatherType),
});

export const TimeSeriesResponseSchema = z.object({
  timeSeries: z.array(TimeSeriesSchema),
});
export type TimeSeriesResponse = z.infer<typeof TimeSeriesResponseSchema>;

export const SetWeatherPropsSchema = z.object({
  datetime: z.string(),
  value: z.number(),
  type: z.nativeEnum(WeatherType),
});
export type SetWeatherProps = z.infer<typeof SetWeatherPropsSchema>;
