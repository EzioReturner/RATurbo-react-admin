import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { getProjectList } from '@api/platform';
import FormatterLocale from '@components/FormatterLocale';

class PlatformProject extends PureComponent {
  state = {
    projectList: []
  };

  randomNumber(min = 2, max = 5) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  componentDidMount() {
    getProjectList().then((res: any) => {
      this.setState({
        projectList: res.data.data
      });
    });
  }

  render() {
    const { projectList } = this.state;
    return (
      <Card
        title={<FormatterLocale id="platform.projectList" />}
        className="fat-card"
        bordered={false}
        bodyStyle={{
          padding: '14px'
        }}
      >
        <div className="project-list">
          {projectList.map(({ name, detail, domain, time }, index) => {
            return (
              <div key={index} className="projectInfo">
                <div className="top">
                  <p className={time ? 'triangle' : 'rect'}>{name}</p>
                  <span>{detail}</span>
                </div>
                <div className="bottom">
                  <span className="domain">{domain}</span>
                  <span className="time">
                    {`${this.randomNumber()} ${time ? 'years' : 'day'} ago`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
}

export default PlatformProject;
