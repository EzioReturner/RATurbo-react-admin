import React from 'react';
import { Card } from 'antd';
import EchartsReact from '@components/Echarts';
import getWordCloud from '@api/analysis';
import { wordCloudChart } from '@assets/chartOption';
import FormatterLocale from '@components/FormatterLocale';

interface ProportionState {
  data: any;
}

class Proportion extends React.Component<{}, ProportionState> {
  state = {
    data: wordCloudChart()
  };

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const data = await getWordCloud();
    const option = wordCloudChart(data.data.data);
    this.setState({
      data: option
    });
  }

  render() {
    const { data } = this.state;
    return (
      <Card
        hoverable
        bordered={false}
        title={<FormatterLocale id="monitor.proportion" defaultMessage="热搜词云" />}
        className="fat-card"
        style={{ marginBottom: '24px' }}
      >
        <EchartsReact option={data} style={{ height: '200px' }} />
      </Card>
    );
  }
}

export default Proportion;
