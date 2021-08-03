import React from "react";
import { Image, Typography } from "antd";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";


interface PropsType extends RouteComponentProps {
  id: string | number;
  size: "large" | "small";
  imageSrc: string;
  price: number | string;
  title: string;
}

const ProductImageComponent: React.FC<PropsType> = ({
  id,
  size,
  imageSrc,
  price,
  title,
  history,
  location,
  match
}) => {
  // console.log(history)
  // console.log(location)
  // console.log(match)
  return (
    //使用Link组件直接跳转
    <Link to={`detail/${id}`}>   
      {size === "large" ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ¥ {price} 起
        </Typography.Text>
      </div>
    </Link>
  );
};

//withRouter:使用高阶组件,获取路由,使当前组件可以使用路由跳转
export const ProductImage = withRouter(ProductImageComponent);