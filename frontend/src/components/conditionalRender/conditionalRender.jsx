import React from 'react';

const ConditionalRender = ({ shouldRender, children }) => shouldRender ? children : <></>;

export default ConditionalRender;
