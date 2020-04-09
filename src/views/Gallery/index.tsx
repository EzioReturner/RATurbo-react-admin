import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from 'antd';
import './index.scss';

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

// class Gallery extends React.Component<{}, GalleryState> {
//   state = {
//     data: []
//   };

//   componentDidMount() {
//     this.initImg();
//   }

//   initImg() {
//     const data = [];
//     for (let index = 1; index < 26; index++) {
//       data.push({
//         img: import(`../../assets/image/gallery/${index}.webp`).then(res => {
//           this.setOnload(index - 1, res.default);
//         }),
//         loading: true
//       });
//     }
//     this.setState({
//       data: data
//     });
//   }

//   setOnload(index: number, img: any) {
//     const data: any[] = this.state.data;
//     data[index].loading = false;
//     data[index].img = img;
//     this.setState({
//       data: data
//     });
//   }

//   render() {
//     const { data } = this.state;
//     return (
//       <div className="gallery">
//         <div className="masonry">
//           {data.map((res: any, i: number) => {
//             return (
//               <div className="item" key={i}>
//                 <Card
//                   hoverable
//                   cover={
//                     <Skeleton loading={res.loading} active avatar>
//                       <img alt="example" src={res.img} style={{ minHeight: '250px' }} />
//                     </Skeleton>
//                   }
//                 >
//                   <Meta
//                     title="RA ADMIN"
//                     description={
//                       <a
//                         href="https://github.com/EzioReturner"
//                         rel="noopener noreferrer"
//                         target="_blank"
//                         style={{ color: 'unset' }}
//                       >
//                         https://github.com/EzioReturner
//                       </a>
//                     }
//                   />
//                 </Card>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

export default Gallery;
