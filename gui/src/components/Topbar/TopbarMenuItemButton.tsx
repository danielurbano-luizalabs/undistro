import styles from "./TopbarMenuItemButton.module.css";

type Props = {
  id: string;
  children?: React.ReactNode;
  title: string;
};

const TopbarMenuItemButton = (props: Props) => {
  return (
    <>
      <div
        id={props.id}
        title={props.title}
        className={styles.menuTopItemButton}
      >
        <div className={styles.menuTopItemTab}></div>
        <div className={styles.menuTopItemTextArea}>
          <div className={styles.menuTopItemText}>{props.title}</div>
        </div>
      </div>
    </>
  );
};

export default TopbarMenuItemButton;
