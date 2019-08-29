import React from 'react';
import { Card, Icon, Avatar,Tag } from 'antd';
const { Meta } = Card;

const repositoryItem = props => {
return (
    <div style={{ background: '#ECECEC', padding: '30px' ,width:'100%'}}>
      <Card style={{ width: '100%' }} >
       <Meta
         avatar={<Avatar src={props.avatar} style={{ width: 100, height : 100 }}/>}
         title={props.name}
         description={props.description}
       />
       <Tag color="green">{props.stars} <Icon type="star" /></Tag>
       <Tag color="magenta">{props.issues} <Icon type="exclamation" /></Tag>
        <div className="owner-link"> Submitted by <a href={props.ownerUrl} > {props.ownerLogin} </a> </div>
      </Card>
    
   
  </div>
  
)
}

export default repositoryItem;
