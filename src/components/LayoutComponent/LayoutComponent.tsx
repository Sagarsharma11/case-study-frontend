import React, { ReactNode } from 'react';
import styles from "./LayoutComponent.module.css"

type Props = {
    children: ReactNode; // This type allows any valid React children (JSX, strings, numbers, etc.)
};

const LayoutComponent: React.FC<Props> = ({ children }) => {
    return <div className={styles["layout--container"]}>{children}</div>;
};

export default LayoutComponent;
