import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class UnDistroDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <div className="backgroundDefault responsiveScreenHeight">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default UnDistroDocument;
