import React from 'react';
import styles from './styles.css';

import parentToChild from './images/parent-to-child.png';
import childToParent from './images/child-to-parent.png';
import siblingToSibling from './images/sibling-to-sibling.png';
import anyToAny from './images/any-to-any.png';

const items = [
    {
        title: 'Parent to Child',
        src: parentToChild,
        strategies: [
            'props',
            'Instance Methods'
        ]
    },
    {
        title: 'Child to Parent',
        src: childToParent,
        strategies: [
            'Callback Functions',
        ]
    },
    {
        title: 'Sibling to Sibling',
        src: siblingToSibling,
        strategies: [
            'Lifting State Up (Instance Methods)',
        ]
    },
    {
        title: 'Any to Any',
        src: anyToAny,
        strategies: [
            'Observer Pattern (EventEmitter for example)',
            'Redux',
            'MobX',
            'Context (are you sure?)',
        ]
    },
]

const Strategies = ({list}) => (
    <ul>
        {list.map((strategy, id) =>
            <li key={id}>{strategy}</li>
        )}
    </ul>
)

const Navigation = () => (
    <nav className={styles.nav}>
        {items.map((item, id) =>
            <section key={id} className={styles.item}>
                <img src={item.src} className={styles.image} />
                <h4 className={styles.title}>{item.title}</h4>
                {item.strategies && <Strategies list={item.strategies} />}
            </section>
        )}
    </nav>
)

export default Navigation;