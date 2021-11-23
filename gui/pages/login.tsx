import type { NextPage } from "next";
import classes from "./login.module.css";

type Props = {};

const Login: NextPage = (props: Props) => {
  return (
    <>
      <div className={classes.loginPageContainer}>
        <div className={classes.contentTab}>
          <div className={classes.contentTabProviders}>
            <div className={classes.contentTabLogo}>
              <img src="/img/logoUnDistroLogin.svg" />
            </div>

            <div className={classes.providersSelection}>
              <div className={classes.selectProviderText}>Sign in with</div>

              <div className={classes.providersContainer}>
                <div className={classes.providersIconContainer}>
                  <div className={classes.providerText}>Google</div>
                  <div className={classes.providerGoogle}></div>
                </div>

                <div className={classes.providersIconContainer}>
                  <div className={classes.providerText}>Amazon</div>
                  <div className={classes.providerAmazon}></div>
                </div>

                <div className={classes.providersIconContainer}>
                  <div className={classes.providerText}>Microsoft</div>
                  <div className={classes.providerMicrosoft}></div>
                </div>

                <div className={classes.providersIconContainer}>
                  <div className={classes.providerText}>Github</div>
                  <div className={classes.providerGithub}></div>
                </div>

                <div className={classes.providersIconContainer}>
                  <div className={classes.providerText}>Gitlab</div>
                  <div className={classes.providerGitlab}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.contentTabFooter}>
            <img src="./img/backedByGetup.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
