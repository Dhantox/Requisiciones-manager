import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

export default ({ leftItems, rightItems, backButtonVisible, backCallback }) => {
  const [activeItem, setActiveItem] = useState('home');
  let leftItemsVisible = null;
  if (backButtonVisible) {
    leftItemsVisible = (
      <Menu.Item
        key={0}
        name="back"
        active={false}
        onClick={() => backCallback()}
      />
    );
  } else {
    leftItemsVisible = leftItems.map(item => (
      <Menu.Item
        key={item.id}
        name={item.name}
        active={activeItem === item.name}
        onClick={() => {
          setActiveItem(item.name);
          item.onClick && item.onClick();
        }}
      >
        Dashboard
      </Menu.Item>
    ));
  }
  return (
    <Menu pointing secondary>
      {leftItemsVisible}
      <Menu.Menu position="right">
        {rightItems.map(item => (
          <Menu.Item
            key={item.id}
            name={item.name}
            active={activeItem === item.name}
            onClick={() => {
              setActiveItem(item.name);
              item.onClick && item.onClick();
            }}
          >
            {item.content}
          </Menu.Item>
        ))}
      </Menu.Menu>
    </Menu>
  );
};
