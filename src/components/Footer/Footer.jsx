

import React from 'react';
import styles from './Footer.module.scss';

function AppFooter() {
  return (
    <div className={styles.footerBar}>
      <span className={styles.copyright}>
        &copy; {new Date().getFullYear()} Calendar App. Rights reserved.
      </span>
    </div>
  );
}

export default AppFooter;

