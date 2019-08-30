import React from 'react';
import { Card, Icon, Avatar,Tag } from 'antd';
import Moment from 'moment';


const { Meta } = Card;

const repositoryItem = props => {


   return (
    <div className="gr-item">
      <Card className="gr-item__card" >
       <Meta
         avatar={<Avatar src={props.avatar} className="gr-item__card--avatar"/>}
         title={props.name}
         description={props.description}
       />
       <Tag color="green">{props.stars} <Icon type="star" /></Tag>
       <Tag color="magenta">{props.issues} <Icon type="exclamation" /></Tag>
       <div className="gr-item__card--owner"> Submitted <span className="gr-item__card--time">{Moment(props.createdAt).fromNow()} </span> by <a href={props.ownerUrl} > {props.ownerLogin} </a> </div>
      </Card>
    
   
  </div>
  
)
}

export default repositoryItem;
