import * as webpack from "webpack";

declare namespace nodemon {
  type Plugin = webpack.Plugin;

  interface WebpackPlugin {
    new (option?: Options): Plugin;
  }
  interface Options {
    env?: { [key: string]: string | boolean | number };
    script?: string;
    ext?: string;
    exec?: string;
    watch?: string[];
    ignore?: string[];
    quiet?: boolean;
    verbose?: boolean;
    stdin?: boolean;
    stdout?: boolean;
    runOnChangeOnly?: boolean;
    delay?: number;
    legacyWatch?: boolean;
    exitcrash?: boolean;
    execMap?: { [key: string]: string | boolean | number };
    events?: { [key: string]: string };
    restartable?: string;
    args?: string[];
    nodeArgs?: string[];
    scriptPosition?: number;
  }
}

export default nodemon;
