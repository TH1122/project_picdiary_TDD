import React from 'react';

import  PicAdd  from '../UI_components/PicAdd'

export default {
    title: 'Example/PicAdd',
    component: PicAdd
  };
  
  const Template = (args) => <PicAdd {...args} />;
  
  export const Primary = Template.bind({});
  Primary.args = {
    primary: true,
    label: 'PicAdd'
  };
  