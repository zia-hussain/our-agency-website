import "react";

// React 18 forwards this standard HTML attribute in its lowercase form.
// Its DOM typings only include the later React fetchPriority spelling.
declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}
