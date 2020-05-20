import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from 'antd';
import './index.less';

const { Meta } = Card;
const Gallery: React.FC = () => {
  const [urlList, setList] = useState<{ [name: string]: any }>({});

  useEffect(() => {
    initUrl();
  }, []);

  function initUrl() {
    for (let index = 1; index < 26; index++) {
      import(`../../assets/image/gallery/${index}.webp`).then(res => {
        setList(preList => ({ ...preList, [index]: res.default }));
      });
    }
  }

  return (
    <div className="gallery">
      <div className="masonry">
        {Array(25)
          .fill(1)
          .map((item: number, i: number) => {
            return (
              <div className="item" key={i}>
                <Card
                  hoverable
                  cover={
                    <Skeleton loading={urlList[i + 1] ? false : true} active avatar>
                      <img alt="example" src={urlList[i + 1]} style={{ minHeight: '250px' }} />
                    </Skeleton>
                  }
                >
                  <Meta
                    title="RA ADMIN"
                    description={
                      <a
                        href="https://github.com/EzioReturner"
                        rel="noopener noreferrer"
                        target="_blank"
                        style={{ color: 'unset' }}
                      >
                        https://github.com/EzioReturner
                      </a>
                    }
                  />
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
