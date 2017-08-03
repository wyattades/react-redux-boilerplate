import React from 'react';

// NOTE: look into 'fela' for inline styling
const style = {
  flex: 'auto', // Same as 'flex: 1' in ReactNative
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export default ({ children }) => (
  <div style={style}>{children}</div>
);