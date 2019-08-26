import React, { useState } from 'react';
import { List } from 'semantic-ui-react';
import styles from './styles.module.css';

const HierarchyList = props => {
  const [list, setList] = useState(
    props.list.map(item => ({
      ...item,
      open: item.open || false,
      children: item.children.map(child => ({
        ...child,
        open: child.open || false
      }))
    }))
  );
  const [active, setActive] = useState(0);
  return (
    <List>
      {list.map(item => (
        <List.Item key={item.id}>
          <List.Icon
            name={`${item.open ? 'caret down' : 'caret right'}`}
          ></List.Icon>
          <List.Content>
            <List.Header
              className={styles.item}
              onClick={() =>
                setList(
                  list.map(itemSelected => {
                    if (itemSelected.id === item.id) {
                      return {
                        ...itemSelected,
                        open: !itemSelected.open
                      };
                    }
                    return itemSelected;
                  })
                )
              }
            >
              {item.name}
            </List.Header>
            {item.open &&
              item.children.map(child => (
                <List.List key={child.id}>
                  <List.Item>
                    <List.Content>
                      <List.Header
                        className={`${styles.child} ${
                          child.id === active ? styles.activeChild : ''
                        } `}
                        onClick={() => {
                          props.onChange && props.onChange(child.id);
                          setActive(child.id);
                          console.log(active);
                        }}
                      >
                        {child.name}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                </List.List>
              ))}
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default HierarchyList;
