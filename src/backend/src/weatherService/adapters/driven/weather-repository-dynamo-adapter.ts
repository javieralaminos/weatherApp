import { assert } from 'console';
import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { WeatherType } from '../../../models';
import { GetTimeSeriesWeatherProps, SetWeatherProps, TimeSeriesResponse } from '../../app/schemas';
import { ForQueringWeather } from '../../ports/driven/for-quering-weather';

export class WeatherRepositoryDynamoAdapter implements ForQueringWeather {
  tableName: string;
  public readonly client = new DynamoDBClient({});
  constructor() {
    assert(process.env.TABLE_NAME, 'TABLE_NAME is not defined');
    this.tableName = process.env.TABLE_NAME ?? '';
  }


  public async getTimeSeries(props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    const { startDate, endDate, type } = props;
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'pk = :pk and sk between :startDate and :endDate',
      ExpressionAttributeValues: {
        ':pk': { S: type },
        ':startDate': { S: startDate },
        ':endDate': { S: endDate },
      },
    };
    const response = await this.client.send(new QueryCommand(params));
    if (!response.Items) throw new Error('No items found');
    return {
      timeSeries: response.Items.map((item) => ({
        datetime: item.datetime.S ?? '',
        value: Number(item.value.N),
        type: item.type.S as WeatherType,
      })),
    };
  }
  public async setWeather(props: SetWeatherProps): Promise<void> {
    const { datetime, value, type } = props;
    const params = {
      TableName: this.tableName,
      Item: {
        pk: { S: type },
        sk: { S: datetime },
        datetime: { S: datetime },
        value: { N: value.toString() },
        type: { S: type },
      },
    };
    await this.client.send(new PutItemCommand(params));
  }
}
