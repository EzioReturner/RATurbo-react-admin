import React, { Component } from 'react';
import { Card } from 'antd';
import './index.scss';
const { Meta } = Card;

class Gallery extends Component {
	render() {
		const imgs = [
			'http://img.hb.aicdn.com/1d59f880cfe72be68c6b538e510bc2536240fb67f2f7-HOfVCS_/fw/480',
			'http://img.hb.aicdn.com/2b66da89a997889d0b27bf836a2cb168bd0323c9570f8-VYtaMq_/fw/480',
			'http://img.hb.aicdn.com/3f3e9d0e52cc70117ae7ef4eaf2e4e8706e9e8e49e16e-fuviHX_/fw/480',
			'http://img.hb.aicdn.com/85fb72139dad410db4e41f5a3b80123695d9e7ea5c3b2-GmO3jd_/fw/480',
			'http://img.hb.aicdn.com/5280b0fa6ebf87258d7caadd89e5cb158ae9bff56448a-VA7OAU_/fw/480',
			'http://img.hb.aicdn.com/a0bf3eabd12259e2843b9d5048210306e6ee5d0ebd80d-QVaKSH_/fw/480',
			'http://img.hb.aicdn.com/211064ac63629660d13bee2161893d2d8c36f572a5235-mPaKLc_/fw/480',
			'http://img.hb.aicdn.com/9d567aca4ad10ca303d44ec70abadb33c236422b88dd1-CLjO49_/fw/480',
			'http://img.hb.aicdn.com/3b6bd8fcdf66b2a56018f3d5ec9dbe8f2791f81fa7633-6tpMWU_/fw/480',
			'http://img.hb.aicdn.com/998ebf0831d6965bae3c39b7b51b97bd0e1a03d03635e-upmllo_/fw/480',
			'http://img.hb.aicdn.com/bb8b160f93222df21e1a0b0bb4d907f326c7d1871bc0e-PBniYB_/fw/480',
			'http://img.hb.aicdn.com/2704a770db4cd56f61a6ecae969117fcba29d62ec063-TyX97y_/fw/480',
			'http://img.hb.aicdn.com/04f97d38cae2fbf2a754ca3b9fbb65c94d359f34c0540-dIpoIr_/fw/480',
			'http://img.hb.aicdn.com/8a725a7e697d07bf8a6ddffd8a437625854f3f932d8014-7zGbmd_/fw/480',
			'http://img.hb.aicdn.com/2921a2071e0df110afcf1ae2f2e6e7f00e61f3c1257b9-43mmaP_/fw/480',
			'http://img.hb.aicdn.com/fd43d18d49ad53dc86f7c956e718346e646f437342d34-WQ1i3f_/fw/480',
			'http://img.hb.aicdn.com/66694703a74923b73bfc4338b2290da06bfedf151cc9e4-DWVYtM_/fw/480',
			'http://img.hb.aicdn.com/43aa12e38c8bc2d9c633832607a46951e50d14f88d89f-hx4oGH_/fw/480',
			'http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_/fw/480',
			'http://img.hb.aicdn.com/19c8d99a4f2ff731965d6ec273509e803efc3384fd393-mIUSzI_/fw/480',
			'http://img.hb.aicdn.com/b9027869cf7b1618017fca22b13ac3bf686504e31f591-JLdK4K_/fw/480',
			'http://img.hb.aicdn.com/8ffeb4cfe083b3f46b1235dc477d82a0324670103c77c5-ELlneh_/fw/480',
			'http://img.hb.aicdn.com/47febba606b0268159dcf9f90de8de96add4a1f45729e-VEVfZj_/fw/480',
			'http://img.hb.aicdn.com/0ed292c9e9fe9bcf47a45d49c2151214c2974686432ea-clucnp_/fw/480',
			'http://img.hb.aicdn.com/3dcf42e53bb744d2f890608f0b4864aa5012256512723b-elGNpS_/fw/480'
		];
		return (
			<div className="gallery">
				<div className="masonry">
					{imgs.map((res, i) => {
						return (
							<div className="item" key={i}>
								<Card hoverable cover={<img alt="example" src={res} />}>
									<Meta
										title="RA ADMIN"
										description={
											<a
												href="https://github.com/EzioReturner"
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
