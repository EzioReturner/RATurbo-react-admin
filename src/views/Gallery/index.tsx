import React from 'react';
import { Card, Skeleton } from 'antd';
import './index.scss';

interface GalleryState {
  data: any[];
}

const { Meta } = Card;
class Gallery extends React.Component<{}, GalleryState> {
  state = {
    data: []
  };

  componentDidMount() {
    this.initImg();
  }

  initImg() {
    const data = [];
    for (let index = 1; index < 26; index++) {
      data.push({
        img: import(`../../assets/image/gallery/${index}.webp`).then(res => {
          this.setOnload(index - 1, res.default);
        }),
        loading: true
      });
    }
    this.setState({
      data: data
    });
  }

  setOnload(index: number, img: any) {
    const data: any[] = this.state.data;
    data[index].loading = false;
    data[index].img = img;
    this.setState({
      data: data
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="gallery">
        <div className="masonry">
          {data.map((res: any, i: number) => {
            return (
              <div className="item" key={i}>
                <Card
                  hoverable
                  cover={
                    <Skeleton loading={res.loading} active avatar>
                      <img alt="example" src={res.img} style={{ minHeight: '250px' }} />
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
  }
}

export default Gallery;
