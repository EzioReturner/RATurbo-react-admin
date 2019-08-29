import React, { PureComponent } from 'react';
import { Card } from 'antd';
import FormatterLocale from '@components/FormatterLocale';

class TeamCard extends PureComponent {
  render() {
    const data = ['amoy avenger', 'soul tango', 'we are Groot'];
    return (
      <Card
        title={<FormatterLocale id="platform.teamCard" />}
        className="fat-card"
        bordered={false}
      >
        <div className="team-card">
          {data.map((res, index) => {
            return (
              <div className="team-card-detail" key={index}>
                <p>{res}</p>
                <span>project:{Math.floor(Math.random() * -9 + 10)}</span>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
}

export default TeamCard;
