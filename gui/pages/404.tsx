import * as React from "react";
import classes from "./page404.module.css";

type Props = {};

const Page404 = (props: Props) => {
    let page404MainTextLine1UpperCase = [classes.page404MainTextLine1, "upperCase"].join(" ");
    let page404MainTextLine2UpperCase = [classes.page404MainTextLine2, "upperCase"].join(" ");
    let page404SecondaryTextLine1UpperCase = [classes.page404SecondaryTextLine1, "upperCase"].join(" ");
    let page404SecondaryTextLine2UpperCase = [classes.page404SecondaryTextLine2, "upperCase"].join(" ");
    return (
        <>

<div className={classes.page404Container}>

    <div className={classes.page404logoContainer}>

        <div className={classes.page404logo}></div>

    </div>

    <div className={classes.page404messageContainer}>

        <div className={classes.page404MonitorMessage}></div>

        <div className={page404MainTextLine1UpperCase}>
            it seems that one of our
        </div>
        <div className={page404MainTextLine2UpperCase}>
            trainees screwed up again...
        </div>

        <div className={page404SecondaryTextLine1UpperCase}>
            you can go to the <a>home page</a> while
        </div>
        <div className={page404SecondaryTextLine2UpperCase}>
            we look for someone to blame
        </div>

    </div>

</div>

        </>
    );
}

export default Page404;