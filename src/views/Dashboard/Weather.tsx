import React from 'react';
import { Card } from 'antd';
import getWeather from '@api/dashboard';
import Moment from 'moment';
import { RainSvg, CloudySvg, OvercastSvg, ThunderSvg, SunSvg } from '@components/SvgIcon';

interface StateData {
  daypower: string;
  daytemp: string;
  dayweather: string;
  week: number;
}

interface WeatherState {
  data: StateData[];
  weekName: string[];
}

class Weather extends React.PureComponent<{}, WeatherState> {
  state: WeatherState = {
    data: [],
    weekName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  componentDidMount() {
    getWeather().then((res: any) => {
      const { status, forecasts } = res.data;
      if (Number(status) === 1) {
        this.setState({
          data: forecasts[0].casts.map((res: any) => {
            const { daypower, daytemp, dayweather, week } = res;
            return {
              daypower,
              daytemp,
              dayweather,
              week
            };
          })
        });
      }
    });
  }

  getWeatherIcon(dayweather: string) {
    let icon = null;
    if (dayweather.indexOf('雷') >= 0) {
      icon = <ThunderSvg />;
    } else if (dayweather.indexOf('雨') >= 0) {
      icon = <RainSvg />;
    } else if (dayweather.indexOf('云') >= 0) {
      icon = <CloudySvg />;
    } else if (dayweather.indexOf('阴') >= 0) {
      icon = <OvercastSvg />;
    } else if (dayweather.indexOf('晴') >= 0) {
      icon = <SunSvg />;
    }

    return icon;
  }

  render() {
    const { data, weekName } = this.state;
    const bodyStyle = {
      padding: '0'
    };
    const WeatherItem = data.map((res, index) => {
      const { week, daypower, daytemp, dayweather } = res;
      return (
        <div className="weakly-weather-item p-3" key={index}>
          <p className="mb-1">{weekName[Number(week - 1)]}</p>
          {this.getWeatherIcon(dayweather)}
          <p className="mb-0">{daypower + '℃ - ' + daytemp + '℃'}</p>
        </div>
      );
    });

    return (
      <Card bordered={false} className="weather-card" bodyStyle={bodyStyle} hoverable>
        <div className="weather-body">
          <div className="weather-date-location">
            <h2>{Moment().format('dddd')}</h2>
            <p className="text-muted">{Moment().format('DD MMMM, YYYY')} Amoy, China</p>
          </div>
          <div className="weather-data">
            <h1>{data[0] ? data[0].daypower + '℃ - ' + data[0].daytemp + '℃' : ''}</h1>
          </div>
        </div>
        <div className="weakly-weather">{WeatherItem}</div>
      </Card>
    );
  }
}

export default Weather;
