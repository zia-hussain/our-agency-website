import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

type HelmetContext = {
  helmet?: {
    title: { toString: () => string };
    meta: { toString: () => string };
    link: { toString: () => string };
    script: { toString: () => string };
  };
};

export const render = (url: string) =>
  new Promise<{ html: string; head: string }>((resolve, reject) => {
    const helmetContext: HelmetContext = {};
    let output = "";
    let complete = false;
    let renderError: unknown;

    const timeout = setTimeout(() => {
      if (!complete) {
        stream.abort();
        reject(new Error(`Timed out while pre-rendering ${url}`));
      }
    }, 10000);

    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          const destination = new Writable({
            write(chunk, _encoding, callback) {
              output += chunk.toString();
              callback();
            },
          });

          destination.on("finish", () => {
            complete = true;
            clearTimeout(timeout);
            if (renderError) {
              reject(renderError);
              return;
            }
            const helmet = helmetContext.helmet;
            const head = helmet
              ? [
                  helmet.title.toString(),
                  helmet.meta.toString(),
                  helmet.link.toString(),
                  helmet.script.toString(),
                ].join("\n")
              : "";

            resolve({ html: output, head });
          });
          destination.on("error", reject);
          stream.pipe(destination);
        },
        onShellError(error) {
          complete = true;
          clearTimeout(timeout);
          reject(error);
        },
        onError(error) {
          renderError = renderError ?? error;
          console.error(`Pre-render error for ${url}:`, error);
        },
      },
    );
  });
