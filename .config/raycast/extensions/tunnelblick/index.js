"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/isexe/windows.js
var require_windows = __commonJS({
  "node_modules/isexe/windows.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs = require("fs");
    function checkPathExt(path, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path, options);
    }
    function isexe(path, options, cb) {
      fs.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path, options));
      });
    }
    function sync(path, options) {
      return checkStat(fs.statSync(path), path, options);
    }
  }
});

// node_modules/isexe/mode.js
var require_mode = __commonJS({
  "node_modules/isexe/mode.js"(exports, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs = require("fs");
    function isexe(path, options, cb) {
      fs.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path, options) {
      return checkStat(fs.statSync(path), options);
    }
    function checkStat(stat, options) {
      return stat.isFile() && checkMode(stat, options);
    }
    function checkMode(stat, options) {
      var mod = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
      var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
      var u = parseInt("100", 8);
      var g = parseInt("010", 8);
      var o = parseInt("001", 8);
      var ug = u | g;
      var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// node_modules/isexe/index.js
var require_isexe = __commonJS({
  "node_modules/isexe/index.js"(exports, module2) {
    var fs = require("fs");
    var core;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core = require_windows();
    } else {
      core = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve, reject) {
          isexe(path, options || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve(is);
            }
          });
        });
      }
      core(path, options || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path, options) {
      try {
        return core.sync(path, options || {});
      } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
  }
});

// node_modules/which/which.js
var require_which = __commonJS({
  "node_modules/which/which.js"(exports, module2) {
    var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path = require("path");
    var COLON = isWindows ? ";" : ":";
    var isexe = require_isexe();
    var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
    var getPathInfo = (cmd, opt) => {
      const colon = opt.colon || COLON;
      const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
        ...isWindows ? [process.cwd()] : [],
        ...(opt.path || process.env.PATH || "").split(colon)
      ];
      const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
      const pathExt = isWindows ? pathExtExe.split(colon) : [""];
      if (isWindows) {
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      return {
        pathEnv,
        pathExt,
        pathExtExe
      };
    };
    var which = (cmd, opt, cb) => {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      if (!opt)
        opt = {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      const step = (i) => new Promise((resolve, reject) => {
        if (i === pathEnv.length)
          return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve(subStep(p, i, 0));
      });
      const subStep = (p, i, ii) => new Promise((resolve, reject) => {
        if (ii === pathExt.length)
          return resolve(step(i + 1));
        const ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return resolve(p + ext);
          }
          return resolve(subStep(p, i, ii + 1));
        });
      });
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
    };
    var whichSync = (cmd, opt) => {
      opt = opt || {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (let i = 0; i < pathEnv.length; i++) {
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j = 0; j < pathExt.length; j++) {
          const cur = p + pathExt[j];
          try {
            const is = isexe.sync(cur, { pathExt: pathExtExe });
            if (is) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    };
    module2.exports = which;
    which.sync = whichSync;
  }
});

// node_modules/path-key/index.js
var require_path_key = __commonJS({
  "node_modules/path-key/index.js"(exports, module2) {
    "use strict";
    var pathKey = (options = {}) => {
      const environment = options.env || process.env;
      const platform = options.platform || process.platform;
      if (platform !== "win32") {
        return "PATH";
      }
      return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
    };
    module2.exports = pathKey;
    module2.exports.default = pathKey;
  }
});

// node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "node_modules/cross-spawn/lib/util/resolveCommand.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var which = require_which();
    var getPathKey = require_path_key();
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const env = parsed.options.env || process.env;
      const cwd = process.cwd();
      const hasCustomCwd = parsed.options.cwd != null;
      const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
      if (shouldSwitchCwd) {
        try {
          process.chdir(parsed.options.cwd);
        } catch (err) {
        }
      }
      let resolved;
      try {
        resolved = which.sync(parsed.command, {
          path: env[getPathKey({ env })],
          pathExt: withoutPathExt ? path.delimiter : void 0
        });
      } catch (e) {
      } finally {
        if (shouldSwitchCwd) {
          process.chdir(cwd);
        }
      }
      if (resolved) {
        resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    function resolveCommand(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    module2.exports = resolveCommand;
  }
});

// node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "node_modules/cross-spawn/lib/util/escape.js"(exports, module2) {
    "use strict";
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(\\*)"/g, '$1$1\\"');
      arg = arg.replace(/(\\*)$/, "$1$1");
      arg = `"${arg}"`;
      arg = arg.replace(metaCharsRegExp, "^$1");
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, "^$1");
      }
      return arg;
    }
    module2.exports.command = escapeCommand;
    module2.exports.argument = escapeArgument;
  }
});

// node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  "node_modules/shebang-regex/index.js"(exports, module2) {
    "use strict";
    module2.exports = /^#!(.*)/;
  }
});

// node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "node_modules/shebang-command/index.js"(exports, module2) {
    "use strict";
    var shebangRegex = require_shebang_regex();
    module2.exports = (string = "") => {
      const match = string.match(shebangRegex);
      if (!match) {
        return null;
      }
      const [path, argument] = match[0].replace(/#! ?/, "").split(" ");
      const binary = path.split("/").pop();
      if (binary === "env") {
        return argument;
      }
      return argument ? `${binary} ${argument}` : binary;
    };
  }
});

// node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "node_modules/cross-spawn/lib/util/readShebang.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      const buffer = Buffer.alloc(size);
      let fd;
      try {
        fd = fs.openSync(command, "r");
        fs.readSync(fd, buffer, 0, size, 0);
        fs.closeSync(fd);
      } catch (e) {
      }
      return shebangCommand(buffer.toString());
    }
    module2.exports = readShebang;
  }
});

// node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "node_modules/cross-spawn/lib/parse.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var resolveCommand = require_resolveCommand();
    var escape = require_escape();
    var readShebang = require_readShebang();
    var isWin = process.platform === "win32";
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    function detectShebang(parsed) {
      parsed.file = resolveCommand(parsed);
      const shebang = parsed.file && readShebang(parsed.file);
      if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand(parsed);
      }
      return parsed.file;
    }
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed;
      }
      const commandFile = detectShebang(parsed);
      const needsShell = !isExecutableRegExp.test(commandFile);
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
        parsed.command = path.normalize(parsed.command);
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [parsed.command].concat(parsed.args).join(" ");
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true;
      }
      return parsed;
    }
    function parse(command, args, options) {
      if (args && !Array.isArray(args)) {
        options = args;
        args = null;
      }
      args = args ? args.slice(0) : [];
      options = Object.assign({}, options);
      const parsed = {
        command,
        args,
        options,
        file: void 0,
        original: {
          command,
          args
        }
      };
      return options.shell ? parsed : parseNonShell(parsed);
    }
    module2.exports = parse;
  }
});

// node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "node_modules/cross-spawn/lib/enoent.js"(exports, module2) {
    "use strict";
    var isWin = process.platform === "win32";
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
      });
    }
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return;
      }
      const originalEmit = cp.emit;
      cp.emit = function(name, arg1) {
        if (name === "exit") {
          const err = verifyENOENT(arg1, parsed, "spawn");
          if (err) {
            return originalEmit.call(cp, "error", err);
          }
        }
        return originalEmit.apply(cp, arguments);
      };
    }
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawn");
      }
      return null;
    }
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
      return null;
    }
    module2.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError
    };
  }
});

// node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "node_modules/cross-spawn/index.js"(exports, module2) {
    "use strict";
    var cp = require("child_process");
    var parse = require_parse();
    var enoent = require_enoent();
    function spawn(command, args, options) {
      const parsed = parse(command, args, options);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    function spawnSync(command, args, options) {
      const parsed = parse(command, args, options);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    module2.exports = spawn;
    module2.exports.spawn = spawn;
    module2.exports.sync = spawnSync;
    module2.exports._parse = parse;
    module2.exports._enoent = enoent;
  }
});

// node_modules/strip-final-newline/index.js
var require_strip_final_newline = __commonJS({
  "node_modules/strip-final-newline/index.js"(exports, module2) {
    "use strict";
    module2.exports = (input) => {
      const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
      const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
      if (input[input.length - 1] === LF) {
        input = input.slice(0, input.length - 1);
      }
      if (input[input.length - 1] === CR) {
        input = input.slice(0, input.length - 1);
      }
      return input;
    };
  }
});

// node_modules/run-applescript/node_modules/npm-run-path/index.js
var require_npm_run_path = __commonJS({
  "node_modules/run-applescript/node_modules/npm-run-path/index.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var pathKey = require_path_key();
    var npmRunPath = (options) => {
      options = {
        cwd: process.cwd(),
        path: process.env[pathKey()],
        execPath: process.execPath,
        ...options
      };
      let previous;
      let cwdPath = path.resolve(options.cwd);
      const result = [];
      while (previous !== cwdPath) {
        result.push(path.join(cwdPath, "node_modules/.bin"));
        previous = cwdPath;
        cwdPath = path.resolve(cwdPath, "..");
      }
      const execPathDir = path.resolve(options.cwd, options.execPath, "..");
      result.push(execPathDir);
      return result.concat(options.path).join(path.delimiter);
    };
    module2.exports = npmRunPath;
    module2.exports.default = npmRunPath;
    module2.exports.env = (options) => {
      options = {
        env: process.env,
        ...options
      };
      const env = { ...options.env };
      const path2 = pathKey({ env });
      options.path = env[path2];
      env[path2] = module2.exports(options);
      return env;
    };
  }
});

// node_modules/mimic-fn/index.js
var require_mimic_fn = __commonJS({
  "node_modules/mimic-fn/index.js"(exports, module2) {
    "use strict";
    var mimicFn = (to, from) => {
      for (const prop of Reflect.ownKeys(from)) {
        Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
      }
      return to;
    };
    module2.exports = mimicFn;
    module2.exports.default = mimicFn;
  }
});

// node_modules/onetime/index.js
var require_onetime = __commonJS({
  "node_modules/onetime/index.js"(exports, module2) {
    "use strict";
    var mimicFn = require_mimic_fn();
    var calledFunctions = /* @__PURE__ */ new WeakMap();
    var onetime = (function_, options = {}) => {
      if (typeof function_ !== "function") {
        throw new TypeError("Expected a function");
      }
      let returnValue;
      let callCount = 0;
      const functionName = function_.displayName || function_.name || "<anonymous>";
      const onetime2 = function(...arguments_) {
        calledFunctions.set(onetime2, ++callCount);
        if (callCount === 1) {
          returnValue = function_.apply(this, arguments_);
          function_ = null;
        } else if (options.throw === true) {
          throw new Error(`Function \`${functionName}\` can only be called once`);
        }
        return returnValue;
      };
      mimicFn(onetime2, function_);
      calledFunctions.set(onetime2, callCount);
      return onetime2;
    };
    module2.exports = onetime;
    module2.exports.default = onetime;
    module2.exports.callCount = (function_) => {
      if (!calledFunctions.has(function_)) {
        throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
      }
      return calledFunctions.get(function_);
    };
  }
});

// node_modules/human-signals/build/src/core.js
var require_core = __commonJS({
  "node_modules/human-signals/build/src/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SIGNALS = void 0;
    var SIGNALS = [
      {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
      },
      {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
      },
      {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
      },
      {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
      },
      {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
      },
      {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
      },
      {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
      },
      {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
      },
      {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
      },
      {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
      },
      {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
      },
      {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
      },
      {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
      },
      {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
      },
      {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
      },
      {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
      },
      {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
      },
      {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
      },
      {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
      },
      {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
      },
      {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
      },
      {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
      },
      {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
      },
      {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
      },
      {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
      },
      {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
      },
      {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
      },
      {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
      },
      {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
      },
      {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
      },
      {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
      }
    ];
    exports.SIGNALS = SIGNALS;
  }
});

// node_modules/human-signals/build/src/realtime.js
var require_realtime = __commonJS({
  "node_modules/human-signals/build/src/realtime.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SIGRTMAX = exports.getRealtimeSignals = void 0;
    var getRealtimeSignals = function() {
      const length = SIGRTMAX - SIGRTMIN + 1;
      return Array.from({ length }, getRealtimeSignal);
    };
    exports.getRealtimeSignals = getRealtimeSignals;
    var getRealtimeSignal = function(value, index) {
      return {
        name: `SIGRT${index + 1}`,
        number: SIGRTMIN + index,
        action: "terminate",
        description: "Application-specific signal (realtime)",
        standard: "posix"
      };
    };
    var SIGRTMIN = 34;
    var SIGRTMAX = 64;
    exports.SIGRTMAX = SIGRTMAX;
  }
});

// node_modules/human-signals/build/src/signals.js
var require_signals = __commonJS({
  "node_modules/human-signals/build/src/signals.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSignals = void 0;
    var _os = require("os");
    var _core = require_core();
    var _realtime = require_realtime();
    var getSignals = function() {
      const realtimeSignals = (0, _realtime.getRealtimeSignals)();
      const signals = [..._core.SIGNALS, ...realtimeSignals].map(normalizeSignal);
      return signals;
    };
    exports.getSignals = getSignals;
    var normalizeSignal = function({
      name,
      number: defaultNumber,
      description,
      action,
      forced = false,
      standard
    }) {
      const {
        signals: { [name]: constantSignal }
      } = _os.constants;
      const supported = constantSignal !== void 0;
      const number = supported ? constantSignal : defaultNumber;
      return { name, number, description, supported, action, forced, standard };
    };
  }
});

// node_modules/human-signals/build/src/main.js
var require_main = __commonJS({
  "node_modules/human-signals/build/src/main.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.signalsByNumber = exports.signalsByName = void 0;
    var _os = require("os");
    var _signals = require_signals();
    var _realtime = require_realtime();
    var getSignalsByName = function() {
      const signals = (0, _signals.getSignals)();
      return signals.reduce(getSignalByName, {});
    };
    var getSignalByName = function(signalByNameMemo, { name, number, description, supported, action, forced, standard }) {
      return {
        ...signalByNameMemo,
        [name]: { name, number, description, supported, action, forced, standard }
      };
    };
    var signalsByName = getSignalsByName();
    exports.signalsByName = signalsByName;
    var getSignalsByNumber = function() {
      const signals = (0, _signals.getSignals)();
      const length = _realtime.SIGRTMAX + 1;
      const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals));
      return Object.assign({}, ...signalsA);
    };
    var getSignalByNumber = function(number, signals) {
      const signal = findSignalByNumber(number, signals);
      if (signal === void 0) {
        return {};
      }
      const { name, description, supported, action, forced, standard } = signal;
      return {
        [number]: {
          name,
          number,
          description,
          supported,
          action,
          forced,
          standard
        }
      };
    };
    var findSignalByNumber = function(number, signals) {
      const signal = signals.find(({ name }) => _os.constants.signals[name] === number);
      if (signal !== void 0) {
        return signal;
      }
      return signals.find((signalA) => signalA.number === number);
    };
    var signalsByNumber = getSignalsByNumber();
    exports.signalsByNumber = signalsByNumber;
  }
});

// node_modules/run-applescript/node_modules/execa/lib/error.js
var require_error = __commonJS({
  "node_modules/run-applescript/node_modules/execa/lib/error.js"(exports, module2) {
    "use strict";
    var { signalsByName } = require_main();
    var getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
      if (timedOut) {
        return `timed out after ${timeout} milliseconds`;
      }
      if (isCanceled) {
        return "was canceled";
      }
      if (errorCode !== void 0) {
        return `failed with ${errorCode}`;
      }
      if (signal !== void 0) {
        return `was killed with ${signal} (${signalDescription})`;
      }
      if (exitCode !== void 0) {
        return `failed with exit code ${exitCode}`;
      }
      return "failed";
    };
    var makeError = ({
      stdout,
      stderr,
      all,
      error,
      signal,
      exitCode,
      command,
      escapedCommand,
      timedOut,
      isCanceled,
      killed,
      parsed: { options: { timeout } }
    }) => {
      exitCode = exitCode === null ? void 0 : exitCode;
      signal = signal === null ? void 0 : signal;
      const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
      const errorCode = error && error.code;
      const prefix = getErrorPrefix({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled });
      const execaMessage = `Command ${prefix}: ${command}`;
      const isError = Object.prototype.toString.call(error) === "[object Error]";
      const shortMessage = isError ? `${execaMessage}
${error.message}` : execaMessage;
      const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
      if (isError) {
        error.originalMessage = error.message;
        error.message = message;
      } else {
        error = new Error(message);
      }
      error.shortMessage = shortMessage;
      error.command = command;
      error.escapedCommand = escapedCommand;
      error.exitCode = exitCode;
      error.signal = signal;
      error.signalDescription = signalDescription;
      error.stdout = stdout;
      error.stderr = stderr;
      if (all !== void 0) {
        error.all = all;
      }
      if ("bufferedData" in error) {
        delete error.bufferedData;
      }
      error.failed = true;
      error.timedOut = Boolean(timedOut);
      error.isCanceled = isCanceled;
      error.killed = killed && !timedOut;
      return error;
    };
    module2.exports = makeError;
  }
});

// node_modules/run-applescript/node_modules/execa/lib/stdio.js
var require_stdio = __commonJS({
  "node_modules/run-applescript/node_modules/execa/lib/stdio.js"(exports, module2) {
    "use strict";
    var aliases = ["stdin", "stdout", "stderr"];
    var hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
    var normalizeStdio = (options) => {
      if (!options) {
        return;
      }
      const { stdio } = options;
      if (stdio === void 0) {
        return aliases.map((alias) => options[alias]);
      }
      if (hasAlias(options)) {
        throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
      }
      if (typeof stdio === "string") {
        return stdio;
      }
      if (!Array.isArray(stdio)) {
        throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
      }
      const length = Math.max(stdio.length, aliases.length);
      return Array.from({ length }, (value, index) => stdio[index]);
    };
    module2.exports = normalizeStdio;
    module2.exports.node = (options) => {
      const stdio = normalizeStdio(options);
      if (stdio === "ipc") {
        return "ipc";
      }
      if (stdio === void 0 || typeof stdio === "string") {
        return [stdio, stdio, stdio, "ipc"];
      }
      if (stdio.includes("ipc")) {
        return stdio;
      }
      return [...stdio, "ipc"];
    };
  }
});

// node_modules/signal-exit/signals.js
var require_signals2 = __commonJS({
  "node_modules/signal-exit/signals.js"(exports, module2) {
    module2.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ];
    if (process.platform !== "win32") {
      module2.exports.push(
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
      );
    }
    if (process.platform === "linux") {
      module2.exports.push(
        "SIGIO",
        "SIGPOLL",
        "SIGPWR",
        "SIGSTKFLT",
        "SIGUNUSED"
      );
    }
  }
});

// node_modules/signal-exit/index.js
var require_signal_exit = __commonJS({
  "node_modules/signal-exit/index.js"(exports, module2) {
    var process3 = global.process;
    var processOk = function(process4) {
      return process4 && typeof process4 === "object" && typeof process4.removeListener === "function" && typeof process4.emit === "function" && typeof process4.reallyExit === "function" && typeof process4.listeners === "function" && typeof process4.kill === "function" && typeof process4.pid === "number" && typeof process4.on === "function";
    };
    if (!processOk(process3)) {
      module2.exports = function() {
      };
    } else {
      assert = require("assert");
      signals = require_signals2();
      isWin = /^win/i.test(process3.platform);
      EE = require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      if (process3.__signal_exit_emitter__) {
        emitter = process3.__signal_exit_emitter__;
      } else {
        emitter = process3.__signal_exit_emitter__ = new EE();
        emitter.count = 0;
        emitter.emitted = {};
      }
      if (!emitter.infinite) {
        emitter.setMaxListeners(Infinity);
        emitter.infinite = true;
      }
      module2.exports = function(cb, opts) {
        if (!processOk(global.process)) {
          return;
        }
        assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
        if (loaded === false) {
          load();
        }
        var ev = "exit";
        if (opts && opts.alwaysLast) {
          ev = "afterexit";
        }
        var remove = function() {
          emitter.removeListener(ev, cb);
          if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
            unload();
          }
        };
        emitter.on(ev, cb);
        return remove;
      };
      unload = function unload2() {
        if (!loaded || !processOk(global.process)) {
          return;
        }
        loaded = false;
        signals.forEach(function(sig) {
          try {
            process3.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process3.emit = originalProcessEmit;
        process3.reallyExit = originalProcessReallyExit;
        emitter.count -= 1;
      };
      module2.exports.unload = unload;
      emit = function emit2(event, code, signal) {
        if (emitter.emitted[event]) {
          return;
        }
        emitter.emitted[event] = true;
        emitter.emit(event, code, signal);
      };
      sigListeners = {};
      signals.forEach(function(sig) {
        sigListeners[sig] = function listener() {
          if (!processOk(global.process)) {
            return;
          }
          var listeners = process3.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process3.kill(process3.pid, sig);
          }
        };
      });
      module2.exports.signals = function() {
        return signals;
      };
      loaded = false;
      load = function load2() {
        if (loaded || !processOk(global.process)) {
          return;
        }
        loaded = true;
        emitter.count += 1;
        signals = signals.filter(function(sig) {
          try {
            process3.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process3.emit = processEmit;
        process3.reallyExit = processReallyExit;
      };
      module2.exports.load = load;
      originalProcessReallyExit = process3.reallyExit;
      processReallyExit = function processReallyExit2(code) {
        if (!processOk(global.process)) {
          return;
        }
        process3.exitCode = code || 0;
        emit("exit", process3.exitCode, null);
        emit("afterexit", process3.exitCode, null);
        originalProcessReallyExit.call(process3, process3.exitCode);
      };
      originalProcessEmit = process3.emit;
      processEmit = function processEmit2(ev, arg) {
        if (ev === "exit" && processOk(global.process)) {
          if (arg !== void 0) {
            process3.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process3.exitCode, null);
          emit("afterexit", process3.exitCode, null);
          return ret;
        } else {
          return originalProcessEmit.apply(this, arguments);
        }
      };
    }
    var assert;
    var signals;
    var isWin;
    var EE;
    var emitter;
    var unload;
    var emit;
    var sigListeners;
    var loaded;
    var load;
    var originalProcessReallyExit;
    var processReallyExit;
    var originalProcessEmit;
    var processEmit;
  }
});

// node_modules/run-applescript/node_modules/execa/lib/kill.js
var require_kill = __commonJS({
  "node_modules/run-applescript/node_modules/execa/lib/kill.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var onExit = require_signal_exit();
    var DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
    var spawnedKill = (kill, signal = "SIGTERM", options = {}) => {
      const killResult = kill(signal);
      setKillTimeout(kill, signal, options, killResult);
      return killResult;
    };
    var setKillTimeout = (kill, signal, options, killResult) => {
      if (!shouldForceKill(signal, options, killResult)) {
        return;
      }
      const timeout = getForceKillAfterTimeout(options);
      const t = setTimeout(() => {
        kill("SIGKILL");
      }, timeout);
      if (t.unref) {
        t.unref();
      }
    };
    var shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => {
      return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
    };
    var isSigterm = (signal) => {
      return signal === os.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
    };
    var getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
      if (forceKillAfterTimeout === true) {
        return DEFAULT_FORCE_KILL_TIMEOUT;
      }
      if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
        throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
      }
      return forceKillAfterTimeout;
    };
    var spawnedCancel = (spawned, context) => {
      const killResult = spawned.kill();
      if (killResult) {
        context.isCanceled = true;
      }
    };
    var timeoutKill = (spawned, signal, reject) => {
      spawned.kill(signal);
      reject(Object.assign(new Error("Timed out"), { timedOut: true, signal }));
    };
    var setupTimeout = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
      if (timeout === 0 || timeout === void 0) {
        return spawnedPromise;
      }
      let timeoutId;
      const timeoutPromise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
          timeoutKill(spawned, killSignal, reject);
        }, timeout);
      });
      const safeSpawnedPromise = spawnedPromise.finally(() => {
        clearTimeout(timeoutId);
      });
      return Promise.race([timeoutPromise, safeSpawnedPromise]);
    };
    var validateTimeout = ({ timeout }) => {
      if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
        throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
      }
    };
    var setExitHandler = async (spawned, { cleanup, detached }, timedPromise) => {
      if (!cleanup || detached) {
        return timedPromise;
      }
      const removeExitHandler = onExit(() => {
        spawned.kill();
      });
      return timedPromise.finally(() => {
        removeExitHandler();
      });
    };
    module2.exports = {
      spawnedKill,
      spawnedCancel,
      setupTimeout,
      validateTimeout,
      setExitHandler
    };
  }
});

// node_modules/run-applescript/node_modules/is-stream/index.js
var require_is_stream = __commonJS({
  "node_modules/run-applescript/node_modules/is-stream/index.js"(exports, module2) {
    "use strict";
    var isStream = (stream) => stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
    isStream.writable = (stream) => isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
    isStream.readable = (stream) => isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
    isStream.duplex = (stream) => isStream.writable(stream) && isStream.readable(stream);
    isStream.transform = (stream) => isStream.duplex(stream) && typeof stream._transform === "function";
    module2.exports = isStream;
  }
});

// node_modules/run-applescript/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS({
  "node_modules/run-applescript/node_modules/get-stream/buffer-stream.js"(exports, module2) {
    "use strict";
    var { PassThrough: PassThroughStream } = require("stream");
    module2.exports = (options) => {
      options = { ...options };
      const { array } = options;
      let { encoding } = options;
      const isBuffer = encoding === "buffer";
      let objectMode = false;
      if (array) {
        objectMode = !(encoding || isBuffer);
      } else {
        encoding = encoding || "utf8";
      }
      if (isBuffer) {
        encoding = null;
      }
      const stream = new PassThroughStream({ objectMode });
      if (encoding) {
        stream.setEncoding(encoding);
      }
      let length = 0;
      const chunks = [];
      stream.on("data", (chunk) => {
        chunks.push(chunk);
        if (objectMode) {
          length = chunks.length;
        } else {
          length += chunk.length;
        }
      });
      stream.getBufferedValue = () => {
        if (array) {
          return chunks;
        }
        return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
      };
      stream.getBufferedLength = () => length;
      return stream;
    };
  }
});

// node_modules/run-applescript/node_modules/get-stream/index.js
var require_get_stream = __commonJS({
  "node_modules/run-applescript/node_modules/get-stream/index.js"(exports, module2) {
    "use strict";
    var { constants: BufferConstants } = require("buffer");
    var stream = require("stream");
    var { promisify } = require("util");
    var bufferStream = require_buffer_stream();
    var streamPipelinePromisified = promisify(stream.pipeline);
    var MaxBufferError = class extends Error {
      constructor() {
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
      }
    };
    async function getStream(inputStream, options) {
      if (!inputStream) {
        throw new Error("Expected a stream");
      }
      options = {
        maxBuffer: Infinity,
        ...options
      };
      const { maxBuffer } = options;
      const stream2 = bufferStream(options);
      await new Promise((resolve, reject) => {
        const rejectPromise = (error) => {
          if (error && stream2.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
            error.bufferedData = stream2.getBufferedValue();
          }
          reject(error);
        };
        (async () => {
          try {
            await streamPipelinePromisified(inputStream, stream2);
            resolve();
          } catch (error) {
            rejectPromise(error);
          }
        })();
        stream2.on("data", () => {
          if (stream2.getBufferedLength() > maxBuffer) {
            rejectPromise(new MaxBufferError());
          }
        });
      });
      return stream2.getBufferedValue();
    }
    module2.exports = getStream;
    module2.exports.buffer = (stream2, options) => getStream(stream2, { ...options, encoding: "buffer" });
    module2.exports.array = (stream2, options) => getStream(stream2, { ...options, array: true });
    module2.exports.MaxBufferError = MaxBufferError;
  }
});

// node_modules/merge-stream/index.js
var require_merge_stream = __commonJS({
  "node_modules/merge-stream/index.js"(exports, module2) {
    "use strict";
    var { PassThrough } = require("stream");
    module2.exports = function() {
      var sources = [];
      var output = new PassThrough({ objectMode: true });
      output.setMaxListeners(0);
      output.add = add;
      output.isEmpty = isEmpty;
      output.on("unpipe", remove);
      Array.prototype.slice.call(arguments).forEach(add);
      return output;
      function add(source) {
        if (Array.isArray(source)) {
          source.forEach(add);
          return this;
        }
        sources.push(source);
        source.once("end", remove.bind(null, source));
        source.once("error", output.emit.bind(output, "error"));
        source.pipe(output, { end: false });
        return this;
      }
      function isEmpty() {
        return sources.length == 0;
      }
      function remove(source) {
        sources = sources.filter(function(it) {
          return it !== source;
        });
        if (!sources.length && output.readable) {
          output.end();
        }
      }
    };
  }
});

// node_modules/run-applescript/node_modules/execa/lib/stream.js
var require_stream = __commonJS({
  "node_modules/run-applescript/node_modules/execa/lib/stream.js"(exports, module2) {
    "use strict";
    var isStream = require_is_stream();
    var getStream = require_get_stream();
    var mergeStream = require_merge_stream();
    var handleInput = (spawned, input) => {
      if (input === void 0 || spawned.stdin === void 0) {
        return;
      }
      if (isStream(input)) {
        input.pipe(spawned.stdin);
      } else {
        spawned.stdin.end(input);
      }
    };
    var makeAllStream = (spawned, { all }) => {
      if (!all || !spawned.stdout && !spawned.stderr) {
        return;
      }
      const mixed = mergeStream();
      if (spawned.stdout) {
        mixed.add(spawned.stdout);
      }
      if (spawned.stderr) {
        mixed.add(spawned.stderr);
      }
      return mixed;
    };
    var getBufferedData = async (stream, streamPromise) => {
      if (!stream) {
        return;
      }
      stream.destroy();
      try {
        return await streamPromise;
      } catch (error) {
        return error.bufferedData;
      }
    };
    var getStreamPromise = (stream, { encoding, buffer, maxBuffer }) => {
      if (!stream || !buffer) {
        return;
      }
      if (encoding) {
        return getStream(stream, { encoding, maxBuffer });
      }
      return getStream.buffer(stream, { maxBuffer });
    };
    var getSpawnedResult = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
      const stdoutPromise = getStreamPromise(stdout, { encoding, buffer, maxBuffer });
      const stderrPromise = getStreamPromise(stderr, { encoding, buffer, maxBuffer });
      const allPromise = getStreamPromise(all, { encoding, buffer, maxBuffer: maxBuffer * 2 });
      try {
        return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
      } catch (error) {
        return Promise.all([
          { error, signal: error.signal, timedOut: error.timedOut },
          getBufferedData(stdout, stdoutPromise),
          getBufferedData(stderr, stderrPromise),
          getBufferedData(all, allPromise)
        ]);
      }
    };
    var validateInputSync = ({ input }) => {
      if (isStream(input)) {
        throw new TypeError("The `input` option cannot be a stream in sync mode");
      }
    };
    module2.exports = {
      handleInput,
      makeAllStream,
      getSpawnedResult,
      validateInputSync
    };
  }
});

// node_modules/run-applescript/node_modules/execa/lib/promise.js
var require_promise = __commonJS({
  "node_modules/run-applescript/node_modules/execa/lib/promise.js"(exports, module2) {
    "use strict";
    var nativePromisePrototype = (async () => {
    })().constructor.prototype;
    var descriptors = ["then", "catch", "finally"].map((property) => [
      property,
      Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
    ]);
    var mergePromise = (spawned, promise) => {
      for (const [property, descriptor] of descriptors) {
        const value = typeof promise === "function" ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
        Reflect.defineProperty(spawned, property, { ...descriptor, value });
      }
      return spawned;
    };
    var getSpawnedPromise = (spawned) => {
      return new Promise((resolve, reject) => {
        spawned.on("exit", (exitCode, signal) => {
          resolve({ exitCode, signal });
        });
        spawned.on("error", (error) => {
          reject(error);
        });
        if (spawned.stdin) {
          spawned.stdin.on("error", (error) => {
            reject(error);
          });
        }
      });
    };
    module2.exports = {
      mergePromise,
      getSpawnedPromise
    };
  }
});

// node_modules/run-applescript/node_modules/execa/lib/command.js
var require_command = __commonJS({
  "node_modules/run-applescript/node_modules/execa/lib/command.js"(exports, module2) {
    "use strict";
    var normalizeArgs = (file, args = []) => {
      if (!Array.isArray(args)) {
        return [file];
      }
      return [file, ...args];
    };
    var NO_ESCAPE_REGEXP = /^[\w.-]+$/;
    var DOUBLE_QUOTES_REGEXP = /"/g;
    var escapeArg = (arg) => {
      if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
        return arg;
      }
      return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
    };
    var joinCommand = (file, args) => {
      return normalizeArgs(file, args).join(" ");
    };
    var getEscapedCommand = (file, args) => {
      return normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
    };
    var SPACES_REGEXP = / +/g;
    var parseCommand = (command) => {
      const tokens = [];
      for (const token of command.trim().split(SPACES_REGEXP)) {
        const previousToken = tokens[tokens.length - 1];
        if (previousToken && previousToken.endsWith("\\")) {
          tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
        } else {
          tokens.push(token);
        }
      }
      return tokens;
    };
    module2.exports = {
      joinCommand,
      getEscapedCommand,
      parseCommand
    };
  }
});

// node_modules/run-applescript/node_modules/execa/index.js
var require_execa = __commonJS({
  "node_modules/run-applescript/node_modules/execa/index.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var childProcess = require("child_process");
    var crossSpawn = require_cross_spawn();
    var stripFinalNewline = require_strip_final_newline();
    var npmRunPath = require_npm_run_path();
    var onetime = require_onetime();
    var makeError = require_error();
    var normalizeStdio = require_stdio();
    var { spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler } = require_kill();
    var { handleInput, getSpawnedResult, makeAllStream, validateInputSync } = require_stream();
    var { mergePromise, getSpawnedPromise } = require_promise();
    var { joinCommand, parseCommand, getEscapedCommand } = require_command();
    var DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
    var getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
      const env = extendEnv ? { ...process.env, ...envOption } : envOption;
      if (preferLocal) {
        return npmRunPath.env({ env, cwd: localDir, execPath });
      }
      return env;
    };
    var handleArguments = (file, args, options = {}) => {
      const parsed = crossSpawn._parse(file, args, options);
      file = parsed.command;
      args = parsed.args;
      options = parsed.options;
      options = {
        maxBuffer: DEFAULT_MAX_BUFFER,
        buffer: true,
        stripFinalNewline: true,
        extendEnv: true,
        preferLocal: false,
        localDir: options.cwd || process.cwd(),
        execPath: process.execPath,
        encoding: "utf8",
        reject: true,
        cleanup: true,
        all: false,
        windowsHide: true,
        ...options
      };
      options.env = getEnv(options);
      options.stdio = normalizeStdio(options);
      if (process.platform === "win32" && path.basename(file, ".exe") === "cmd") {
        args.unshift("/q");
      }
      return { file, args, options, parsed };
    };
    var handleOutput = (options, value, error) => {
      if (typeof value !== "string" && !Buffer.isBuffer(value)) {
        return error === void 0 ? void 0 : "";
      }
      if (options.stripFinalNewline) {
        return stripFinalNewline(value);
      }
      return value;
    };
    var execa2 = (file, args, options) => {
      const parsed = handleArguments(file, args, options);
      const command = joinCommand(file, args);
      const escapedCommand = getEscapedCommand(file, args);
      validateTimeout(parsed.options);
      let spawned;
      try {
        spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
      } catch (error) {
        const dummySpawned = new childProcess.ChildProcess();
        const errorPromise = Promise.reject(makeError({
          error,
          stdout: "",
          stderr: "",
          all: "",
          command,
          escapedCommand,
          parsed,
          timedOut: false,
          isCanceled: false,
          killed: false
        }));
        return mergePromise(dummySpawned, errorPromise);
      }
      const spawnedPromise = getSpawnedPromise(spawned);
      const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
      const processDone = setExitHandler(spawned, parsed.options, timedPromise);
      const context = { isCanceled: false };
      spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
      spawned.cancel = spawnedCancel.bind(null, spawned, context);
      const handlePromise = async () => {
        const [{ error, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
        const stdout = handleOutput(parsed.options, stdoutResult);
        const stderr = handleOutput(parsed.options, stderrResult);
        const all = handleOutput(parsed.options, allResult);
        if (error || exitCode !== 0 || signal !== null) {
          const returnedError = makeError({
            error,
            exitCode,
            signal,
            stdout,
            stderr,
            all,
            command,
            escapedCommand,
            parsed,
            timedOut,
            isCanceled: context.isCanceled,
            killed: spawned.killed
          });
          if (!parsed.options.reject) {
            return returnedError;
          }
          throw returnedError;
        }
        return {
          command,
          escapedCommand,
          exitCode: 0,
          stdout,
          stderr,
          all,
          failed: false,
          timedOut: false,
          isCanceled: false,
          killed: false
        };
      };
      const handlePromiseOnce = onetime(handlePromise);
      handleInput(spawned, parsed.options.input);
      spawned.all = makeAllStream(spawned, parsed.options);
      return mergePromise(spawned, handlePromiseOnce);
    };
    module2.exports = execa2;
    module2.exports.sync = (file, args, options) => {
      const parsed = handleArguments(file, args, options);
      const command = joinCommand(file, args);
      const escapedCommand = getEscapedCommand(file, args);
      validateInputSync(parsed.options);
      let result;
      try {
        result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
      } catch (error) {
        throw makeError({
          error,
          stdout: "",
          stderr: "",
          all: "",
          command,
          escapedCommand,
          parsed,
          timedOut: false,
          isCanceled: false,
          killed: false
        });
      }
      const stdout = handleOutput(parsed.options, result.stdout, result.error);
      const stderr = handleOutput(parsed.options, result.stderr, result.error);
      if (result.error || result.status !== 0 || result.signal !== null) {
        const error = makeError({
          stdout,
          stderr,
          error: result.error,
          signal: result.signal,
          exitCode: result.status,
          command,
          escapedCommand,
          parsed,
          timedOut: result.error && result.error.code === "ETIMEDOUT",
          isCanceled: false,
          killed: result.signal !== null
        });
        if (!parsed.options.reject) {
          return error;
        }
        throw error;
      }
      return {
        command,
        escapedCommand,
        exitCode: 0,
        stdout,
        stderr,
        failed: false,
        timedOut: false,
        isCanceled: false,
        killed: false
      };
    };
    module2.exports.command = (command, options) => {
      const [file, ...args] = parseCommand(command);
      return execa2(file, args, options);
    };
    module2.exports.commandSync = (command, options) => {
      const [file, ...args] = parseCommand(command);
      return execa2.sync(file, args, options);
    };
    module2.exports.node = (scriptPath, args, options = {}) => {
      if (args && !Array.isArray(args) && typeof args === "object") {
        options = args;
        args = [];
      }
      const stdio = normalizeStdio.node(options);
      const defaultExecArgv = process.execArgv.filter((arg) => !arg.startsWith("--inspect"));
      const {
        nodePath = process.execPath,
        nodeOptions = defaultExecArgv
      } = options;
      return execa2(
        nodePath,
        [
          ...nodeOptions,
          scriptPath,
          ...Array.isArray(args) ? args : []
        ],
        {
          ...options,
          stdin: void 0,
          stdout: void 0,
          stderr: void 0,
          stdio,
          shell: false
        }
      );
    };
  }
});

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  default: () => Command
});
module.exports = __toCommonJS(src_exports);
var import_api = require("@raycast/api");
var import_child_process = require("child_process");
var import_react = require("react");

// node_modules/run-applescript/index.js
var import_node_process = __toESM(require("node:process"), 1);
var import_execa = __toESM(require_execa(), 1);
async function runAppleScript(script) {
  if (import_node_process.default.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const { stdout } = await (0, import_execa.default)("osascript", ["-e", script]);
  return stdout;
}
function runAppleScriptSync(script) {
  if (import_node_process.default.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const { stdout } = import_execa.default.sync("osascript", ["-e", script]);
  return stdout;
}

// src/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
async function getVpnConnections() {
  try {
    const result = await runAppleScript(`
      tell application "Tunnelblick" to get configurations
    `);
    const connections = result.split(",").map((connection) => {
      const name = connection.replace("configuration ", "").trim();
      const status = runAppleScriptSync(`
      tell application "Tunnelblick" to get state of first configuration where name = "${name}"
    `);
      return {
        name,
        status
      };
    });
    return connections;
  } catch {
    return new Promise(
      (resolve, reject) => reject("Couln't get VPN connections. Make sure you have Tunnelblick installed.")
    );
  }
}
function Command() {
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const [connections, setConnections] = (0, import_react.useState)([]);
  const [error, setError] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    getVpnConnections().then((connections2) => {
      setConnections(connections2);
    }).catch((error2) => {
      setError(new Error(error2));
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);
  if (error) {
    (0, import_api.showToast)(import_api.ToastStyle.Failure, "Something went wrong", error.message);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.List, {
    isLoading,
    children: connections.map((connection) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.List.Item, {
      icon: connection.status === "EXITING" ? "xmark-circle-16" : "checkmark-circle-16",
      title: connection.name,
      subtitle: connection.status === "EXITING" ? "Connect" : "Disconnect",
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.ActionPanel, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.ActionPanel.Item, {
          title: "Connect",
          onAction: () => {
            if (connection.status === "EXITING") {
              (0, import_child_process.exec)(
                `
vpnpw () {
        local pw=$(op item get --fields password MondayVPN)
        local otp=$(op item get --otp MondayVPN)
        local key="\${pw}\${otp}"
        echo $key | tr -d '
'
}
vpnpw
`,
                (error2, srdout, stderr) => import_api.Clipboard.copy(srdout)
              );
              runAppleScriptSync(`tell application "Tunnelblick" to connect "${connection.name}"`);
              (0, import_api.showToast)(import_api.ToastStyle.Success, "Connected");
            } else {
              runAppleScriptSync(`tell application "Tunnelblick" to disconnect "${connection.name}"`);
              (0, import_api.showToast)(import_api.ToastStyle.Success, "Disconnected");
            }
            getVpnConnections().then(setConnections);
          }
        }, connection.name)
      })
    }, connection.name))
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL2lzZXhlL3dpbmRvd3MuanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL2lzZXhlL21vZGUuanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL2lzZXhlL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL0RldmVsb3Blci9SYXljYXN0L3R1bm5lbGJsaWNrL25vZGVfbW9kdWxlcy93aGljaC93aGljaC5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvcGF0aC1rZXkvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi91dGlsL3Jlc29sdmVDb21tYW5kLmpzIiwgIi4uLy4uLy4uLy4uL0RldmVsb3Blci9SYXljYXN0L3R1bm5lbGJsaWNrL25vZGVfbW9kdWxlcy9jcm9zcy1zcGF3bi9saWIvdXRpbC9lc2NhcGUuanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL3NoZWJhbmctcmVnZXgvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL3NoZWJhbmctY29tbWFuZC9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vbGliL3V0aWwvcmVhZFNoZWJhbmcuanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi9wYXJzZS5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vbGliL2Vub2VudC5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL3N0cmlwLWZpbmFsLW5ld2xpbmUvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL3J1bi1hcHBsZXNjcmlwdC9ub2RlX21vZHVsZXMvbnBtLXJ1bi1wYXRoL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL0RldmVsb3Blci9SYXljYXN0L3R1bm5lbGJsaWNrL25vZGVfbW9kdWxlcy9taW1pYy1mbi9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvb25ldGltZS9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvaHVtYW4tc2lnbmFscy9zcmMvY29yZS5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvaHVtYW4tc2lnbmFscy9zcmMvcmVhbHRpbWUuanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL2h1bWFuLXNpZ25hbHMvc3JjL3NpZ25hbHMuanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL2h1bWFuLXNpZ25hbHMvc3JjL21haW4uanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL3J1bi1hcHBsZXNjcmlwdC9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2Vycm9yLmpzIiwgIi4uLy4uLy4uLy4uL0RldmVsb3Blci9SYXljYXN0L3R1bm5lbGJsaWNrL25vZGVfbW9kdWxlcy9ydW4tYXBwbGVzY3JpcHQvbm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9zdGRpby5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvc2lnbmFsLWV4aXQvc2lnbmFscy5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvc2lnbmFsLWV4aXQvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL3J1bi1hcHBsZXNjcmlwdC9ub2RlX21vZHVsZXMvZXhlY2EvbGliL2tpbGwuanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL3J1bi1hcHBsZXNjcmlwdC9ub2RlX21vZHVsZXMvaXMtc3RyZWFtL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL0RldmVsb3Blci9SYXljYXN0L3R1bm5lbGJsaWNrL25vZGVfbW9kdWxlcy9ydW4tYXBwbGVzY3JpcHQvbm9kZV9tb2R1bGVzL2dldC1zdHJlYW0vYnVmZmVyLXN0cmVhbS5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvcnVuLWFwcGxlc2NyaXB0L25vZGVfbW9kdWxlcy9nZXQtc3RyZWFtL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL0RldmVsb3Blci9SYXljYXN0L3R1bm5lbGJsaWNrL25vZGVfbW9kdWxlcy9tZXJnZS1zdHJlYW0vaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vRGV2ZWxvcGVyL1JheWNhc3QvdHVubmVsYmxpY2svbm9kZV9tb2R1bGVzL3J1bi1hcHBsZXNjcmlwdC9ub2RlX21vZHVsZXMvZXhlY2EvbGliL3N0cmVhbS5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvcnVuLWFwcGxlc2NyaXB0L25vZGVfbW9kdWxlcy9leGVjYS9saWIvcHJvbWlzZS5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvcnVuLWFwcGxlc2NyaXB0L25vZGVfbW9kdWxlcy9leGVjYS9saWIvY29tbWFuZC5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9ub2RlX21vZHVsZXMvcnVuLWFwcGxlc2NyaXB0L25vZGVfbW9kdWxlcy9leGVjYS9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9EZXZlbG9wZXIvUmF5Y2FzdC90dW5uZWxibGljay9zcmMvaW5kZXgudHN4IiwgIi4uLy4uLy4uLy4uL0RldmVsb3Blci9SYXljYXN0L3R1bm5lbGJsaWNrL25vZGVfbW9kdWxlcy9ydW4tYXBwbGVzY3JpcHQvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIm1vZHVsZS5leHBvcnRzID0gaXNleGVcbmlzZXhlLnN5bmMgPSBzeW5jXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuZnVuY3Rpb24gY2hlY2tQYXRoRXh0IChwYXRoLCBvcHRpb25zKSB7XG4gIHZhciBwYXRoZXh0ID0gb3B0aW9ucy5wYXRoRXh0ICE9PSB1bmRlZmluZWQgP1xuICAgIG9wdGlvbnMucGF0aEV4dCA6IHByb2Nlc3MuZW52LlBBVEhFWFRcblxuICBpZiAoIXBhdGhleHQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcGF0aGV4dCA9IHBhdGhleHQuc3BsaXQoJzsnKVxuICBpZiAocGF0aGV4dC5pbmRleE9mKCcnKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aGV4dC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwID0gcGF0aGV4dFtpXS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKHAgJiYgcGF0aC5zdWJzdHIoLXAubGVuZ3RoKS50b0xvd2VyQ2FzZSgpID09PSBwKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0IChzdGF0LCBwYXRoLCBvcHRpb25zKSB7XG4gIGlmICghc3RhdC5pc1N5bWJvbGljTGluaygpICYmICFzdGF0LmlzRmlsZSgpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrUGF0aEV4dChwYXRoLCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBpc2V4ZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgZnMuc3RhdChwYXRoLCBmdW5jdGlvbiAoZXIsIHN0YXQpIHtcbiAgICBjYihlciwgZXIgPyBmYWxzZSA6IGNoZWNrU3RhdChzdGF0LCBwYXRoLCBvcHRpb25zKSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3luYyAocGF0aCwgb3B0aW9ucykge1xuICByZXR1cm4gY2hlY2tTdGF0KGZzLnN0YXRTeW5jKHBhdGgpLCBwYXRoLCBvcHRpb25zKVxufVxuIiwgIm1vZHVsZS5leHBvcnRzID0gaXNleGVcbmlzZXhlLnN5bmMgPSBzeW5jXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuZnVuY3Rpb24gaXNleGUgKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gIGZzLnN0YXQocGF0aCwgZnVuY3Rpb24gKGVyLCBzdGF0KSB7XG4gICAgY2IoZXIsIGVyID8gZmFsc2UgOiBjaGVja1N0YXQoc3RhdCwgb3B0aW9ucykpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN5bmMgKHBhdGgsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNoZWNrU3RhdChmcy5zdGF0U3luYyhwYXRoKSwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0IChzdGF0LCBvcHRpb25zKSB7XG4gIHJldHVybiBzdGF0LmlzRmlsZSgpICYmIGNoZWNrTW9kZShzdGF0LCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBjaGVja01vZGUgKHN0YXQsIG9wdGlvbnMpIHtcbiAgdmFyIG1vZCA9IHN0YXQubW9kZVxuICB2YXIgdWlkID0gc3RhdC51aWRcbiAgdmFyIGdpZCA9IHN0YXQuZ2lkXG5cbiAgdmFyIG15VWlkID0gb3B0aW9ucy51aWQgIT09IHVuZGVmaW5lZCA/XG4gICAgb3B0aW9ucy51aWQgOiBwcm9jZXNzLmdldHVpZCAmJiBwcm9jZXNzLmdldHVpZCgpXG4gIHZhciBteUdpZCA9IG9wdGlvbnMuZ2lkICE9PSB1bmRlZmluZWQgP1xuICAgIG9wdGlvbnMuZ2lkIDogcHJvY2Vzcy5nZXRnaWQgJiYgcHJvY2Vzcy5nZXRnaWQoKVxuXG4gIHZhciB1ID0gcGFyc2VJbnQoJzEwMCcsIDgpXG4gIHZhciBnID0gcGFyc2VJbnQoJzAxMCcsIDgpXG4gIHZhciBvID0gcGFyc2VJbnQoJzAwMScsIDgpXG4gIHZhciB1ZyA9IHUgfCBnXG5cbiAgdmFyIHJldCA9IChtb2QgJiBvKSB8fFxuICAgIChtb2QgJiBnKSAmJiBnaWQgPT09IG15R2lkIHx8XG4gICAgKG1vZCAmIHUpICYmIHVpZCA9PT0gbXlVaWQgfHxcbiAgICAobW9kICYgdWcpICYmIG15VWlkID09PSAwXG5cbiAgcmV0dXJuIHJldFxufVxuIiwgInZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcbnZhciBjb3JlXG5pZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyB8fCBnbG9iYWwuVEVTVElOR19XSU5ET1dTKSB7XG4gIGNvcmUgPSByZXF1aXJlKCcuL3dpbmRvd3MuanMnKVxufSBlbHNlIHtcbiAgY29yZSA9IHJlcXVpcmUoJy4vbW9kZS5qcycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNleGVcbmlzZXhlLnN5bmMgPSBzeW5jXG5cbmZ1bmN0aW9uIGlzZXhlIChwYXRoLCBvcHRpb25zLCBjYikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIGlmICghY2IpIHtcbiAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG5vdCBwcm92aWRlZCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlzZXhlKHBhdGgsIG9wdGlvbnMgfHwge30sIGZ1bmN0aW9uIChlciwgaXMpIHtcbiAgICAgICAgaWYgKGVyKSB7XG4gICAgICAgICAgcmVqZWN0KGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoaXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGNvcmUocGF0aCwgb3B0aW9ucyB8fCB7fSwgZnVuY3Rpb24gKGVyLCBpcykge1xuICAgIC8vIGlnbm9yZSBFQUNDRVMgYmVjYXVzZSB0aGF0IGp1c3QgbWVhbnMgd2UgYXJlbid0IGFsbG93ZWQgdG8gcnVuIGl0XG4gICAgaWYgKGVyKSB7XG4gICAgICBpZiAoZXIuY29kZSA9PT0gJ0VBQ0NFUycgfHwgb3B0aW9ucyAmJiBvcHRpb25zLmlnbm9yZUVycm9ycykge1xuICAgICAgICBlciA9IG51bGxcbiAgICAgICAgaXMgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBjYihlciwgaXMpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN5bmMgKHBhdGgsIG9wdGlvbnMpIHtcbiAgLy8gbXkga2luZ2RvbSBmb3IgYSBmaWx0ZXJlZCBjYXRjaFxuICB0cnkge1xuICAgIHJldHVybiBjb3JlLnN5bmMocGF0aCwgb3B0aW9ucyB8fCB7fSlcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmlnbm9yZUVycm9ycyB8fCBlci5jb2RlID09PSAnRUFDQ0VTJykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICB9XG59XG4iLCAiY29uc3QgaXNXaW5kb3dzID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyB8fFxuICAgIHByb2Nlc3MuZW52Lk9TVFlQRSA9PT0gJ2N5Z3dpbicgfHxcbiAgICBwcm9jZXNzLmVudi5PU1RZUEUgPT09ICdtc3lzJ1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBDT0xPTiA9IGlzV2luZG93cyA/ICc7JyA6ICc6J1xuY29uc3QgaXNleGUgPSByZXF1aXJlKCdpc2V4ZScpXG5cbmNvbnN0IGdldE5vdEZvdW5kRXJyb3IgPSAoY21kKSA9PlxuICBPYmplY3QuYXNzaWduKG5ldyBFcnJvcihgbm90IGZvdW5kOiAke2NtZH1gKSwgeyBjb2RlOiAnRU5PRU5UJyB9KVxuXG5jb25zdCBnZXRQYXRoSW5mbyA9IChjbWQsIG9wdCkgPT4ge1xuICBjb25zdCBjb2xvbiA9IG9wdC5jb2xvbiB8fCBDT0xPTlxuXG4gIC8vIElmIGl0IGhhcyBhIHNsYXNoLCB0aGVuIHdlIGRvbid0IGJvdGhlciBzZWFyY2hpbmcgdGhlIHBhdGhlbnYuXG4gIC8vIGp1c3QgY2hlY2sgdGhlIGZpbGUgaXRzZWxmLCBhbmQgdGhhdCdzIGl0LlxuICBjb25zdCBwYXRoRW52ID0gY21kLm1hdGNoKC9cXC8vKSB8fCBpc1dpbmRvd3MgJiYgY21kLm1hdGNoKC9cXFxcLykgPyBbJyddXG4gICAgOiAoXG4gICAgICBbXG4gICAgICAgIC8vIHdpbmRvd3MgYWx3YXlzIGNoZWNrcyB0aGUgY3dkIGZpcnN0XG4gICAgICAgIC4uLihpc1dpbmRvd3MgPyBbcHJvY2Vzcy5jd2QoKV0gOiBbXSksXG4gICAgICAgIC4uLihvcHQucGF0aCB8fCBwcm9jZXNzLmVudi5QQVRIIHx8XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHZlcnkgdW51c3VhbCAqLyAnJykuc3BsaXQoY29sb24pLFxuICAgICAgXVxuICAgIClcbiAgY29uc3QgcGF0aEV4dEV4ZSA9IGlzV2luZG93c1xuICAgID8gb3B0LnBhdGhFeHQgfHwgcHJvY2Vzcy5lbnYuUEFUSEVYVCB8fCAnLkVYRTsuQ01EOy5CQVQ7LkNPTSdcbiAgICA6ICcnXG4gIGNvbnN0IHBhdGhFeHQgPSBpc1dpbmRvd3MgPyBwYXRoRXh0RXhlLnNwbGl0KGNvbG9uKSA6IFsnJ11cblxuICBpZiAoaXNXaW5kb3dzKSB7XG4gICAgaWYgKGNtZC5pbmRleE9mKCcuJykgIT09IC0xICYmIHBhdGhFeHRbMF0gIT09ICcnKVxuICAgICAgcGF0aEV4dC51bnNoaWZ0KCcnKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRoRW52LFxuICAgIHBhdGhFeHQsXG4gICAgcGF0aEV4dEV4ZSxcbiAgfVxufVxuXG5jb25zdCB3aGljaCA9IChjbWQsIG9wdCwgY2IpID0+IHtcbiAgaWYgKHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdFxuICAgIG9wdCA9IHt9XG4gIH1cbiAgaWYgKCFvcHQpXG4gICAgb3B0ID0ge31cblxuICBjb25zdCB7IHBhdGhFbnYsIHBhdGhFeHQsIHBhdGhFeHRFeGUgfSA9IGdldFBhdGhJbmZvKGNtZCwgb3B0KVxuICBjb25zdCBmb3VuZCA9IFtdXG5cbiAgY29uc3Qgc3RlcCA9IGkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChpID09PSBwYXRoRW52Lmxlbmd0aClcbiAgICAgIHJldHVybiBvcHQuYWxsICYmIGZvdW5kLmxlbmd0aCA/IHJlc29sdmUoZm91bmQpXG4gICAgICAgIDogcmVqZWN0KGdldE5vdEZvdW5kRXJyb3IoY21kKSlcblxuICAgIGNvbnN0IHBwUmF3ID0gcGF0aEVudltpXVxuICAgIGNvbnN0IHBhdGhQYXJ0ID0gL15cIi4qXCIkLy50ZXN0KHBwUmF3KSA/IHBwUmF3LnNsaWNlKDEsIC0xKSA6IHBwUmF3XG5cbiAgICBjb25zdCBwQ21kID0gcGF0aC5qb2luKHBhdGhQYXJ0LCBjbWQpXG4gICAgY29uc3QgcCA9ICFwYXRoUGFydCAmJiAvXlxcLltcXFxcXFwvXS8udGVzdChjbWQpID8gY21kLnNsaWNlKDAsIDIpICsgcENtZFxuICAgICAgOiBwQ21kXG5cbiAgICByZXNvbHZlKHN1YlN0ZXAocCwgaSwgMCkpXG4gIH0pXG5cbiAgY29uc3Qgc3ViU3RlcCA9IChwLCBpLCBpaSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChpaSA9PT0gcGF0aEV4dC5sZW5ndGgpXG4gICAgICByZXR1cm4gcmVzb2x2ZShzdGVwKGkgKyAxKSlcbiAgICBjb25zdCBleHQgPSBwYXRoRXh0W2lpXVxuICAgIGlzZXhlKHAgKyBleHQsIHsgcGF0aEV4dDogcGF0aEV4dEV4ZSB9LCAoZXIsIGlzKSA9PiB7XG4gICAgICBpZiAoIWVyICYmIGlzKSB7XG4gICAgICAgIGlmIChvcHQuYWxsKVxuICAgICAgICAgIGZvdW5kLnB1c2gocCArIGV4dClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHAgKyBleHQpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZShzdWJTdGVwKHAsIGksIGlpICsgMSkpXG4gICAgfSlcbiAgfSlcblxuICByZXR1cm4gY2IgPyBzdGVwKDApLnRoZW4ocmVzID0+IGNiKG51bGwsIHJlcyksIGNiKSA6IHN0ZXAoMClcbn1cblxuY29uc3Qgd2hpY2hTeW5jID0gKGNtZCwgb3B0KSA9PiB7XG4gIG9wdCA9IG9wdCB8fCB7fVxuXG4gIGNvbnN0IHsgcGF0aEVudiwgcGF0aEV4dCwgcGF0aEV4dEV4ZSB9ID0gZ2V0UGF0aEluZm8oY21kLCBvcHQpXG4gIGNvbnN0IGZvdW5kID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhFbnYubGVuZ3RoOyBpICsrKSB7XG4gICAgY29uc3QgcHBSYXcgPSBwYXRoRW52W2ldXG4gICAgY29uc3QgcGF0aFBhcnQgPSAvXlwiLipcIiQvLnRlc3QocHBSYXcpID8gcHBSYXcuc2xpY2UoMSwgLTEpIDogcHBSYXdcblxuICAgIGNvbnN0IHBDbWQgPSBwYXRoLmpvaW4ocGF0aFBhcnQsIGNtZClcbiAgICBjb25zdCBwID0gIXBhdGhQYXJ0ICYmIC9eXFwuW1xcXFxcXC9dLy50ZXN0KGNtZCkgPyBjbWQuc2xpY2UoMCwgMikgKyBwQ21kXG4gICAgICA6IHBDbWRcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGF0aEV4dC5sZW5ndGg7IGogKyspIHtcbiAgICAgIGNvbnN0IGN1ciA9IHAgKyBwYXRoRXh0W2pdXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcyA9IGlzZXhlLnN5bmMoY3VyLCB7IHBhdGhFeHQ6IHBhdGhFeHRFeGUgfSlcbiAgICAgICAgaWYgKGlzKSB7XG4gICAgICAgICAgaWYgKG9wdC5hbGwpXG4gICAgICAgICAgICBmb3VuZC5wdXNoKGN1cilcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gY3VyXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGV4KSB7fVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHQuYWxsICYmIGZvdW5kLmxlbmd0aClcbiAgICByZXR1cm4gZm91bmRcblxuICBpZiAob3B0Lm5vdGhyb3cpXG4gICAgcmV0dXJuIG51bGxcblxuICB0aHJvdyBnZXROb3RGb3VuZEVycm9yKGNtZClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aGljaFxud2hpY2guc3luYyA9IHdoaWNoU3luY1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aEtleSA9IChvcHRpb25zID0ge30pID0+IHtcblx0Y29uc3QgZW52aXJvbm1lbnQgPSBvcHRpb25zLmVudiB8fCBwcm9jZXNzLmVudjtcblx0Y29uc3QgcGxhdGZvcm0gPSBvcHRpb25zLnBsYXRmb3JtIHx8IHByb2Nlc3MucGxhdGZvcm07XG5cblx0aWYgKHBsYXRmb3JtICE9PSAnd2luMzInKSB7XG5cdFx0cmV0dXJuICdQQVRIJztcblx0fVxuXG5cdHJldHVybiBPYmplY3Qua2V5cyhlbnZpcm9ubWVudCkucmV2ZXJzZSgpLmZpbmQoa2V5ID0+IGtleS50b1VwcGVyQ2FzZSgpID09PSAnUEFUSCcpIHx8ICdQYXRoJztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aEtleTtcbi8vIFRPRE86IFJlbW92ZSB0aGlzIGZvciB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gcGF0aEtleTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB3aGljaCA9IHJlcXVpcmUoJ3doaWNoJyk7XG5jb25zdCBnZXRQYXRoS2V5ID0gcmVxdWlyZSgncGF0aC1rZXknKTtcblxuZnVuY3Rpb24gcmVzb2x2ZUNvbW1hbmRBdHRlbXB0KHBhcnNlZCwgd2l0aG91dFBhdGhFeHQpIHtcbiAgICBjb25zdCBlbnYgPSBwYXJzZWQub3B0aW9ucy5lbnYgfHwgcHJvY2Vzcy5lbnY7XG4gICAgY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKTtcbiAgICBjb25zdCBoYXNDdXN0b21Dd2QgPSBwYXJzZWQub3B0aW9ucy5jd2QgIT0gbnVsbDtcbiAgICAvLyBXb3JrZXIgdGhyZWFkcyBkbyBub3QgaGF2ZSBwcm9jZXNzLmNoZGlyKClcbiAgICBjb25zdCBzaG91bGRTd2l0Y2hDd2QgPSBoYXNDdXN0b21Dd2QgJiYgcHJvY2Vzcy5jaGRpciAhPT0gdW5kZWZpbmVkICYmICFwcm9jZXNzLmNoZGlyLmRpc2FibGVkO1xuXG4gICAgLy8gSWYgYSBjdXN0b20gYGN3ZGAgd2FzIHNwZWNpZmllZCwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIHByb2Nlc3MgY3dkXG4gICAgLy8gYmVjYXVzZSBgd2hpY2hgIHdpbGwgZG8gc3RhdCBjYWxscyBidXQgZG9lcyBub3Qgc3VwcG9ydCBhIGN1c3RvbSBjd2RcbiAgICBpZiAoc2hvdWxkU3dpdGNoQ3dkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9jZXNzLmNoZGlyKHBhcnNlZC5vcHRpb25zLmN3ZCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLyogRW1wdHkgKi9cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXNvbHZlZDtcblxuICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVkID0gd2hpY2guc3luYyhwYXJzZWQuY29tbWFuZCwge1xuICAgICAgICAgICAgcGF0aDogZW52W2dldFBhdGhLZXkoeyBlbnYgfSldLFxuICAgICAgICAgICAgcGF0aEV4dDogd2l0aG91dFBhdGhFeHQgPyBwYXRoLmRlbGltaXRlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBFbXB0eSAqL1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChzaG91bGRTd2l0Y2hDd2QpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuY2hkaXIoY3dkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHdlIHN1Y2Nlc3NmdWxseSByZXNvbHZlZCwgZW5zdXJlIHRoYXQgYW4gYWJzb2x1dGUgcGF0aCBpcyByZXR1cm5lZFxuICAgIC8vIE5vdGUgdGhhdCB3aGVuIGEgY3VzdG9tIGBjd2RgIHdhcyB1c2VkLCB3ZSBuZWVkIHRvIHJlc29sdmUgdG8gYW4gYWJzb2x1dGUgcGF0aCBiYXNlZCBvbiBpdFxuICAgIGlmIChyZXNvbHZlZCkge1xuICAgICAgICByZXNvbHZlZCA9IHBhdGgucmVzb2x2ZShoYXNDdXN0b21Dd2QgPyBwYXJzZWQub3B0aW9ucy5jd2QgOiAnJywgcmVzb2x2ZWQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNvbHZlZDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbW1hbmQocGFyc2VkKSB7XG4gICAgcmV0dXJuIHJlc29sdmVDb21tYW5kQXR0ZW1wdChwYXJzZWQpIHx8IHJlc29sdmVDb21tYW5kQXR0ZW1wdChwYXJzZWQsIHRydWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc29sdmVDb21tYW5kO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLy8gU2VlIGh0dHA6Ly93d3cucm9idmFuZGVyd291ZGUuY29tL2VzY2FwZWNoYXJzLnBocFxuY29uc3QgbWV0YUNoYXJzUmVnRXhwID0gLyhbKClcXF1bJSFeXCJgPD4mfDssICo/XSkvZztcblxuZnVuY3Rpb24gZXNjYXBlQ29tbWFuZChhcmcpIHtcbiAgICAvLyBFc2NhcGUgbWV0YSBjaGFyc1xuICAgIGFyZyA9IGFyZy5yZXBsYWNlKG1ldGFDaGFyc1JlZ0V4cCwgJ14kMScpO1xuXG4gICAgcmV0dXJuIGFyZztcbn1cblxuZnVuY3Rpb24gZXNjYXBlQXJndW1lbnQoYXJnLCBkb3VibGVFc2NhcGVNZXRhQ2hhcnMpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZ1xuICAgIGFyZyA9IGAke2FyZ31gO1xuXG4gICAgLy8gQWxnb3JpdGhtIGJlbG93IGlzIGJhc2VkIG9uIGh0dHBzOi8vcW50bS5vcmcvY21kXG5cbiAgICAvLyBTZXF1ZW5jZSBvZiBiYWNrc2xhc2hlcyBmb2xsb3dlZCBieSBhIGRvdWJsZSBxdW90ZTpcbiAgICAvLyBkb3VibGUgdXAgYWxsIHRoZSBiYWNrc2xhc2hlcyBhbmQgZXNjYXBlIHRoZSBkb3VibGUgcXVvdGVcbiAgICBhcmcgPSBhcmcucmVwbGFjZSgvKFxcXFwqKVwiL2csICckMSQxXFxcXFwiJyk7XG5cbiAgICAvLyBTZXF1ZW5jZSBvZiBiYWNrc2xhc2hlcyBmb2xsb3dlZCBieSB0aGUgZW5kIG9mIHRoZSBzdHJpbmdcbiAgICAvLyAod2hpY2ggd2lsbCBiZWNvbWUgYSBkb3VibGUgcXVvdGUgbGF0ZXIpOlxuICAgIC8vIGRvdWJsZSB1cCBhbGwgdGhlIGJhY2tzbGFzaGVzXG4gICAgYXJnID0gYXJnLnJlcGxhY2UoLyhcXFxcKikkLywgJyQxJDEnKTtcblxuICAgIC8vIEFsbCBvdGhlciBiYWNrc2xhc2hlcyBvY2N1ciBsaXRlcmFsbHlcblxuICAgIC8vIFF1b3RlIHRoZSB3aG9sZSB0aGluZzpcbiAgICBhcmcgPSBgXCIke2FyZ31cImA7XG5cbiAgICAvLyBFc2NhcGUgbWV0YSBjaGFyc1xuICAgIGFyZyA9IGFyZy5yZXBsYWNlKG1ldGFDaGFyc1JlZ0V4cCwgJ14kMScpO1xuXG4gICAgLy8gRG91YmxlIGVzY2FwZSBtZXRhIGNoYXJzIGlmIG5lY2Vzc2FyeVxuICAgIGlmIChkb3VibGVFc2NhcGVNZXRhQ2hhcnMpIHtcbiAgICAgICAgYXJnID0gYXJnLnJlcGxhY2UobWV0YUNoYXJzUmVnRXhwLCAnXiQxJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZztcbn1cblxubW9kdWxlLmV4cG9ydHMuY29tbWFuZCA9IGVzY2FwZUNvbW1hbmQ7XG5tb2R1bGUuZXhwb3J0cy5hcmd1bWVudCA9IGVzY2FwZUFyZ3VtZW50O1xuIiwgIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gL14jISguKikvO1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHNoZWJhbmdSZWdleCA9IHJlcXVpcmUoJ3NoZWJhbmctcmVnZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc3RyaW5nID0gJycpID0+IHtcblx0Y29uc3QgbWF0Y2ggPSBzdHJpbmcubWF0Y2goc2hlYmFuZ1JlZ2V4KTtcblxuXHRpZiAoIW1hdGNoKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBbcGF0aCwgYXJndW1lbnRdID0gbWF0Y2hbMF0ucmVwbGFjZSgvIyEgPy8sICcnKS5zcGxpdCgnICcpO1xuXHRjb25zdCBiaW5hcnkgPSBwYXRoLnNwbGl0KCcvJykucG9wKCk7XG5cblx0aWYgKGJpbmFyeSA9PT0gJ2VudicpIHtcblx0XHRyZXR1cm4gYXJndW1lbnQ7XG5cdH1cblxuXHRyZXR1cm4gYXJndW1lbnQgPyBgJHtiaW5hcnl9ICR7YXJndW1lbnR9YCA6IGJpbmFyeTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBzaGViYW5nQ29tbWFuZCA9IHJlcXVpcmUoJ3NoZWJhbmctY29tbWFuZCcpO1xuXG5mdW5jdGlvbiByZWFkU2hlYmFuZyhjb21tYW5kKSB7XG4gICAgLy8gUmVhZCB0aGUgZmlyc3QgMTUwIGJ5dGVzIGZyb20gdGhlIGZpbGVcbiAgICBjb25zdCBzaXplID0gMTUwO1xuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvYyhzaXplKTtcblxuICAgIGxldCBmZDtcblxuICAgIHRyeSB7XG4gICAgICAgIGZkID0gZnMub3BlblN5bmMoY29tbWFuZCwgJ3InKTtcbiAgICAgICAgZnMucmVhZFN5bmMoZmQsIGJ1ZmZlciwgMCwgc2l6ZSwgMCk7XG4gICAgICAgIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgfSBjYXRjaCAoZSkgeyAvKiBFbXB0eSAqLyB9XG5cbiAgICAvLyBBdHRlbXB0IHRvIGV4dHJhY3Qgc2hlYmFuZyAobnVsbCBpcyByZXR1cm5lZCBpZiBub3QgYSBzaGViYW5nKVxuICAgIHJldHVybiBzaGViYW5nQ29tbWFuZChidWZmZXIudG9TdHJpbmcoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhZFNoZWJhbmc7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgcmVzb2x2ZUNvbW1hbmQgPSByZXF1aXJlKCcuL3V0aWwvcmVzb2x2ZUNvbW1hbmQnKTtcbmNvbnN0IGVzY2FwZSA9IHJlcXVpcmUoJy4vdXRpbC9lc2NhcGUnKTtcbmNvbnN0IHJlYWRTaGViYW5nID0gcmVxdWlyZSgnLi91dGlsL3JlYWRTaGViYW5nJyk7XG5cbmNvbnN0IGlzV2luID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbmNvbnN0IGlzRXhlY3V0YWJsZVJlZ0V4cCA9IC9cXC4oPzpjb218ZXhlKSQvaTtcbmNvbnN0IGlzQ21kU2hpbVJlZ0V4cCA9IC9ub2RlX21vZHVsZXNbXFxcXC9dLmJpbltcXFxcL11bXlxcXFwvXStcXC5jbWQkL2k7XG5cbmZ1bmN0aW9uIGRldGVjdFNoZWJhbmcocGFyc2VkKSB7XG4gICAgcGFyc2VkLmZpbGUgPSByZXNvbHZlQ29tbWFuZChwYXJzZWQpO1xuXG4gICAgY29uc3Qgc2hlYmFuZyA9IHBhcnNlZC5maWxlICYmIHJlYWRTaGViYW5nKHBhcnNlZC5maWxlKTtcblxuICAgIGlmIChzaGViYW5nKSB7XG4gICAgICAgIHBhcnNlZC5hcmdzLnVuc2hpZnQocGFyc2VkLmZpbGUpO1xuICAgICAgICBwYXJzZWQuY29tbWFuZCA9IHNoZWJhbmc7XG5cbiAgICAgICAgcmV0dXJuIHJlc29sdmVDb21tYW5kKHBhcnNlZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlZC5maWxlO1xufVxuXG5mdW5jdGlvbiBwYXJzZU5vblNoZWxsKHBhcnNlZCkge1xuICAgIGlmICghaXNXaW4pIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9XG5cbiAgICAvLyBEZXRlY3QgJiBhZGQgc3VwcG9ydCBmb3Igc2hlYmFuZ3NcbiAgICBjb25zdCBjb21tYW5kRmlsZSA9IGRldGVjdFNoZWJhbmcocGFyc2VkKTtcblxuICAgIC8vIFdlIGRvbid0IG5lZWQgYSBzaGVsbCBpZiB0aGUgY29tbWFuZCBmaWxlbmFtZSBpcyBhbiBleGVjdXRhYmxlXG4gICAgY29uc3QgbmVlZHNTaGVsbCA9ICFpc0V4ZWN1dGFibGVSZWdFeHAudGVzdChjb21tYW5kRmlsZSk7XG5cbiAgICAvLyBJZiBhIHNoZWxsIGlzIHJlcXVpcmVkLCB1c2UgY21kLmV4ZSBhbmQgdGFrZSBjYXJlIG9mIGVzY2FwaW5nIGV2ZXJ5dGhpbmcgY29ycmVjdGx5XG4gICAgLy8gTm90ZSB0aGF0IGBmb3JjZVNoZWxsYCBpcyBhbiBoaWRkZW4gb3B0aW9uIHVzZWQgb25seSBpbiB0ZXN0c1xuICAgIGlmIChwYXJzZWQub3B0aW9ucy5mb3JjZVNoZWxsIHx8IG5lZWRzU2hlbGwpIHtcbiAgICAgICAgLy8gTmVlZCB0byBkb3VibGUgZXNjYXBlIG1ldGEgY2hhcnMgaWYgdGhlIGNvbW1hbmQgaXMgYSBjbWQtc2hpbSBsb2NhdGVkIGluIGBub2RlX21vZHVsZXMvLmJpbi9gXG4gICAgICAgIC8vIFRoZSBjbWQtc2hpbSBzaW1wbHkgY2FsbHMgZXhlY3V0ZSB0aGUgcGFja2FnZSBiaW4gZmlsZSB3aXRoIE5vZGVKUywgcHJveHlpbmcgYW55IGFyZ3VtZW50XG4gICAgICAgIC8vIEJlY2F1c2UgdGhlIGVzY2FwZSBvZiBtZXRhY2hhcnMgd2l0aCBeIGdldHMgaW50ZXJwcmV0ZWQgd2hlbiB0aGUgY21kLmV4ZSBpcyBmaXJzdCBjYWxsZWQsXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gZG91YmxlIGVzY2FwZSB0aGVtXG4gICAgICAgIGNvbnN0IG5lZWRzRG91YmxlRXNjYXBlTWV0YUNoYXJzID0gaXNDbWRTaGltUmVnRXhwLnRlc3QoY29tbWFuZEZpbGUpO1xuXG4gICAgICAgIC8vIE5vcm1hbGl6ZSBwb3NpeCBwYXRocyBpbnRvIE9TIGNvbXBhdGlibGUgcGF0aHMgKGUuZy46IGZvby9iYXIgLT4gZm9vXFxiYXIpXG4gICAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IG90aGVyd2lzZSBpdCB3aWxsIGFsd2F5cyBmYWlsIHdpdGggRU5PRU5UIGluIHRob3NlIGNhc2VzXG4gICAgICAgIHBhcnNlZC5jb21tYW5kID0gcGF0aC5ub3JtYWxpemUocGFyc2VkLmNvbW1hbmQpO1xuXG4gICAgICAgIC8vIEVzY2FwZSBjb21tYW5kICYgYXJndW1lbnRzXG4gICAgICAgIHBhcnNlZC5jb21tYW5kID0gZXNjYXBlLmNvbW1hbmQocGFyc2VkLmNvbW1hbmQpO1xuICAgICAgICBwYXJzZWQuYXJncyA9IHBhcnNlZC5hcmdzLm1hcCgoYXJnKSA9PiBlc2NhcGUuYXJndW1lbnQoYXJnLCBuZWVkc0RvdWJsZUVzY2FwZU1ldGFDaGFycykpO1xuXG4gICAgICAgIGNvbnN0IHNoZWxsQ29tbWFuZCA9IFtwYXJzZWQuY29tbWFuZF0uY29uY2F0KHBhcnNlZC5hcmdzKS5qb2luKCcgJyk7XG5cbiAgICAgICAgcGFyc2VkLmFyZ3MgPSBbJy9kJywgJy9zJywgJy9jJywgYFwiJHtzaGVsbENvbW1hbmR9XCJgXTtcbiAgICAgICAgcGFyc2VkLmNvbW1hbmQgPSBwcm9jZXNzLmVudi5jb21zcGVjIHx8ICdjbWQuZXhlJztcbiAgICAgICAgcGFyc2VkLm9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzID0gdHJ1ZTsgLy8gVGVsbCBub2RlJ3Mgc3Bhd24gdGhhdCB0aGUgYXJndW1lbnRzIGFyZSBhbHJlYWR5IGVzY2FwZWRcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkO1xufVxuXG5mdW5jdGlvbiBwYXJzZShjb21tYW5kLCBhcmdzLCBvcHRpb25zKSB7XG4gICAgLy8gTm9ybWFsaXplIGFyZ3VtZW50cywgc2ltaWxhciB0byBub2RlanNcbiAgICBpZiAoYXJncyAmJiAhQXJyYXkuaXNBcnJheShhcmdzKSkge1xuICAgICAgICBvcHRpb25zID0gYXJncztcbiAgICAgICAgYXJncyA9IG51bGw7XG4gICAgfVxuXG4gICAgYXJncyA9IGFyZ3MgPyBhcmdzLnNsaWNlKDApIDogW107IC8vIENsb25lIGFycmF5IHRvIGF2b2lkIGNoYW5naW5nIHRoZSBvcmlnaW5hbFxuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTsgLy8gQ2xvbmUgb2JqZWN0IHRvIGF2b2lkIGNoYW5naW5nIHRoZSBvcmlnaW5hbFxuXG4gICAgLy8gQnVpbGQgb3VyIHBhcnNlZCBvYmplY3RcbiAgICBjb25zdCBwYXJzZWQgPSB7XG4gICAgICAgIGNvbW1hbmQsXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIGZpbGU6IHVuZGVmaW5lZCxcbiAgICAgICAgb3JpZ2luYWw6IHtcbiAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICBhcmdzLFxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBEZWxlZ2F0ZSBmdXJ0aGVyIHBhcnNpbmcgdG8gc2hlbGwgb3Igbm9uLXNoZWxsXG4gICAgcmV0dXJuIG9wdGlvbnMuc2hlbGwgPyBwYXJzZWQgOiBwYXJzZU5vblNoZWxsKHBhcnNlZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpc1dpbiA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG5cbmZ1bmN0aW9uIG5vdEZvdW5kRXJyb3Iob3JpZ2luYWwsIHN5c2NhbGwpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoYCR7c3lzY2FsbH0gJHtvcmlnaW5hbC5jb21tYW5kfSBFTk9FTlRgKSwge1xuICAgICAgICBjb2RlOiAnRU5PRU5UJyxcbiAgICAgICAgZXJybm86ICdFTk9FTlQnLFxuICAgICAgICBzeXNjYWxsOiBgJHtzeXNjYWxsfSAke29yaWdpbmFsLmNvbW1hbmR9YCxcbiAgICAgICAgcGF0aDogb3JpZ2luYWwuY29tbWFuZCxcbiAgICAgICAgc3Bhd25hcmdzOiBvcmlnaW5hbC5hcmdzLFxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBob29rQ2hpbGRQcm9jZXNzKGNwLCBwYXJzZWQpIHtcbiAgICBpZiAoIWlzV2luKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvcmlnaW5hbEVtaXQgPSBjcC5lbWl0O1xuXG4gICAgY3AuZW1pdCA9IGZ1bmN0aW9uIChuYW1lLCBhcmcxKSB7XG4gICAgICAgIC8vIElmIGVtaXR0aW5nIFwiZXhpdFwiIGV2ZW50IGFuZCBleGl0IGNvZGUgaXMgMSwgd2UgbmVlZCB0byBjaGVjayBpZlxuICAgICAgICAvLyB0aGUgY29tbWFuZCBleGlzdHMgYW5kIGVtaXQgYW4gXCJlcnJvclwiIGluc3RlYWRcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9JbmRpZ29Vbml0ZWQvbm9kZS1jcm9zcy1zcGF3bi9pc3N1ZXMvMTZcbiAgICAgICAgaWYgKG5hbWUgPT09ICdleGl0Jykge1xuICAgICAgICAgICAgY29uc3QgZXJyID0gdmVyaWZ5RU5PRU5UKGFyZzEsIHBhcnNlZCwgJ3NwYXduJyk7XG5cbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxFbWl0LmNhbGwoY3AsICdlcnJvcicsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3JpZ2luYWxFbWl0LmFwcGx5KGNwLCBhcmd1bWVudHMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIHZlcmlmeUVOT0VOVChzdGF0dXMsIHBhcnNlZCkge1xuICAgIGlmIChpc1dpbiAmJiBzdGF0dXMgPT09IDEgJiYgIXBhcnNlZC5maWxlKSB7XG4gICAgICAgIHJldHVybiBub3RGb3VuZEVycm9yKHBhcnNlZC5vcmlnaW5hbCwgJ3NwYXduJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeUVOT0VOVFN5bmMoc3RhdHVzLCBwYXJzZWQpIHtcbiAgICBpZiAoaXNXaW4gJiYgc3RhdHVzID09PSAxICYmICFwYXJzZWQuZmlsZSkge1xuICAgICAgICByZXR1cm4gbm90Rm91bmRFcnJvcihwYXJzZWQub3JpZ2luYWwsICdzcGF3blN5bmMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaG9va0NoaWxkUHJvY2VzcyxcbiAgICB2ZXJpZnlFTk9FTlQsXG4gICAgdmVyaWZ5RU5PRU5UU3luYyxcbiAgICBub3RGb3VuZEVycm9yLFxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNwID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpO1xuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL2xpYi9wYXJzZScpO1xuY29uc3QgZW5vZW50ID0gcmVxdWlyZSgnLi9saWIvZW5vZW50Jyk7XG5cbmZ1bmN0aW9uIHNwYXduKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICAvLyBQYXJzZSB0aGUgYXJndW1lbnRzXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2UoY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG5cbiAgICAvLyBTcGF3biB0aGUgY2hpbGQgcHJvY2Vzc1xuICAgIGNvbnN0IHNwYXduZWQgPSBjcC5zcGF3bihwYXJzZWQuY29tbWFuZCwgcGFyc2VkLmFyZ3MsIHBhcnNlZC5vcHRpb25zKTtcblxuICAgIC8vIEhvb2sgaW50byBjaGlsZCBwcm9jZXNzIFwiZXhpdFwiIGV2ZW50IHRvIGVtaXQgYW4gZXJyb3IgaWYgdGhlIGNvbW1hbmRcbiAgICAvLyBkb2VzIG5vdCBleGlzdHMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0luZGlnb1VuaXRlZC9ub2RlLWNyb3NzLXNwYXduL2lzc3Vlcy8xNlxuICAgIGVub2VudC5ob29rQ2hpbGRQcm9jZXNzKHNwYXduZWQsIHBhcnNlZCk7XG5cbiAgICByZXR1cm4gc3Bhd25lZDtcbn1cblxuZnVuY3Rpb24gc3Bhd25TeW5jKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICAvLyBQYXJzZSB0aGUgYXJndW1lbnRzXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2UoY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG5cbiAgICAvLyBTcGF3biB0aGUgY2hpbGQgcHJvY2Vzc1xuICAgIGNvbnN0IHJlc3VsdCA9IGNwLnNwYXduU3luYyhwYXJzZWQuY29tbWFuZCwgcGFyc2VkLmFyZ3MsIHBhcnNlZC5vcHRpb25zKTtcblxuICAgIC8vIEFuYWx5emUgaWYgdGhlIGNvbW1hbmQgZG9lcyBub3QgZXhpc3QsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0luZGlnb1VuaXRlZC9ub2RlLWNyb3NzLXNwYXduL2lzc3Vlcy8xNlxuICAgIHJlc3VsdC5lcnJvciA9IHJlc3VsdC5lcnJvciB8fCBlbm9lbnQudmVyaWZ5RU5PRU5UU3luYyhyZXN1bHQuc3RhdHVzLCBwYXJzZWQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzcGF3bjtcbm1vZHVsZS5leHBvcnRzLnNwYXduID0gc3Bhd247XG5tb2R1bGUuZXhwb3J0cy5zeW5jID0gc3Bhd25TeW5jO1xuXG5tb2R1bGUuZXhwb3J0cy5fcGFyc2UgPSBwYXJzZTtcbm1vZHVsZS5leHBvcnRzLl9lbm9lbnQgPSBlbm9lbnQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0ID0+IHtcblx0Y29uc3QgTEYgPSB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gJ1xcbicgOiAnXFxuJy5jaGFyQ29kZUF0KCk7XG5cdGNvbnN0IENSID0gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/ICdcXHInIDogJ1xccicuY2hhckNvZGVBdCgpO1xuXG5cdGlmIChpbnB1dFtpbnB1dC5sZW5ndGggLSAxXSA9PT0gTEYpIHtcblx0XHRpbnB1dCA9IGlucHV0LnNsaWNlKDAsIGlucHV0Lmxlbmd0aCAtIDEpO1xuXHR9XG5cblx0aWYgKGlucHV0W2lucHV0Lmxlbmd0aCAtIDFdID09PSBDUikge1xuXHRcdGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgaW5wdXQubGVuZ3RoIC0gMSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBwYXRoS2V5ID0gcmVxdWlyZSgncGF0aC1rZXknKTtcblxuY29uc3QgbnBtUnVuUGF0aCA9IG9wdGlvbnMgPT4ge1xuXHRvcHRpb25zID0ge1xuXHRcdGN3ZDogcHJvY2Vzcy5jd2QoKSxcblx0XHRwYXRoOiBwcm9jZXNzLmVudltwYXRoS2V5KCldLFxuXHRcdGV4ZWNQYXRoOiBwcm9jZXNzLmV4ZWNQYXRoLFxuXHRcdC4uLm9wdGlvbnNcblx0fTtcblxuXHRsZXQgcHJldmlvdXM7XG5cdGxldCBjd2RQYXRoID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMuY3dkKTtcblx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0d2hpbGUgKHByZXZpb3VzICE9PSBjd2RQYXRoKSB7XG5cdFx0cmVzdWx0LnB1c2gocGF0aC5qb2luKGN3ZFBhdGgsICdub2RlX21vZHVsZXMvLmJpbicpKTtcblx0XHRwcmV2aW91cyA9IGN3ZFBhdGg7XG5cdFx0Y3dkUGF0aCA9IHBhdGgucmVzb2x2ZShjd2RQYXRoLCAnLi4nKTtcblx0fVxuXG5cdC8vIEVuc3VyZSB0aGUgcnVubmluZyBgbm9kZWAgYmluYXJ5IGlzIHVzZWRcblx0Y29uc3QgZXhlY1BhdGhEaXIgPSBwYXRoLnJlc29sdmUob3B0aW9ucy5jd2QsIG9wdGlvbnMuZXhlY1BhdGgsICcuLicpO1xuXHRyZXN1bHQucHVzaChleGVjUGF0aERpcik7XG5cblx0cmV0dXJuIHJlc3VsdC5jb25jYXQob3B0aW9ucy5wYXRoKS5qb2luKHBhdGguZGVsaW1pdGVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbnBtUnVuUGF0aDtcbi8vIFRPRE86IFJlbW92ZSB0aGlzIGZvciB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gbnBtUnVuUGF0aDtcblxubW9kdWxlLmV4cG9ydHMuZW52ID0gb3B0aW9ucyA9PiB7XG5cdG9wdGlvbnMgPSB7XG5cdFx0ZW52OiBwcm9jZXNzLmVudixcblx0XHQuLi5vcHRpb25zXG5cdH07XG5cblx0Y29uc3QgZW52ID0gey4uLm9wdGlvbnMuZW52fTtcblx0Y29uc3QgcGF0aCA9IHBhdGhLZXkoe2Vudn0pO1xuXG5cdG9wdGlvbnMucGF0aCA9IGVudltwYXRoXTtcblx0ZW52W3BhdGhdID0gbW9kdWxlLmV4cG9ydHMob3B0aW9ucyk7XG5cblx0cmV0dXJuIGVudjtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtaW1pY0ZuID0gKHRvLCBmcm9tKSA9PiB7XG5cdGZvciAoY29uc3QgcHJvcCBvZiBSZWZsZWN0Lm93bktleXMoZnJvbSkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sIHByb3AsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnJvbSwgcHJvcCkpO1xuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtaW1pY0ZuO1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgZm9yIHRoZSBuZXh0IG1ham9yIHJlbGVhc2Vcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtaW1pY0ZuO1xuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IG1pbWljRm4gPSByZXF1aXJlKCdtaW1pYy1mbicpO1xuXG5jb25zdCBjYWxsZWRGdW5jdGlvbnMgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBvbmV0aW1lID0gKGZ1bmN0aW9uXywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGlmICh0eXBlb2YgZnVuY3Rpb25fICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBmdW5jdGlvbicpO1xuXHR9XG5cblx0bGV0IHJldHVyblZhbHVlO1xuXHRsZXQgY2FsbENvdW50ID0gMDtcblx0Y29uc3QgZnVuY3Rpb25OYW1lID0gZnVuY3Rpb25fLmRpc3BsYXlOYW1lIHx8IGZ1bmN0aW9uXy5uYW1lIHx8ICc8YW5vbnltb3VzPic7XG5cblx0Y29uc3Qgb25ldGltZSA9IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0Y2FsbGVkRnVuY3Rpb25zLnNldChvbmV0aW1lLCArK2NhbGxDb3VudCk7XG5cblx0XHRpZiAoY2FsbENvdW50ID09PSAxKSB7XG5cdFx0XHRyZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uXy5hcHBseSh0aGlzLCBhcmd1bWVudHNfKTtcblx0XHRcdGZ1bmN0aW9uXyA9IG51bGw7XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLnRocm93ID09PSB0cnVlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uIFxcYCR7ZnVuY3Rpb25OYW1lfVxcYCBjYW4gb25seSBiZSBjYWxsZWQgb25jZWApO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXR1cm5WYWx1ZTtcblx0fTtcblxuXHRtaW1pY0ZuKG9uZXRpbWUsIGZ1bmN0aW9uXyk7XG5cdGNhbGxlZEZ1bmN0aW9ucy5zZXQob25ldGltZSwgY2FsbENvdW50KTtcblxuXHRyZXR1cm4gb25ldGltZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gb25ldGltZTtcbi8vIFRPRE86IFJlbW92ZSB0aGlzIGZvciB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gb25ldGltZTtcblxubW9kdWxlLmV4cG9ydHMuY2FsbENvdW50ID0gZnVuY3Rpb25fID0+IHtcblx0aWYgKCFjYWxsZWRGdW5jdGlvbnMuaGFzKGZ1bmN0aW9uXykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoZSBnaXZlbiBmdW5jdGlvbiBcXGAke2Z1bmN0aW9uXy5uYW1lfVxcYCBpcyBub3Qgd3JhcHBlZCBieSB0aGUgXFxgb25ldGltZVxcYCBwYWNrYWdlYCk7XG5cdH1cblxuXHRyZXR1cm4gY2FsbGVkRnVuY3Rpb25zLmdldChmdW5jdGlvbl8pO1xufTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGluZXMgKi9cbi8vIExpc3Qgb2Yga25vd24gcHJvY2VzcyBzaWduYWxzIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlbVxuZXhwb3J0IGNvbnN0IFNJR05BTFMgPSBbXG4gIHtcbiAgICBuYW1lOiAnU0lHSFVQJyxcbiAgICBudW1iZXI6IDEsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1Rlcm1pbmFsIGNsb3NlZCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHSU5UJyxcbiAgICBudW1iZXI6IDIsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1VzZXIgaW50ZXJydXB0aW9uIHdpdGggQ1RSTC1DJyxcbiAgICBzdGFuZGFyZDogJ2Fuc2knLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1FVSVQnLFxuICAgIG51bWJlcjogMyxcbiAgICBhY3Rpb246ICdjb3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1VzZXIgaW50ZXJydXB0aW9uIHdpdGggQ1RSTC1cXFxcJyxcbiAgICBzdGFuZGFyZDogJ3Bvc2l4JyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdJTEwnLFxuICAgIG51bWJlcjogNCxcbiAgICBhY3Rpb246ICdjb3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0ludmFsaWQgbWFjaGluZSBpbnN0cnVjdGlvbicsXG4gICAgc3RhbmRhcmQ6ICdhbnNpJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdUUkFQJyxcbiAgICBudW1iZXI6IDUsXG4gICAgYWN0aW9uOiAnY29yZScsXG4gICAgZGVzY3JpcHRpb246ICdEZWJ1Z2dlciBicmVha3BvaW50JyxcbiAgICBzdGFuZGFyZDogJ3Bvc2l4JyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdBQlJUJyxcbiAgICBudW1iZXI6IDYsXG4gICAgYWN0aW9uOiAnY29yZScsXG4gICAgZGVzY3JpcHRpb246ICdBYm9ydGVkJyxcbiAgICBzdGFuZGFyZDogJ2Fuc2knLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0lPVCcsXG4gICAgbnVtYmVyOiA2LFxuICAgIGFjdGlvbjogJ2NvcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnQWJvcnRlZCcsXG4gICAgc3RhbmRhcmQ6ICdic2QnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0JVUycsXG4gICAgbnVtYmVyOiA3LFxuICAgIGFjdGlvbjogJ2NvcmUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0J1cyBlcnJvciBkdWUgdG8gbWlzYWxpZ25lZCwgbm9uLWV4aXN0aW5nIGFkZHJlc3Mgb3IgcGFnaW5nIGVycm9yJyxcbiAgICBzdGFuZGFyZDogJ2JzZCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHRU1UJyxcbiAgICBudW1iZXI6IDcsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0NvbW1hbmQgc2hvdWxkIGJlIGVtdWxhdGVkIGJ1dCBpcyBub3QgaW1wbGVtZW50ZWQnLFxuICAgIHN0YW5kYXJkOiAnb3RoZXInLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0ZQRScsXG4gICAgbnVtYmVyOiA4LFxuICAgIGFjdGlvbjogJ2NvcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnRmxvYXRpbmcgcG9pbnQgYXJpdGhtZXRpYyBlcnJvcicsXG4gICAgc3RhbmRhcmQ6ICdhbnNpJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdLSUxMJyxcbiAgICBudW1iZXI6IDksXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0ZvcmNlZCB0ZXJtaW5hdGlvbicsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gICAgZm9yY2VkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1VTUjEnLFxuICAgIG51bWJlcjogMTAsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0FwcGxpY2F0aW9uLXNwZWNpZmljIHNpZ25hbCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHU0VHVicsXG4gICAgbnVtYmVyOiAxMSxcbiAgICBhY3Rpb246ICdjb3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1NlZ21lbnRhdGlvbiBmYXVsdCcsXG4gICAgc3RhbmRhcmQ6ICdhbnNpJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdVU1IyJyxcbiAgICBudW1iZXI6IDEyLFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdBcHBsaWNhdGlvbi1zcGVjaWZpYyBzaWduYWwnLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1BJUEUnLFxuICAgIG51bWJlcjogMTMsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0Jyb2tlbiBwaXBlIG9yIHNvY2tldCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHQUxSTScsXG4gICAgbnVtYmVyOiAxNCxcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnVGltZW91dCBvciB0aW1lcicsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHVEVSTScsXG4gICAgbnVtYmVyOiAxNSxcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnVGVybWluYXRpb24nLFxuICAgIHN0YW5kYXJkOiAnYW5zaScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHU1RLRkxUJyxcbiAgICBudW1iZXI6IDE2LFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdTdGFjayBpcyBlbXB0eSBvciBvdmVyZmxvd2VkJyxcbiAgICBzdGFuZGFyZDogJ290aGVyJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdDSExEJyxcbiAgICBudW1iZXI6IDE3LFxuICAgIGFjdGlvbjogJ2lnbm9yZScsXG4gICAgZGVzY3JpcHRpb246ICdDaGlsZCBwcm9jZXNzIHRlcm1pbmF0ZWQsIHBhdXNlZCBvciB1bnBhdXNlZCcsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHQ0xEJyxcbiAgICBudW1iZXI6IDE3LFxuICAgIGFjdGlvbjogJ2lnbm9yZScsXG4gICAgZGVzY3JpcHRpb246ICdDaGlsZCBwcm9jZXNzIHRlcm1pbmF0ZWQsIHBhdXNlZCBvciB1bnBhdXNlZCcsXG4gICAgc3RhbmRhcmQ6ICdvdGhlcicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHQ09OVCcsXG4gICAgbnVtYmVyOiAxOCxcbiAgICBhY3Rpb246ICd1bnBhdXNlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1VucGF1c2VkJyxcbiAgICBzdGFuZGFyZDogJ3Bvc2l4JyxcbiAgICBmb3JjZWQ6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHU1RPUCcsXG4gICAgbnVtYmVyOiAxOSxcbiAgICBhY3Rpb246ICdwYXVzZScsXG4gICAgZGVzY3JpcHRpb246ICdQYXVzZWQnLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICAgIGZvcmNlZDogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdUU1RQJyxcbiAgICBudW1iZXI6IDIwLFxuICAgIGFjdGlvbjogJ3BhdXNlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BhdXNlZCB1c2luZyBDVFJMLVogb3IgXCJzdXNwZW5kXCInLFxuICAgIHN0YW5kYXJkOiAncG9zaXgnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1RUSU4nLFxuICAgIG51bWJlcjogMjEsXG4gICAgYWN0aW9uOiAncGF1c2UnLFxuICAgIGRlc2NyaXB0aW9uOiAnQmFja2dyb3VuZCBwcm9jZXNzIGNhbm5vdCByZWFkIHRlcm1pbmFsIGlucHV0JyxcbiAgICBzdGFuZGFyZDogJ3Bvc2l4JyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdCUkVBSycsXG4gICAgbnVtYmVyOiAyMSxcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnVXNlciBpbnRlcnJ1cHRpb24gd2l0aCBDVFJMLUJSRUFLJyxcbiAgICBzdGFuZGFyZDogJ290aGVyJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdUVE9VJyxcbiAgICBudW1iZXI6IDIyLFxuICAgIGFjdGlvbjogJ3BhdXNlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0JhY2tncm91bmQgcHJvY2VzcyBjYW5ub3Qgd3JpdGUgdG8gdGVybWluYWwgb3V0cHV0JyxcbiAgICBzdGFuZGFyZDogJ3Bvc2l4JyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdVUkcnLFxuICAgIG51bWJlcjogMjMsXG4gICAgYWN0aW9uOiAnaWdub3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1NvY2tldCByZWNlaXZlZCBvdXQtb2YtYmFuZCBkYXRhJyxcbiAgICBzdGFuZGFyZDogJ2JzZCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHWENQVScsXG4gICAgbnVtYmVyOiAyNCxcbiAgICBhY3Rpb246ICdjb3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1Byb2Nlc3MgdGltZWQgb3V0JyxcbiAgICBzdGFuZGFyZDogJ2JzZCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnU0lHWEZTWicsXG4gICAgbnVtYmVyOiAyNSxcbiAgICBhY3Rpb246ICdjb3JlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0ZpbGUgdG9vIGJpZycsXG4gICAgc3RhbmRhcmQ6ICdic2QnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1ZUQUxSTScsXG4gICAgbnVtYmVyOiAyNixcbiAgICBhY3Rpb246ICd0ZXJtaW5hdGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnVGltZW91dCBvciB0aW1lcicsXG4gICAgc3RhbmRhcmQ6ICdic2QnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR1BST0YnLFxuICAgIG51bWJlcjogMjcsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1RpbWVvdXQgb3IgdGltZXInLFxuICAgIHN0YW5kYXJkOiAnYnNkJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdXSU5DSCcsXG4gICAgbnVtYmVyOiAyOCxcbiAgICBhY3Rpb246ICdpZ25vcmUnLFxuICAgIGRlc2NyaXB0aW9uOiAnVGVybWluYWwgd2luZG93IHNpemUgY2hhbmdlZCcsXG4gICAgc3RhbmRhcmQ6ICdic2QnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NJR0lPJyxcbiAgICBudW1iZXI6IDI5LFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdJL08gaXMgYXZhaWxhYmxlJyxcbiAgICBzdGFuZGFyZDogJ290aGVyJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdQT0xMJyxcbiAgICBudW1iZXI6IDI5LFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdXYXRjaGVkIGV2ZW50JyxcbiAgICBzdGFuZGFyZDogJ290aGVyJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdJTkZPJyxcbiAgICBudW1iZXI6IDI5LFxuICAgIGFjdGlvbjogJ2lnbm9yZScsXG4gICAgZGVzY3JpcHRpb246ICdSZXF1ZXN0IGZvciBwcm9jZXNzIGluZm9ybWF0aW9uJyxcbiAgICBzdGFuZGFyZDogJ290aGVyJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdQV1InLFxuICAgIG51bWJlcjogMzAsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0RldmljZSBydW5uaW5nIG91dCBvZiBwb3dlcicsXG4gICAgc3RhbmRhcmQ6ICdzeXN0ZW12JyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdTWVMnLFxuICAgIG51bWJlcjogMzEsXG4gICAgYWN0aW9uOiAnY29yZScsXG4gICAgZGVzY3JpcHRpb246ICdJbnZhbGlkIHN5c3RlbSBjYWxsJyxcbiAgICBzdGFuZGFyZDogJ290aGVyJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTSUdVTlVTRUQnLFxuICAgIG51bWJlcjogMzEsXG4gICAgYWN0aW9uOiAndGVybWluYXRlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0ludmFsaWQgc3lzdGVtIGNhbGwnLFxuICAgIHN0YW5kYXJkOiAnb3RoZXInLFxuICB9LFxuXVxuLyogZXNsaW50LWVuYWJsZSBtYXgtbGluZXMgKi9cbiIsICIvLyBMaXN0IG9mIHJlYWx0aW1lIHNpZ25hbHMgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGVtXG5leHBvcnQgY29uc3QgZ2V0UmVhbHRpbWVTaWduYWxzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGxlbmd0aCA9IFNJR1JUTUFYIC0gU0lHUlRNSU4gKyAxXG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoIH0sIGdldFJlYWx0aW1lU2lnbmFsKVxufVxuXG5jb25zdCBnZXRSZWFsdGltZVNpZ25hbCA9IGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IGBTSUdSVCR7aW5kZXggKyAxfWAsXG4gICAgbnVtYmVyOiBTSUdSVE1JTiArIGluZGV4LFxuICAgIGFjdGlvbjogJ3Rlcm1pbmF0ZScsXG4gICAgZGVzY3JpcHRpb246ICdBcHBsaWNhdGlvbi1zcGVjaWZpYyBzaWduYWwgKHJlYWx0aW1lKScsXG4gICAgc3RhbmRhcmQ6ICdwb3NpeCcsXG4gIH1cbn1cblxuY29uc3QgU0lHUlRNSU4gPSAzNFxuZXhwb3J0IGNvbnN0IFNJR1JUTUFYID0gNjRcbiIsICJpbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tICdvcydcblxuaW1wb3J0IHsgU0lHTkFMUyB9IGZyb20gJy4vY29yZS5qcydcbmltcG9ydCB7IGdldFJlYWx0aW1lU2lnbmFscyB9IGZyb20gJy4vcmVhbHRpbWUuanMnXG5cbi8vIFJldHJpZXZlIGxpc3Qgb2Yga25vdyBzaWduYWxzIChpbmNsdWRpbmcgcmVhbHRpbWUpIHdpdGggaW5mb3JtYXRpb24gYWJvdXRcbi8vIHRoZW1cbmV4cG9ydCBjb25zdCBnZXRTaWduYWxzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHJlYWx0aW1lU2lnbmFscyA9IGdldFJlYWx0aW1lU2lnbmFscygpXG4gIGNvbnN0IHNpZ25hbHMgPSBbLi4uU0lHTkFMUywgLi4ucmVhbHRpbWVTaWduYWxzXS5tYXAobm9ybWFsaXplU2lnbmFsKVxuICByZXR1cm4gc2lnbmFsc1xufVxuXG4vLyBOb3JtYWxpemUgc2lnbmFsOlxuLy8gIC0gYG51bWJlcmA6IHNpZ25hbCBudW1iZXJzIGFyZSBPUy1zcGVjaWZpYy4gVGhpcyBpcyB0YWtlbiBpbnRvIGFjY291bnQgYnlcbi8vICAgIGBvcy5jb25zdGFudHMuc2lnbmFsc2AuIEhvd2V2ZXIgd2UgcHJvdmlkZSBhIGRlZmF1bHQgYG51bWJlcmAgc2luY2Ugc29tZVxuLy8gICAgIHNpZ25hbHMgYXJlIG5vdCBkZWZpbmVkIGZvciBzb21lIE9TLlxuLy8gIC0gYGZvcmNlZGA6IHNldCBkZWZhdWx0IHRvIGBmYWxzZWBcbi8vICAtIGBzdXBwb3J0ZWRgOiBzZXQgdmFsdWVcbmNvbnN0IG5vcm1hbGl6ZVNpZ25hbCA9IGZ1bmN0aW9uKHtcbiAgbmFtZSxcbiAgbnVtYmVyOiBkZWZhdWx0TnVtYmVyLFxuICBkZXNjcmlwdGlvbixcbiAgYWN0aW9uLFxuICBmb3JjZWQgPSBmYWxzZSxcbiAgc3RhbmRhcmQsXG59KSB7XG4gIGNvbnN0IHtcbiAgICBzaWduYWxzOiB7IFtuYW1lXTogY29uc3RhbnRTaWduYWwgfSxcbiAgfSA9IGNvbnN0YW50c1xuICBjb25zdCBzdXBwb3J0ZWQgPSBjb25zdGFudFNpZ25hbCAhPT0gdW5kZWZpbmVkXG4gIGNvbnN0IG51bWJlciA9IHN1cHBvcnRlZCA/IGNvbnN0YW50U2lnbmFsIDogZGVmYXVsdE51bWJlclxuICByZXR1cm4geyBuYW1lLCBudW1iZXIsIGRlc2NyaXB0aW9uLCBzdXBwb3J0ZWQsIGFjdGlvbiwgZm9yY2VkLCBzdGFuZGFyZCB9XG59XG4iLCAiaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnb3MnXG5cbmltcG9ydCB7IGdldFNpZ25hbHMgfSBmcm9tICcuL3NpZ25hbHMuanMnXG5pbXBvcnQgeyBTSUdSVE1BWCB9IGZyb20gJy4vcmVhbHRpbWUuanMnXG5cbi8vIFJldHJpZXZlIGBzaWduYWxzQnlOYW1lYCwgYW4gb2JqZWN0IG1hcHBpbmcgc2lnbmFsIG5hbWUgdG8gc2lnbmFsIHByb3BlcnRpZXMuXG4vLyBXZSBtYWtlIHN1cmUgdGhlIG9iamVjdCBpcyBzb3J0ZWQgYnkgYG51bWJlcmAuXG5jb25zdCBnZXRTaWduYWxzQnlOYW1lID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNpZ25hbHMgPSBnZXRTaWduYWxzKClcbiAgcmV0dXJuIHNpZ25hbHMucmVkdWNlKGdldFNpZ25hbEJ5TmFtZSwge30pXG59XG5cbmNvbnN0IGdldFNpZ25hbEJ5TmFtZSA9IGZ1bmN0aW9uKFxuICBzaWduYWxCeU5hbWVNZW1vLFxuICB7IG5hbWUsIG51bWJlciwgZGVzY3JpcHRpb24sIHN1cHBvcnRlZCwgYWN0aW9uLCBmb3JjZWQsIHN0YW5kYXJkIH0sXG4pIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zaWduYWxCeU5hbWVNZW1vLFxuICAgIFtuYW1lXTogeyBuYW1lLCBudW1iZXIsIGRlc2NyaXB0aW9uLCBzdXBwb3J0ZWQsIGFjdGlvbiwgZm9yY2VkLCBzdGFuZGFyZCB9LFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzaWduYWxzQnlOYW1lID0gZ2V0U2lnbmFsc0J5TmFtZSgpXG5cbi8vIFJldHJpZXZlIGBzaWduYWxzQnlOdW1iZXJgLCBhbiBvYmplY3QgbWFwcGluZyBzaWduYWwgbnVtYmVyIHRvIHNpZ25hbFxuLy8gcHJvcGVydGllcy5cbi8vIFdlIG1ha2Ugc3VyZSB0aGUgb2JqZWN0IGlzIHNvcnRlZCBieSBgbnVtYmVyYC5cbmNvbnN0IGdldFNpZ25hbHNCeU51bWJlciA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBzaWduYWxzID0gZ2V0U2lnbmFscygpXG4gIGNvbnN0IGxlbmd0aCA9IFNJR1JUTUFYICsgMVxuICBjb25zdCBzaWduYWxzQSA9IEFycmF5LmZyb20oeyBsZW5ndGggfSwgKHZhbHVlLCBudW1iZXIpID0+XG4gICAgZ2V0U2lnbmFsQnlOdW1iZXIobnVtYmVyLCBzaWduYWxzKSxcbiAgKVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgLi4uc2lnbmFsc0EpXG59XG5cbmNvbnN0IGdldFNpZ25hbEJ5TnVtYmVyID0gZnVuY3Rpb24obnVtYmVyLCBzaWduYWxzKSB7XG4gIGNvbnN0IHNpZ25hbCA9IGZpbmRTaWduYWxCeU51bWJlcihudW1iZXIsIHNpZ25hbHMpXG5cbiAgaWYgKHNpZ25hbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHt9XG4gIH1cblxuICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBzdXBwb3J0ZWQsIGFjdGlvbiwgZm9yY2VkLCBzdGFuZGFyZCB9ID0gc2lnbmFsXG4gIHJldHVybiB7XG4gICAgW251bWJlcl06IHtcbiAgICAgIG5hbWUsXG4gICAgICBudW1iZXIsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHN1cHBvcnRlZCxcbiAgICAgIGFjdGlvbixcbiAgICAgIGZvcmNlZCxcbiAgICAgIHN0YW5kYXJkLFxuICAgIH0sXG4gIH1cbn1cblxuLy8gU2V2ZXJhbCBzaWduYWxzIG1pZ2h0IGVuZCB1cCBzaGFyaW5nIHRoZSBzYW1lIG51bWJlciBiZWNhdXNlIG9mIE9TLXNwZWNpZmljXG4vLyBudW1iZXJzLCBpbiB3aGljaCBjYXNlIHRob3NlIHByZXZhaWwuXG5jb25zdCBmaW5kU2lnbmFsQnlOdW1iZXIgPSBmdW5jdGlvbihudW1iZXIsIHNpZ25hbHMpIHtcbiAgY29uc3Qgc2lnbmFsID0gc2lnbmFscy5maW5kKCh7IG5hbWUgfSkgPT4gY29uc3RhbnRzLnNpZ25hbHNbbmFtZV0gPT09IG51bWJlcilcblxuICBpZiAoc2lnbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc2lnbmFsXG4gIH1cblxuICByZXR1cm4gc2lnbmFscy5maW5kKHNpZ25hbEEgPT4gc2lnbmFsQS5udW1iZXIgPT09IG51bWJlcilcbn1cblxuZXhwb3J0IGNvbnN0IHNpZ25hbHNCeU51bWJlciA9IGdldFNpZ25hbHNCeU51bWJlcigpXG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3Qge3NpZ25hbHNCeU5hbWV9ID0gcmVxdWlyZSgnaHVtYW4tc2lnbmFscycpO1xuXG5jb25zdCBnZXRFcnJvclByZWZpeCA9ICh7dGltZWRPdXQsIHRpbWVvdXQsIGVycm9yQ29kZSwgc2lnbmFsLCBzaWduYWxEZXNjcmlwdGlvbiwgZXhpdENvZGUsIGlzQ2FuY2VsZWR9KSA9PiB7XG5cdGlmICh0aW1lZE91dCkge1xuXHRcdHJldHVybiBgdGltZWQgb3V0IGFmdGVyICR7dGltZW91dH0gbWlsbGlzZWNvbmRzYDtcblx0fVxuXG5cdGlmIChpc0NhbmNlbGVkKSB7XG5cdFx0cmV0dXJuICd3YXMgY2FuY2VsZWQnO1xuXHR9XG5cblx0aWYgKGVycm9yQ29kZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGBmYWlsZWQgd2l0aCAke2Vycm9yQ29kZX1gO1xuXHR9XG5cblx0aWYgKHNpZ25hbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGB3YXMga2lsbGVkIHdpdGggJHtzaWduYWx9ICgke3NpZ25hbERlc2NyaXB0aW9ufSlgO1xuXHR9XG5cblx0aWYgKGV4aXRDb2RlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gYGZhaWxlZCB3aXRoIGV4aXQgY29kZSAke2V4aXRDb2RlfWA7XG5cdH1cblxuXHRyZXR1cm4gJ2ZhaWxlZCc7XG59O1xuXG5jb25zdCBtYWtlRXJyb3IgPSAoe1xuXHRzdGRvdXQsXG5cdHN0ZGVycixcblx0YWxsLFxuXHRlcnJvcixcblx0c2lnbmFsLFxuXHRleGl0Q29kZSxcblx0Y29tbWFuZCxcblx0ZXNjYXBlZENvbW1hbmQsXG5cdHRpbWVkT3V0LFxuXHRpc0NhbmNlbGVkLFxuXHRraWxsZWQsXG5cdHBhcnNlZDoge29wdGlvbnM6IHt0aW1lb3V0fX1cbn0pID0+IHtcblx0Ly8gYHNpZ25hbGAgYW5kIGBleGl0Q29kZWAgZW1pdHRlZCBvbiBgc3Bhd25lZC5vbignZXhpdCcpYCBldmVudCBjYW4gYmUgYG51bGxgLlxuXHQvLyBXZSBub3JtYWxpemUgdGhlbSB0byBgdW5kZWZpbmVkYFxuXHRleGl0Q29kZSA9IGV4aXRDb2RlID09PSBudWxsID8gdW5kZWZpbmVkIDogZXhpdENvZGU7XG5cdHNpZ25hbCA9IHNpZ25hbCA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHNpZ25hbDtcblx0Y29uc3Qgc2lnbmFsRGVzY3JpcHRpb24gPSBzaWduYWwgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNpZ25hbHNCeU5hbWVbc2lnbmFsXS5kZXNjcmlwdGlvbjtcblxuXHRjb25zdCBlcnJvckNvZGUgPSBlcnJvciAmJiBlcnJvci5jb2RlO1xuXG5cdGNvbnN0IHByZWZpeCA9IGdldEVycm9yUHJlZml4KHt0aW1lZE91dCwgdGltZW91dCwgZXJyb3JDb2RlLCBzaWduYWwsIHNpZ25hbERlc2NyaXB0aW9uLCBleGl0Q29kZSwgaXNDYW5jZWxlZH0pO1xuXHRjb25zdCBleGVjYU1lc3NhZ2UgPSBgQ29tbWFuZCAke3ByZWZpeH06ICR7Y29tbWFuZH1gO1xuXHRjb25zdCBpc0Vycm9yID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVycm9yKSA9PT0gJ1tvYmplY3QgRXJyb3JdJztcblx0Y29uc3Qgc2hvcnRNZXNzYWdlID0gaXNFcnJvciA/IGAke2V4ZWNhTWVzc2FnZX1cXG4ke2Vycm9yLm1lc3NhZ2V9YCA6IGV4ZWNhTWVzc2FnZTtcblx0Y29uc3QgbWVzc2FnZSA9IFtzaG9ydE1lc3NhZ2UsIHN0ZGVyciwgc3Rkb3V0XS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cblx0aWYgKGlzRXJyb3IpIHtcblx0XHRlcnJvci5vcmlnaW5hbE1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuXHRcdGVycm9yLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9IGVsc2Uge1xuXHRcdGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuXHR9XG5cblx0ZXJyb3Iuc2hvcnRNZXNzYWdlID0gc2hvcnRNZXNzYWdlO1xuXHRlcnJvci5jb21tYW5kID0gY29tbWFuZDtcblx0ZXJyb3IuZXNjYXBlZENvbW1hbmQgPSBlc2NhcGVkQ29tbWFuZDtcblx0ZXJyb3IuZXhpdENvZGUgPSBleGl0Q29kZTtcblx0ZXJyb3Iuc2lnbmFsID0gc2lnbmFsO1xuXHRlcnJvci5zaWduYWxEZXNjcmlwdGlvbiA9IHNpZ25hbERlc2NyaXB0aW9uO1xuXHRlcnJvci5zdGRvdXQgPSBzdGRvdXQ7XG5cdGVycm9yLnN0ZGVyciA9IHN0ZGVycjtcblxuXHRpZiAoYWxsICE9PSB1bmRlZmluZWQpIHtcblx0XHRlcnJvci5hbGwgPSBhbGw7XG5cdH1cblxuXHRpZiAoJ2J1ZmZlcmVkRGF0YScgaW4gZXJyb3IpIHtcblx0XHRkZWxldGUgZXJyb3IuYnVmZmVyZWREYXRhO1xuXHR9XG5cblx0ZXJyb3IuZmFpbGVkID0gdHJ1ZTtcblx0ZXJyb3IudGltZWRPdXQgPSBCb29sZWFuKHRpbWVkT3V0KTtcblx0ZXJyb3IuaXNDYW5jZWxlZCA9IGlzQ2FuY2VsZWQ7XG5cdGVycm9yLmtpbGxlZCA9IGtpbGxlZCAmJiAhdGltZWRPdXQ7XG5cblx0cmV0dXJuIGVycm9yO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYWtlRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYWxpYXNlcyA9IFsnc3RkaW4nLCAnc3Rkb3V0JywgJ3N0ZGVyciddO1xuXG5jb25zdCBoYXNBbGlhcyA9IG9wdGlvbnMgPT4gYWxpYXNlcy5zb21lKGFsaWFzID0+IG9wdGlvbnNbYWxpYXNdICE9PSB1bmRlZmluZWQpO1xuXG5jb25zdCBub3JtYWxpemVTdGRpbyA9IG9wdGlvbnMgPT4ge1xuXHRpZiAoIW9wdGlvbnMpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCB7c3RkaW99ID0gb3B0aW9ucztcblxuXHRpZiAoc3RkaW8gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBhbGlhc2VzLm1hcChhbGlhcyA9PiBvcHRpb25zW2FsaWFzXSk7XG5cdH1cblxuXHRpZiAoaGFzQWxpYXMob3B0aW9ucykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEl0J3Mgbm90IHBvc3NpYmxlIHRvIHByb3ZpZGUgXFxgc3RkaW9cXGAgaW4gY29tYmluYXRpb24gd2l0aCBvbmUgb2YgJHthbGlhc2VzLm1hcChhbGlhcyA9PiBgXFxgJHthbGlhc31cXGBgKS5qb2luKCcsICcpfWApO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBzdGRpbyA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gc3RkaW87XG5cdH1cblxuXHRpZiAoIUFycmF5LmlzQXJyYXkoc3RkaW8pKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgc3RkaW9cXGAgdG8gYmUgb2YgdHlwZSBcXGBzdHJpbmdcXGAgb3IgXFxgQXJyYXlcXGAsIGdvdCBcXGAke3R5cGVvZiBzdGRpb31cXGBgKTtcblx0fVxuXG5cdGNvbnN0IGxlbmd0aCA9IE1hdGgubWF4KHN0ZGlvLmxlbmd0aCwgYWxpYXNlcy5sZW5ndGgpO1xuXHRyZXR1cm4gQXJyYXkuZnJvbSh7bGVuZ3RofSwgKHZhbHVlLCBpbmRleCkgPT4gc3RkaW9baW5kZXhdKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplU3RkaW87XG5cbi8vIGBpcGNgIGlzIHB1c2hlZCB1bmxlc3MgaXQgaXMgYWxyZWFkeSBwcmVzZW50XG5tb2R1bGUuZXhwb3J0cy5ub2RlID0gb3B0aW9ucyA9PiB7XG5cdGNvbnN0IHN0ZGlvID0gbm9ybWFsaXplU3RkaW8ob3B0aW9ucyk7XG5cblx0aWYgKHN0ZGlvID09PSAnaXBjJykge1xuXHRcdHJldHVybiAnaXBjJztcblx0fVxuXG5cdGlmIChzdGRpbyA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdGRpbyA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gW3N0ZGlvLCBzdGRpbywgc3RkaW8sICdpcGMnXTtcblx0fVxuXG5cdGlmIChzdGRpby5pbmNsdWRlcygnaXBjJykpIHtcblx0XHRyZXR1cm4gc3RkaW87XG5cdH1cblxuXHRyZXR1cm4gWy4uLnN0ZGlvLCAnaXBjJ107XG59O1xuIiwgIi8vIFRoaXMgaXMgbm90IHRoZSBzZXQgb2YgYWxsIHBvc3NpYmxlIHNpZ25hbHMuXG4vL1xuLy8gSXQgSVMsIGhvd2V2ZXIsIHRoZSBzZXQgb2YgYWxsIHNpZ25hbHMgdGhhdCB0cmlnZ2VyXG4vLyBhbiBleGl0IG9uIGVpdGhlciBMaW51eCBvciBCU0Qgc3lzdGVtcy4gIExpbnV4IGlzIGFcbi8vIHN1cGVyc2V0IG9mIHRoZSBzaWduYWwgbmFtZXMgc3VwcG9ydGVkIG9uIEJTRCwgYW5kXG4vLyB0aGUgdW5rbm93biBzaWduYWxzIGp1c3QgZmFpbCB0byByZWdpc3Rlciwgc28gd2UgY2FuXG4vLyBjYXRjaCB0aGF0IGVhc2lseSBlbm91Z2guXG4vL1xuLy8gRG9uJ3QgYm90aGVyIHdpdGggU0lHS0lMTC4gIEl0J3MgdW5jYXRjaGFibGUsIHdoaWNoXG4vLyBtZWFucyB0aGF0IHdlIGNhbid0IGZpcmUgYW55IGNhbGxiYWNrcyBhbnl3YXkuXG4vL1xuLy8gSWYgYSB1c2VyIGRvZXMgaGFwcGVuIHRvIHJlZ2lzdGVyIGEgaGFuZGxlciBvbiBhIG5vbi1cbi8vIGZhdGFsIHNpZ25hbCBsaWtlIFNJR1dJTkNIIG9yIHNvbWV0aGluZywgYW5kIHRoZW5cbi8vIGV4aXQsIGl0J2xsIGVuZCB1cCBmaXJpbmcgYHByb2Nlc3MuZW1pdCgnZXhpdCcpYCwgc29cbi8vIHRoZSBoYW5kbGVyIHdpbGwgYmUgZmlyZWQgYW55d2F5LlxuLy9cbi8vIFNJR0JVUywgU0lHRlBFLCBTSUdTRUdWIGFuZCBTSUdJTEwsIHdoZW4gbm90IHJhaXNlZFxuLy8gYXJ0aWZpY2lhbGx5LCBpbmhlcmVudGx5IGxlYXZlIHRoZSBwcm9jZXNzIGluIGFcbi8vIHN0YXRlIGZyb20gd2hpY2ggaXQgaXMgbm90IHNhZmUgdG8gdHJ5IGFuZCBlbnRlciBKU1xuLy8gbGlzdGVuZXJzLlxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdTSUdBQlJUJyxcbiAgJ1NJR0FMUk0nLFxuICAnU0lHSFVQJyxcbiAgJ1NJR0lOVCcsXG4gICdTSUdURVJNJ1xuXVxuXG5pZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ3dpbjMyJykge1xuICBtb2R1bGUuZXhwb3J0cy5wdXNoKFxuICAgICdTSUdWVEFMUk0nLFxuICAgICdTSUdYQ1BVJyxcbiAgICAnU0lHWEZTWicsXG4gICAgJ1NJR1VTUjInLFxuICAgICdTSUdUUkFQJyxcbiAgICAnU0lHU1lTJyxcbiAgICAnU0lHUVVJVCcsXG4gICAgJ1NJR0lPVCdcbiAgICAvLyBzaG91bGQgZGV0ZWN0IHByb2ZpbGVyIGFuZCBlbmFibGUvZGlzYWJsZSBhY2NvcmRpbmdseS5cbiAgICAvLyBzZWUgIzIxXG4gICAgLy8gJ1NJR1BST0YnXG4gIClcbn1cblxuaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMucHVzaChcbiAgICAnU0lHSU8nLFxuICAgICdTSUdQT0xMJyxcbiAgICAnU0lHUFdSJyxcbiAgICAnU0lHU1RLRkxUJyxcbiAgICAnU0lHVU5VU0VEJ1xuICApXG59XG4iLCAiLy8gTm90ZTogc2luY2UgbnljIHVzZXMgdGhpcyBtb2R1bGUgdG8gb3V0cHV0IGNvdmVyYWdlLCBhbnkgbGluZXNcbi8vIHRoYXQgYXJlIGluIHRoZSBkaXJlY3Qgc3luYyBmbG93IG9mIG55YydzIG91dHB1dENvdmVyYWdlIGFyZVxuLy8gaWdub3JlZCwgc2luY2Ugd2UgY2FuIG5ldmVyIGdldCBjb3ZlcmFnZSBmb3IgdGhlbS5cbi8vIGdyYWIgYSByZWZlcmVuY2UgdG8gbm9kZSdzIHJlYWwgcHJvY2VzcyBvYmplY3QgcmlnaHQgYXdheVxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2Vzc1xuXG5jb25zdCBwcm9jZXNzT2sgPSBmdW5jdGlvbiAocHJvY2Vzcykge1xuICByZXR1cm4gcHJvY2VzcyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHByb2Nlc3MuZW1pdCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLnJlYWxseUV4aXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy5saXN0ZW5lcnMgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy5raWxsID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHByb2Nlc3MucGlkID09PSAnbnVtYmVyJyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLm9uID09PSAnZnVuY3Rpb24nXG59XG5cbi8vIHNvbWUga2luZCBvZiBub24tbm9kZSBlbnZpcm9ubWVudCwganVzdCBuby1vcFxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIXByb2Nlc3NPayhwcm9jZXNzKSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHt9XG59IGVsc2Uge1xuICB2YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbiAgdmFyIHNpZ25hbHMgPSByZXF1aXJlKCcuL3NpZ25hbHMuanMnKVxuICB2YXIgaXNXaW4gPSAvXndpbi9pLnRlc3QocHJvY2Vzcy5wbGF0Zm9ybSlcblxuICB2YXIgRUUgPSByZXF1aXJlKCdldmVudHMnKVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBFRSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIEVFID0gRUUuRXZlbnRFbWl0dGVyXG4gIH1cblxuICB2YXIgZW1pdHRlclxuICBpZiAocHJvY2Vzcy5fX3NpZ25hbF9leGl0X2VtaXR0ZXJfXykge1xuICAgIGVtaXR0ZXIgPSBwcm9jZXNzLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fXG4gIH0gZWxzZSB7XG4gICAgZW1pdHRlciA9IHByb2Nlc3MuX19zaWduYWxfZXhpdF9lbWl0dGVyX18gPSBuZXcgRUUoKVxuICAgIGVtaXR0ZXIuY291bnQgPSAwXG4gICAgZW1pdHRlci5lbWl0dGVkID0ge31cbiAgfVxuXG4gIC8vIEJlY2F1c2UgdGhpcyBlbWl0dGVyIGlzIGEgZ2xvYmFsLCB3ZSBoYXZlIHRvIGNoZWNrIHRvIHNlZSBpZiBhXG4gIC8vIHByZXZpb3VzIHZlcnNpb24gb2YgdGhpcyBsaWJyYXJ5IGZhaWxlZCB0byBlbmFibGUgaW5maW5pdGUgbGlzdGVuZXJzLlxuICAvLyBJIGtub3cgd2hhdCB5b3UncmUgYWJvdXQgdG8gc2F5LiAgQnV0IGxpdGVyYWxseSBldmVyeXRoaW5nIGFib3V0XG4gIC8vIHNpZ25hbC1leGl0IGlzIGEgY29tcHJvbWlzZSB3aXRoIGV2aWwuICBHZXQgdXNlZCB0byBpdC5cbiAgaWYgKCFlbWl0dGVyLmluZmluaXRlKSB7XG4gICAgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoSW5maW5pdHkpXG4gICAgZW1pdHRlci5pbmZpbml0ZSA9IHRydWVcbiAgfVxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNiLCBvcHRzKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFwcm9jZXNzT2soZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2EgY2FsbGJhY2sgbXVzdCBiZSBwcm92aWRlZCBmb3IgZXhpdCBoYW5kbGVyJylcblxuICAgIGlmIChsb2FkZWQgPT09IGZhbHNlKSB7XG4gICAgICBsb2FkKClcbiAgICB9XG5cbiAgICB2YXIgZXYgPSAnZXhpdCdcbiAgICBpZiAob3B0cyAmJiBvcHRzLmFsd2F5c0xhc3QpIHtcbiAgICAgIGV2ID0gJ2FmdGVyZXhpdCdcbiAgICB9XG5cbiAgICB2YXIgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihldiwgY2IpXG4gICAgICBpZiAoZW1pdHRlci5saXN0ZW5lcnMoJ2V4aXQnKS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICBlbWl0dGVyLmxpc3RlbmVycygnYWZ0ZXJleGl0JykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHVubG9hZCgpXG4gICAgICB9XG4gICAgfVxuICAgIGVtaXR0ZXIub24oZXYsIGNiKVxuXG4gICAgcmV0dXJuIHJlbW92ZVxuICB9XG5cbiAgdmFyIHVubG9hZCA9IGZ1bmN0aW9uIHVubG9hZCAoKSB7XG4gICAgaWYgKCFsb2FkZWQgfHwgIXByb2Nlc3NPayhnbG9iYWwucHJvY2VzcykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsb2FkZWQgPSBmYWxzZVxuXG4gICAgc2lnbmFscy5mb3JFYWNoKGZ1bmN0aW9uIChzaWcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIoc2lnLCBzaWdMaXN0ZW5lcnNbc2lnXSlcbiAgICAgIH0gY2F0Y2ggKGVyKSB7fVxuICAgIH0pXG4gICAgcHJvY2Vzcy5lbWl0ID0gb3JpZ2luYWxQcm9jZXNzRW1pdFxuICAgIHByb2Nlc3MucmVhbGx5RXhpdCA9IG9yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXRcbiAgICBlbWl0dGVyLmNvdW50IC09IDFcbiAgfVxuICBtb2R1bGUuZXhwb3J0cy51bmxvYWQgPSB1bmxvYWRcblxuICB2YXIgZW1pdCA9IGZ1bmN0aW9uIGVtaXQgKGV2ZW50LCBjb2RlLCBzaWduYWwpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoZW1pdHRlci5lbWl0dGVkW2V2ZW50XSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGVtaXR0ZXIuZW1pdHRlZFtldmVudF0gPSB0cnVlXG4gICAgZW1pdHRlci5lbWl0KGV2ZW50LCBjb2RlLCBzaWduYWwpXG4gIH1cblxuICAvLyB7IDxzaWduYWw+OiA8bGlzdGVuZXIgZm4+LCAuLi4gfVxuICB2YXIgc2lnTGlzdGVuZXJzID0ge31cbiAgc2lnbmFscy5mb3JFYWNoKGZ1bmN0aW9uIChzaWcpIHtcbiAgICBzaWdMaXN0ZW5lcnNbc2lnXSA9IGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFwcm9jZXNzT2soZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG90aGVyIGxpc3RlbmVycywgYW4gZXhpdCBpcyBjb21pbmchXG4gICAgICAvLyBTaW1wbGVzdCB3YXk6IHJlbW92ZSB1cyBhbmQgdGhlbiByZS1zZW5kIHRoZSBzaWduYWwuXG4gICAgICAvLyBXZSBrbm93IHRoYXQgdGhpcyB3aWxsIGtpbGwgdGhlIHByb2Nlc3MsIHNvIHdlIGNhblxuICAgICAgLy8gc2FmZWx5IGVtaXQgbm93LlxuICAgICAgdmFyIGxpc3RlbmVycyA9IHByb2Nlc3MubGlzdGVuZXJzKHNpZylcbiAgICAgIGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSBlbWl0dGVyLmNvdW50KSB7XG4gICAgICAgIHVubG9hZCgpXG4gICAgICAgIGVtaXQoJ2V4aXQnLCBudWxsLCBzaWcpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGVtaXQoJ2FmdGVyZXhpdCcsIG51bGwsIHNpZylcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKGlzV2luICYmIHNpZyA9PT0gJ1NJR0hVUCcpIHtcbiAgICAgICAgICAvLyBcIlNJR0hVUFwiIHRocm93cyBhbiBgRU5PU1lTYCBlcnJvciBvbiBXaW5kb3dzLFxuICAgICAgICAgIC8vIHNvIHVzZSBhIHN1cHBvcnRlZCBzaWduYWwgaW5zdGVhZFxuICAgICAgICAgIHNpZyA9ICdTSUdJTlQnXG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcHJvY2Vzcy5raWxsKHByb2Nlc3MucGlkLCBzaWcpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIG1vZHVsZS5leHBvcnRzLnNpZ25hbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNpZ25hbHNcbiAgfVxuXG4gIHZhciBsb2FkZWQgPSBmYWxzZVxuXG4gIHZhciBsb2FkID0gZnVuY3Rpb24gbG9hZCAoKSB7XG4gICAgaWYgKGxvYWRlZCB8fCAhcHJvY2Vzc09rKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxvYWRlZCA9IHRydWVcblxuICAgIC8vIFRoaXMgaXMgdGhlIG51bWJlciBvZiBvblNpZ25hbEV4aXQncyB0aGF0IGFyZSBpbiBwbGF5LlxuICAgIC8vIEl0J3MgaW1wb3J0YW50IHNvIHRoYXQgd2UgY2FuIGNvdW50IHRoZSBjb3JyZWN0IG51bWJlciBvZlxuICAgIC8vIGxpc3RlbmVycyBvbiBzaWduYWxzLCBhbmQgZG9uJ3Qgd2FpdCBmb3IgdGhlIG90aGVyIG9uZSB0b1xuICAgIC8vIGhhbmRsZSBpdCBpbnN0ZWFkIG9mIHVzLlxuICAgIGVtaXR0ZXIuY291bnQgKz0gMVxuXG4gICAgc2lnbmFscyA9IHNpZ25hbHMuZmlsdGVyKGZ1bmN0aW9uIChzaWcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHByb2Nlc3Mub24oc2lnLCBzaWdMaXN0ZW5lcnNbc2lnXSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBwcm9jZXNzLmVtaXQgPSBwcm9jZXNzRW1pdFxuICAgIHByb2Nlc3MucmVhbGx5RXhpdCA9IHByb2Nlc3NSZWFsbHlFeGl0XG4gIH1cbiAgbW9kdWxlLmV4cG9ydHMubG9hZCA9IGxvYWRcblxuICB2YXIgb3JpZ2luYWxQcm9jZXNzUmVhbGx5RXhpdCA9IHByb2Nlc3MucmVhbGx5RXhpdFxuICB2YXIgcHJvY2Vzc1JlYWxseUV4aXQgPSBmdW5jdGlvbiBwcm9jZXNzUmVhbGx5RXhpdCAoY29kZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghcHJvY2Vzc09rKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHByb2Nlc3MuZXhpdENvZGUgPSBjb2RlIHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDBcbiAgICBlbWl0KCdleGl0JywgcHJvY2Vzcy5leGl0Q29kZSwgbnVsbClcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGVtaXQoJ2FmdGVyZXhpdCcsIHByb2Nlc3MuZXhpdENvZGUsIG51bGwpXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBvcmlnaW5hbFByb2Nlc3NSZWFsbHlFeGl0LmNhbGwocHJvY2VzcywgcHJvY2Vzcy5leGl0Q29kZSlcbiAgfVxuXG4gIHZhciBvcmlnaW5hbFByb2Nlc3NFbWl0ID0gcHJvY2Vzcy5lbWl0XG4gIHZhciBwcm9jZXNzRW1pdCA9IGZ1bmN0aW9uIHByb2Nlc3NFbWl0IChldiwgYXJnKSB7XG4gICAgaWYgKGV2ID09PSAnZXhpdCcgJiYgcHJvY2Vzc09rKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChhcmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9jZXNzLmV4aXRDb2RlID0gYXJnXG4gICAgICB9XG4gICAgICB2YXIgcmV0ID0gb3JpZ2luYWxQcm9jZXNzRW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgZW1pdCgnZXhpdCcsIHByb2Nlc3MuZXhpdENvZGUsIG51bGwpXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgZW1pdCgnYWZ0ZXJleGl0JywgcHJvY2Vzcy5leGl0Q29kZSwgbnVsbClcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICByZXR1cm4gcmV0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbFByb2Nlc3NFbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9XG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBvbkV4aXQgPSByZXF1aXJlKCdzaWduYWwtZXhpdCcpO1xuXG5jb25zdCBERUZBVUxUX0ZPUkNFX0tJTExfVElNRU9VVCA9IDEwMDAgKiA1O1xuXG4vLyBNb25rZXktcGF0Y2hlcyBgY2hpbGRQcm9jZXNzLmtpbGwoKWAgdG8gYWRkIGBmb3JjZUtpbGxBZnRlclRpbWVvdXRgIGJlaGF2aW9yXG5jb25zdCBzcGF3bmVkS2lsbCA9IChraWxsLCBzaWduYWwgPSAnU0lHVEVSTScsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRjb25zdCBraWxsUmVzdWx0ID0ga2lsbChzaWduYWwpO1xuXHRzZXRLaWxsVGltZW91dChraWxsLCBzaWduYWwsIG9wdGlvbnMsIGtpbGxSZXN1bHQpO1xuXHRyZXR1cm4ga2lsbFJlc3VsdDtcbn07XG5cbmNvbnN0IHNldEtpbGxUaW1lb3V0ID0gKGtpbGwsIHNpZ25hbCwgb3B0aW9ucywga2lsbFJlc3VsdCkgPT4ge1xuXHRpZiAoIXNob3VsZEZvcmNlS2lsbChzaWduYWwsIG9wdGlvbnMsIGtpbGxSZXN1bHQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgdGltZW91dCA9IGdldEZvcmNlS2lsbEFmdGVyVGltZW91dChvcHRpb25zKTtcblx0Y29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdGtpbGwoJ1NJR0tJTEwnKTtcblx0fSwgdGltZW91dCk7XG5cblx0Ly8gR3VhcmRlZCBiZWNhdXNlIHRoZXJlJ3Mgbm8gYC51bnJlZigpYCB3aGVuIGBleGVjYWAgaXMgdXNlZCBpbiB0aGUgcmVuZGVyZXJcblx0Ly8gcHJvY2VzcyBpbiBFbGVjdHJvbi4gVGhpcyBjYW5ub3QgYmUgdGVzdGVkIHNpbmNlIHdlIGRvbid0IHJ1biB0ZXN0cyBpblxuXHQvLyBFbGVjdHJvbi5cblx0Ly8gaXN0YW5idWwgaWdub3JlIGVsc2Vcblx0aWYgKHQudW5yZWYpIHtcblx0XHR0LnVucmVmKCk7XG5cdH1cbn07XG5cbmNvbnN0IHNob3VsZEZvcmNlS2lsbCA9IChzaWduYWwsIHtmb3JjZUtpbGxBZnRlclRpbWVvdXR9LCBraWxsUmVzdWx0KSA9PiB7XG5cdHJldHVybiBpc1NpZ3Rlcm0oc2lnbmFsKSAmJiBmb3JjZUtpbGxBZnRlclRpbWVvdXQgIT09IGZhbHNlICYmIGtpbGxSZXN1bHQ7XG59O1xuXG5jb25zdCBpc1NpZ3Rlcm0gPSBzaWduYWwgPT4ge1xuXHRyZXR1cm4gc2lnbmFsID09PSBvcy5jb25zdGFudHMuc2lnbmFscy5TSUdURVJNIHx8XG5cdFx0KHR5cGVvZiBzaWduYWwgPT09ICdzdHJpbmcnICYmIHNpZ25hbC50b1VwcGVyQ2FzZSgpID09PSAnU0lHVEVSTScpO1xufTtcblxuY29uc3QgZ2V0Rm9yY2VLaWxsQWZ0ZXJUaW1lb3V0ID0gKHtmb3JjZUtpbGxBZnRlclRpbWVvdXQgPSB0cnVlfSkgPT4ge1xuXHRpZiAoZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0ID09PSB0cnVlKSB7XG5cdFx0cmV0dXJuIERFRkFVTFRfRk9SQ0VfS0lMTF9USU1FT1VUO1xuXHR9XG5cblx0aWYgKCFOdW1iZXIuaXNGaW5pdGUoZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0KSB8fCBmb3JjZUtpbGxBZnRlclRpbWVvdXQgPCAwKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgdGhlIFxcYGZvcmNlS2lsbEFmdGVyVGltZW91dFxcYCBvcHRpb24gdG8gYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290IFxcYCR7Zm9yY2VLaWxsQWZ0ZXJUaW1lb3V0fVxcYCAoJHt0eXBlb2YgZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0fSlgKTtcblx0fVxuXG5cdHJldHVybiBmb3JjZUtpbGxBZnRlclRpbWVvdXQ7XG59O1xuXG4vLyBgY2hpbGRQcm9jZXNzLmNhbmNlbCgpYFxuY29uc3Qgc3Bhd25lZENhbmNlbCA9IChzcGF3bmVkLCBjb250ZXh0KSA9PiB7XG5cdGNvbnN0IGtpbGxSZXN1bHQgPSBzcGF3bmVkLmtpbGwoKTtcblxuXHRpZiAoa2lsbFJlc3VsdCkge1xuXHRcdGNvbnRleHQuaXNDYW5jZWxlZCA9IHRydWU7XG5cdH1cbn07XG5cbmNvbnN0IHRpbWVvdXRLaWxsID0gKHNwYXduZWQsIHNpZ25hbCwgcmVqZWN0KSA9PiB7XG5cdHNwYXduZWQua2lsbChzaWduYWwpO1xuXHRyZWplY3QoT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoJ1RpbWVkIG91dCcpLCB7dGltZWRPdXQ6IHRydWUsIHNpZ25hbH0pKTtcbn07XG5cbi8vIGB0aW1lb3V0YCBvcHRpb24gaGFuZGxpbmdcbmNvbnN0IHNldHVwVGltZW91dCA9IChzcGF3bmVkLCB7dGltZW91dCwga2lsbFNpZ25hbCA9ICdTSUdURVJNJ30sIHNwYXduZWRQcm9taXNlKSA9PiB7XG5cdGlmICh0aW1lb3V0ID09PSAwIHx8IHRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzcGF3bmVkUHJvbWlzZTtcblx0fVxuXG5cdGxldCB0aW1lb3V0SWQ7XG5cdGNvbnN0IHRpbWVvdXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGltZW91dEtpbGwoc3Bhd25lZCwga2lsbFNpZ25hbCwgcmVqZWN0KTtcblx0XHR9LCB0aW1lb3V0KTtcblx0fSk7XG5cblx0Y29uc3Qgc2FmZVNwYXduZWRQcm9taXNlID0gc3Bhd25lZFByb21pc2UuZmluYWxseSgoKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG5cdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLnJhY2UoW3RpbWVvdXRQcm9taXNlLCBzYWZlU3Bhd25lZFByb21pc2VdKTtcbn07XG5cbmNvbnN0IHZhbGlkYXRlVGltZW91dCA9ICh7dGltZW91dH0pID0+IHtcblx0aWYgKHRpbWVvdXQgIT09IHVuZGVmaW5lZCAmJiAoIU51bWJlci5pc0Zpbml0ZSh0aW1lb3V0KSB8fCB0aW1lb3V0IDwgMCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgXFxgdGltZW91dFxcYCBvcHRpb24gdG8gYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290IFxcYCR7dGltZW91dH1cXGAgKCR7dHlwZW9mIHRpbWVvdXR9KWApO1xuXHR9XG59O1xuXG4vLyBgY2xlYW51cGAgb3B0aW9uIGhhbmRsaW5nXG5jb25zdCBzZXRFeGl0SGFuZGxlciA9IGFzeW5jIChzcGF3bmVkLCB7Y2xlYW51cCwgZGV0YWNoZWR9LCB0aW1lZFByb21pc2UpID0+IHtcblx0aWYgKCFjbGVhbnVwIHx8IGRldGFjaGVkKSB7XG5cdFx0cmV0dXJuIHRpbWVkUHJvbWlzZTtcblx0fVxuXG5cdGNvbnN0IHJlbW92ZUV4aXRIYW5kbGVyID0gb25FeGl0KCgpID0+IHtcblx0XHRzcGF3bmVkLmtpbGwoKTtcblx0fSk7XG5cblx0cmV0dXJuIHRpbWVkUHJvbWlzZS5maW5hbGx5KCgpID0+IHtcblx0XHRyZW1vdmVFeGl0SGFuZGxlcigpO1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzcGF3bmVkS2lsbCxcblx0c3Bhd25lZENhbmNlbCxcblx0c2V0dXBUaW1lb3V0LFxuXHR2YWxpZGF0ZVRpbWVvdXQsXG5cdHNldEV4aXRIYW5kbGVyXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgaXNTdHJlYW0gPSBzdHJlYW0gPT5cblx0c3RyZWFtICE9PSBudWxsICYmXG5cdHR5cGVvZiBzdHJlYW0gPT09ICdvYmplY3QnICYmXG5cdHR5cGVvZiBzdHJlYW0ucGlwZSA9PT0gJ2Z1bmN0aW9uJztcblxuaXNTdHJlYW0ud3JpdGFibGUgPSBzdHJlYW0gPT5cblx0aXNTdHJlYW0oc3RyZWFtKSAmJlxuXHRzdHJlYW0ud3JpdGFibGUgIT09IGZhbHNlICYmXG5cdHR5cGVvZiBzdHJlYW0uX3dyaXRlID09PSAnZnVuY3Rpb24nICYmXG5cdHR5cGVvZiBzdHJlYW0uX3dyaXRhYmxlU3RhdGUgPT09ICdvYmplY3QnO1xuXG5pc1N0cmVhbS5yZWFkYWJsZSA9IHN0cmVhbSA9PlxuXHRpc1N0cmVhbShzdHJlYW0pICYmXG5cdHN0cmVhbS5yZWFkYWJsZSAhPT0gZmFsc2UgJiZcblx0dHlwZW9mIHN0cmVhbS5fcmVhZCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHR0eXBlb2Ygc3RyZWFtLl9yZWFkYWJsZVN0YXRlID09PSAnb2JqZWN0JztcblxuaXNTdHJlYW0uZHVwbGV4ID0gc3RyZWFtID0+XG5cdGlzU3RyZWFtLndyaXRhYmxlKHN0cmVhbSkgJiZcblx0aXNTdHJlYW0ucmVhZGFibGUoc3RyZWFtKTtcblxuaXNTdHJlYW0udHJhbnNmb3JtID0gc3RyZWFtID0+XG5cdGlzU3RyZWFtLmR1cGxleChzdHJlYW0pICYmXG5cdHR5cGVvZiBzdHJlYW0uX3RyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmVhbTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCB7UGFzc1Rocm91Z2g6IFBhc3NUaHJvdWdoU3RyZWFtfSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9wdGlvbnMgPT4ge1xuXHRvcHRpb25zID0gey4uLm9wdGlvbnN9O1xuXG5cdGNvbnN0IHthcnJheX0gPSBvcHRpb25zO1xuXHRsZXQge2VuY29kaW5nfSA9IG9wdGlvbnM7XG5cdGNvbnN0IGlzQnVmZmVyID0gZW5jb2RpbmcgPT09ICdidWZmZXInO1xuXHRsZXQgb2JqZWN0TW9kZSA9IGZhbHNlO1xuXG5cdGlmIChhcnJheSkge1xuXHRcdG9iamVjdE1vZGUgPSAhKGVuY29kaW5nIHx8IGlzQnVmZmVyKTtcblx0fSBlbHNlIHtcblx0XHRlbmNvZGluZyA9IGVuY29kaW5nIHx8ICd1dGY4Jztcblx0fVxuXG5cdGlmIChpc0J1ZmZlcikge1xuXHRcdGVuY29kaW5nID0gbnVsbDtcblx0fVxuXG5cdGNvbnN0IHN0cmVhbSA9IG5ldyBQYXNzVGhyb3VnaFN0cmVhbSh7b2JqZWN0TW9kZX0pO1xuXG5cdGlmIChlbmNvZGluZykge1xuXHRcdHN0cmVhbS5zZXRFbmNvZGluZyhlbmNvZGluZyk7XG5cdH1cblxuXHRsZXQgbGVuZ3RoID0gMDtcblx0Y29uc3QgY2h1bmtzID0gW107XG5cblx0c3RyZWFtLm9uKCdkYXRhJywgY2h1bmsgPT4ge1xuXHRcdGNodW5rcy5wdXNoKGNodW5rKTtcblxuXHRcdGlmIChvYmplY3RNb2RlKSB7XG5cdFx0XHRsZW5ndGggPSBjaHVua3MubGVuZ3RoO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZW5ndGggKz0gY2h1bmsubGVuZ3RoO1xuXHRcdH1cblx0fSk7XG5cblx0c3RyZWFtLmdldEJ1ZmZlcmVkVmFsdWUgPSAoKSA9PiB7XG5cdFx0aWYgKGFycmF5KSB7XG5cdFx0XHRyZXR1cm4gY2h1bmtzO1xuXHRcdH1cblxuXHRcdHJldHVybiBpc0J1ZmZlciA/IEJ1ZmZlci5jb25jYXQoY2h1bmtzLCBsZW5ndGgpIDogY2h1bmtzLmpvaW4oJycpO1xuXHR9O1xuXG5cdHN0cmVhbS5nZXRCdWZmZXJlZExlbmd0aCA9ICgpID0+IGxlbmd0aDtcblxuXHRyZXR1cm4gc3RyZWFtO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCB7Y29uc3RhbnRzOiBCdWZmZXJDb25zdGFudHN9ID0gcmVxdWlyZSgnYnVmZmVyJyk7XG5jb25zdCBzdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKTtcbmNvbnN0IHtwcm9taXNpZnl9ID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgYnVmZmVyU3RyZWFtID0gcmVxdWlyZSgnLi9idWZmZXItc3RyZWFtJyk7XG5cbmNvbnN0IHN0cmVhbVBpcGVsaW5lUHJvbWlzaWZpZWQgPSBwcm9taXNpZnkoc3RyZWFtLnBpcGVsaW5lKTtcblxuY2xhc3MgTWF4QnVmZmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCdtYXhCdWZmZXIgZXhjZWVkZWQnKTtcblx0XHR0aGlzLm5hbWUgPSAnTWF4QnVmZmVyRXJyb3InO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0cmVhbShpbnB1dFN0cmVhbSwgb3B0aW9ucykge1xuXHRpZiAoIWlucHV0U3RyZWFtKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHN0cmVhbScpO1xuXHR9XG5cblx0b3B0aW9ucyA9IHtcblx0XHRtYXhCdWZmZXI6IEluZmluaXR5LFxuXHRcdC4uLm9wdGlvbnNcblx0fTtcblxuXHRjb25zdCB7bWF4QnVmZmVyfSA9IG9wdGlvbnM7XG5cdGNvbnN0IHN0cmVhbSA9IGJ1ZmZlclN0cmVhbShvcHRpb25zKTtcblxuXHRhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgcmVqZWN0UHJvbWlzZSA9IGVycm9yID0+IHtcblx0XHRcdC8vIERvbid0IHJldHJpZXZlIGFuIG92ZXJzaXplZCBidWZmZXIuXG5cdFx0XHRpZiAoZXJyb3IgJiYgc3RyZWFtLmdldEJ1ZmZlcmVkTGVuZ3RoKCkgPD0gQnVmZmVyQ29uc3RhbnRzLk1BWF9MRU5HVEgpIHtcblx0XHRcdFx0ZXJyb3IuYnVmZmVyZWREYXRhID0gc3RyZWFtLmdldEJ1ZmZlcmVkVmFsdWUoKTtcblx0XHRcdH1cblxuXHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHR9O1xuXG5cdFx0KGFzeW5jICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGF3YWl0IHN0cmVhbVBpcGVsaW5lUHJvbWlzaWZpZWQoaW5wdXRTdHJlYW0sIHN0cmVhbSk7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHJlamVjdFByb21pc2UoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH0pKCk7XG5cblx0XHRzdHJlYW0ub24oJ2RhdGEnLCAoKSA9PiB7XG5cdFx0XHRpZiAoc3RyZWFtLmdldEJ1ZmZlcmVkTGVuZ3RoKCkgPiBtYXhCdWZmZXIpIHtcblx0XHRcdFx0cmVqZWN0UHJvbWlzZShuZXcgTWF4QnVmZmVyRXJyb3IoKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdHJldHVybiBzdHJlYW0uZ2V0QnVmZmVyZWRWYWx1ZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFN0cmVhbTtcbm1vZHVsZS5leHBvcnRzLmJ1ZmZlciA9IChzdHJlYW0sIG9wdGlvbnMpID0+IGdldFN0cmVhbShzdHJlYW0sIHsuLi5vcHRpb25zLCBlbmNvZGluZzogJ2J1ZmZlcid9KTtcbm1vZHVsZS5leHBvcnRzLmFycmF5ID0gKHN0cmVhbSwgb3B0aW9ucykgPT4gZ2V0U3RyZWFtKHN0cmVhbSwgey4uLm9wdGlvbnMsIGFycmF5OiB0cnVlfSk7XG5tb2R1bGUuZXhwb3J0cy5NYXhCdWZmZXJFcnJvciA9IE1heEJ1ZmZlckVycm9yO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBQYXNzVGhyb3VnaCB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKC8qc3RyZWFtcy4uLiovKSB7XG4gIHZhciBzb3VyY2VzID0gW11cbiAgdmFyIG91dHB1dCAgPSBuZXcgUGFzc1Rocm91Z2goe29iamVjdE1vZGU6IHRydWV9KVxuXG4gIG91dHB1dC5zZXRNYXhMaXN0ZW5lcnMoMClcblxuICBvdXRwdXQuYWRkID0gYWRkXG4gIG91dHB1dC5pc0VtcHR5ID0gaXNFbXB0eVxuXG4gIG91dHB1dC5vbigndW5waXBlJywgcmVtb3ZlKVxuXG4gIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykuZm9yRWFjaChhZGQpXG5cbiAgcmV0dXJuIG91dHB1dFxuXG4gIGZ1bmN0aW9uIGFkZCAoc291cmNlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgc291cmNlLmZvckVhY2goYWRkKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBzb3VyY2VzLnB1c2goc291cmNlKTtcbiAgICBzb3VyY2Uub25jZSgnZW5kJywgcmVtb3ZlLmJpbmQobnVsbCwgc291cmNlKSlcbiAgICBzb3VyY2Uub25jZSgnZXJyb3InLCBvdXRwdXQuZW1pdC5iaW5kKG91dHB1dCwgJ2Vycm9yJykpXG4gICAgc291cmNlLnBpcGUob3V0cHV0LCB7ZW5kOiBmYWxzZX0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW1wdHkgKCkge1xuICAgIHJldHVybiBzb3VyY2VzLmxlbmd0aCA9PSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlIChzb3VyY2UpIHtcbiAgICBzb3VyY2VzID0gc291cmNlcy5maWx0ZXIoZnVuY3Rpb24gKGl0KSB7IHJldHVybiBpdCAhPT0gc291cmNlIH0pXG4gICAgaWYgKCFzb3VyY2VzLmxlbmd0aCAmJiBvdXRwdXQucmVhZGFibGUpIHsgb3V0cHV0LmVuZCgpIH1cbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0JztcbmNvbnN0IGlzU3RyZWFtID0gcmVxdWlyZSgnaXMtc3RyZWFtJyk7XG5jb25zdCBnZXRTdHJlYW0gPSByZXF1aXJlKCdnZXQtc3RyZWFtJyk7XG5jb25zdCBtZXJnZVN0cmVhbSA9IHJlcXVpcmUoJ21lcmdlLXN0cmVhbScpO1xuXG4vLyBgaW5wdXRgIG9wdGlvblxuY29uc3QgaGFuZGxlSW5wdXQgPSAoc3Bhd25lZCwgaW5wdXQpID0+IHtcblx0Ly8gQ2hlY2tpbmcgZm9yIHN0ZGluIGlzIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvMjY4NTJcblx0Ly8gQHRvZG8gcmVtb3ZlIGB8fCBzcGF3bmVkLnN0ZGluID09PSB1bmRlZmluZWRgIG9uY2Ugd2UgZHJvcCBzdXBwb3J0IGZvciBOb2RlLmpzIDw9MTIuMi4wXG5cdGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkIHx8IHNwYXduZWQuc3RkaW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChpc1N0cmVhbShpbnB1dCkpIHtcblx0XHRpbnB1dC5waXBlKHNwYXduZWQuc3RkaW4pO1xuXHR9IGVsc2Uge1xuXHRcdHNwYXduZWQuc3RkaW4uZW5kKGlucHV0KTtcblx0fVxufTtcblxuLy8gYGFsbGAgaW50ZXJsZWF2ZXMgYHN0ZG91dGAgYW5kIGBzdGRlcnJgXG5jb25zdCBtYWtlQWxsU3RyZWFtID0gKHNwYXduZWQsIHthbGx9KSA9PiB7XG5cdGlmICghYWxsIHx8ICghc3Bhd25lZC5zdGRvdXQgJiYgIXNwYXduZWQuc3RkZXJyKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IG1peGVkID0gbWVyZ2VTdHJlYW0oKTtcblxuXHRpZiAoc3Bhd25lZC5zdGRvdXQpIHtcblx0XHRtaXhlZC5hZGQoc3Bhd25lZC5zdGRvdXQpO1xuXHR9XG5cblx0aWYgKHNwYXduZWQuc3RkZXJyKSB7XG5cdFx0bWl4ZWQuYWRkKHNwYXduZWQuc3RkZXJyKTtcblx0fVxuXG5cdHJldHVybiBtaXhlZDtcbn07XG5cbi8vIE9uIGZhaWx1cmUsIGByZXN1bHQuc3Rkb3V0fHN0ZGVycnxhbGxgIHNob3VsZCBjb250YWluIHRoZSBjdXJyZW50bHkgYnVmZmVyZWQgc3RyZWFtXG5jb25zdCBnZXRCdWZmZXJlZERhdGEgPSBhc3luYyAoc3RyZWFtLCBzdHJlYW1Qcm9taXNlKSA9PiB7XG5cdGlmICghc3RyZWFtKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0c3RyZWFtLmRlc3Ryb3koKTtcblxuXHR0cnkge1xuXHRcdHJldHVybiBhd2FpdCBzdHJlYW1Qcm9taXNlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiBlcnJvci5idWZmZXJlZERhdGE7XG5cdH1cbn07XG5cbmNvbnN0IGdldFN0cmVhbVByb21pc2UgPSAoc3RyZWFtLCB7ZW5jb2RpbmcsIGJ1ZmZlciwgbWF4QnVmZmVyfSkgPT4ge1xuXHRpZiAoIXN0cmVhbSB8fCAhYnVmZmVyKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGVuY29kaW5nKSB7XG5cdFx0cmV0dXJuIGdldFN0cmVhbShzdHJlYW0sIHtlbmNvZGluZywgbWF4QnVmZmVyfSk7XG5cdH1cblxuXHRyZXR1cm4gZ2V0U3RyZWFtLmJ1ZmZlcihzdHJlYW0sIHttYXhCdWZmZXJ9KTtcbn07XG5cbi8vIFJldHJpZXZlIHJlc3VsdCBvZiBjaGlsZCBwcm9jZXNzOiBleGl0IGNvZGUsIHNpZ25hbCwgZXJyb3IsIHN0cmVhbXMgKHN0ZG91dC9zdGRlcnIvYWxsKVxuY29uc3QgZ2V0U3Bhd25lZFJlc3VsdCA9IGFzeW5jICh7c3Rkb3V0LCBzdGRlcnIsIGFsbH0sIHtlbmNvZGluZywgYnVmZmVyLCBtYXhCdWZmZXJ9LCBwcm9jZXNzRG9uZSkgPT4ge1xuXHRjb25zdCBzdGRvdXRQcm9taXNlID0gZ2V0U3RyZWFtUHJvbWlzZShzdGRvdXQsIHtlbmNvZGluZywgYnVmZmVyLCBtYXhCdWZmZXJ9KTtcblx0Y29uc3Qgc3RkZXJyUHJvbWlzZSA9IGdldFN0cmVhbVByb21pc2Uoc3RkZXJyLCB7ZW5jb2RpbmcsIGJ1ZmZlciwgbWF4QnVmZmVyfSk7XG5cdGNvbnN0IGFsbFByb21pc2UgPSBnZXRTdHJlYW1Qcm9taXNlKGFsbCwge2VuY29kaW5nLCBidWZmZXIsIG1heEJ1ZmZlcjogbWF4QnVmZmVyICogMn0pO1xuXG5cdHRyeSB7XG5cdFx0cmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKFtwcm9jZXNzRG9uZSwgc3Rkb3V0UHJvbWlzZSwgc3RkZXJyUHJvbWlzZSwgYWxsUHJvbWlzZV0pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiBQcm9taXNlLmFsbChbXG5cdFx0XHR7ZXJyb3IsIHNpZ25hbDogZXJyb3Iuc2lnbmFsLCB0aW1lZE91dDogZXJyb3IudGltZWRPdXR9LFxuXHRcdFx0Z2V0QnVmZmVyZWREYXRhKHN0ZG91dCwgc3Rkb3V0UHJvbWlzZSksXG5cdFx0XHRnZXRCdWZmZXJlZERhdGEoc3RkZXJyLCBzdGRlcnJQcm9taXNlKSxcblx0XHRcdGdldEJ1ZmZlcmVkRGF0YShhbGwsIGFsbFByb21pc2UpXG5cdFx0XSk7XG5cdH1cbn07XG5cbmNvbnN0IHZhbGlkYXRlSW5wdXRTeW5jID0gKHtpbnB1dH0pID0+IHtcblx0aWYgKGlzU3RyZWFtKGlucHV0KSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBgaW5wdXRgIG9wdGlvbiBjYW5ub3QgYmUgYSBzdHJlYW0gaW4gc3luYyBtb2RlJyk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRoYW5kbGVJbnB1dCxcblx0bWFrZUFsbFN0cmVhbSxcblx0Z2V0U3Bhd25lZFJlc3VsdCxcblx0dmFsaWRhdGVJbnB1dFN5bmNcbn07XG5cbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5hdGl2ZVByb21pc2VQcm90b3R5cGUgPSAoYXN5bmMgKCkgPT4ge30pKCkuY29uc3RydWN0b3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSBbJ3RoZW4nLCAnY2F0Y2gnLCAnZmluYWxseSddLm1hcChwcm9wZXJ0eSA9PiBbXG5cdHByb3BlcnR5LFxuXHRSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuYXRpdmVQcm9taXNlUHJvdG90eXBlLCBwcm9wZXJ0eSlcbl0pO1xuXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGEgbWl4aW4gb2YgYGNoaWxkUHJvY2Vzc2AgYW5kIGBQcm9taXNlYFxuY29uc3QgbWVyZ2VQcm9taXNlID0gKHNwYXduZWQsIHByb21pc2UpID0+IHtcblx0Zm9yIChjb25zdCBbcHJvcGVydHksIGRlc2NyaXB0b3JdIG9mIGRlc2NyaXB0b3JzKSB7XG5cdFx0Ly8gU3RhcnRpbmcgdGhlIG1haW4gYHByb21pc2VgIGlzIGRlZmVycmVkIHRvIGF2b2lkIGNvbnN1bWluZyBzdHJlYW1zXG5cdFx0Y29uc3QgdmFsdWUgPSB0eXBlb2YgcHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHQoLi4uYXJncykgPT4gUmVmbGVjdC5hcHBseShkZXNjcmlwdG9yLnZhbHVlLCBwcm9taXNlKCksIGFyZ3MpIDpcblx0XHRcdGRlc2NyaXB0b3IudmFsdWUuYmluZChwcm9taXNlKTtcblxuXHRcdFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoc3Bhd25lZCwgcHJvcGVydHksIHsuLi5kZXNjcmlwdG9yLCB2YWx1ZX0pO1xuXHR9XG5cblx0cmV0dXJuIHNwYXduZWQ7XG59O1xuXG4vLyBVc2UgcHJvbWlzZXMgaW5zdGVhZCBvZiBgY2hpbGRfcHJvY2Vzc2AgZXZlbnRzXG5jb25zdCBnZXRTcGF3bmVkUHJvbWlzZSA9IHNwYXduZWQgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHNwYXduZWQub24oJ2V4aXQnLCAoZXhpdENvZGUsIHNpZ25hbCkgPT4ge1xuXHRcdFx0cmVzb2x2ZSh7ZXhpdENvZGUsIHNpZ25hbH0pO1xuXHRcdH0pO1xuXG5cdFx0c3Bhd25lZC5vbignZXJyb3InLCBlcnJvciA9PiB7XG5cdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHNwYXduZWQuc3RkaW4pIHtcblx0XHRcdHNwYXduZWQuc3RkaW4ub24oJ2Vycm9yJywgZXJyb3IgPT4ge1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRtZXJnZVByb21pc2UsXG5cdGdldFNwYXduZWRQcm9taXNlXG59O1xuXG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgbm9ybWFsaXplQXJncyA9IChmaWxlLCBhcmdzID0gW10pID0+IHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG5cdFx0cmV0dXJuIFtmaWxlXTtcblx0fVxuXG5cdHJldHVybiBbZmlsZSwgLi4uYXJnc107XG59O1xuXG5jb25zdCBOT19FU0NBUEVfUkVHRVhQID0gL15bXFx3Li1dKyQvO1xuY29uc3QgRE9VQkxFX1FVT1RFU19SRUdFWFAgPSAvXCIvZztcblxuY29uc3QgZXNjYXBlQXJnID0gYXJnID0+IHtcblx0aWYgKHR5cGVvZiBhcmcgIT09ICdzdHJpbmcnIHx8IE5PX0VTQ0FQRV9SRUdFWFAudGVzdChhcmcpKSB7XG5cdFx0cmV0dXJuIGFyZztcblx0fVxuXG5cdHJldHVybiBgXCIke2FyZy5yZXBsYWNlKERPVUJMRV9RVU9URVNfUkVHRVhQLCAnXFxcXFwiJyl9XCJgO1xufTtcblxuY29uc3Qgam9pbkNvbW1hbmQgPSAoZmlsZSwgYXJncykgPT4ge1xuXHRyZXR1cm4gbm9ybWFsaXplQXJncyhmaWxlLCBhcmdzKS5qb2luKCcgJyk7XG59O1xuXG5jb25zdCBnZXRFc2NhcGVkQ29tbWFuZCA9IChmaWxlLCBhcmdzKSA9PiB7XG5cdHJldHVybiBub3JtYWxpemVBcmdzKGZpbGUsIGFyZ3MpLm1hcChhcmcgPT4gZXNjYXBlQXJnKGFyZykpLmpvaW4oJyAnKTtcbn07XG5cbmNvbnN0IFNQQUNFU19SRUdFWFAgPSAvICsvZztcblxuLy8gSGFuZGxlIGBleGVjYS5jb21tYW5kKClgXG5jb25zdCBwYXJzZUNvbW1hbmQgPSBjb21tYW5kID0+IHtcblx0Y29uc3QgdG9rZW5zID0gW107XG5cdGZvciAoY29uc3QgdG9rZW4gb2YgY29tbWFuZC50cmltKCkuc3BsaXQoU1BBQ0VTX1JFR0VYUCkpIHtcblx0XHQvLyBBbGxvdyBzcGFjZXMgdG8gYmUgZXNjYXBlZCBieSBhIGJhY2tzbGFzaCBpZiBub3QgbWVhbnQgYXMgYSBkZWxpbWl0ZXJcblx0XHRjb25zdCBwcmV2aW91c1Rva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcblx0XHRpZiAocHJldmlvdXNUb2tlbiAmJiBwcmV2aW91c1Rva2VuLmVuZHNXaXRoKCdcXFxcJykpIHtcblx0XHRcdC8vIE1lcmdlIHByZXZpb3VzIHRva2VuIHdpdGggY3VycmVudCBvbmVcblx0XHRcdHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0gPSBgJHtwcmV2aW91c1Rva2VuLnNsaWNlKDAsIC0xKX0gJHt0b2tlbn1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRva2Vucztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRqb2luQ29tbWFuZCxcblx0Z2V0RXNjYXBlZENvbW1hbmQsXG5cdHBhcnNlQ29tbWFuZFxufTtcbiIsICIndXNlIHN0cmljdCc7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgY2hpbGRQcm9jZXNzID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpO1xuY29uc3QgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJyk7XG5jb25zdCBzdHJpcEZpbmFsTmV3bGluZSA9IHJlcXVpcmUoJ3N0cmlwLWZpbmFsLW5ld2xpbmUnKTtcbmNvbnN0IG5wbVJ1blBhdGggPSByZXF1aXJlKCducG0tcnVuLXBhdGgnKTtcbmNvbnN0IG9uZXRpbWUgPSByZXF1aXJlKCdvbmV0aW1lJyk7XG5jb25zdCBtYWtlRXJyb3IgPSByZXF1aXJlKCcuL2xpYi9lcnJvcicpO1xuY29uc3Qgbm9ybWFsaXplU3RkaW8gPSByZXF1aXJlKCcuL2xpYi9zdGRpbycpO1xuY29uc3Qge3NwYXduZWRLaWxsLCBzcGF3bmVkQ2FuY2VsLCBzZXR1cFRpbWVvdXQsIHZhbGlkYXRlVGltZW91dCwgc2V0RXhpdEhhbmRsZXJ9ID0gcmVxdWlyZSgnLi9saWIva2lsbCcpO1xuY29uc3Qge2hhbmRsZUlucHV0LCBnZXRTcGF3bmVkUmVzdWx0LCBtYWtlQWxsU3RyZWFtLCB2YWxpZGF0ZUlucHV0U3luY30gPSByZXF1aXJlKCcuL2xpYi9zdHJlYW0nKTtcbmNvbnN0IHttZXJnZVByb21pc2UsIGdldFNwYXduZWRQcm9taXNlfSA9IHJlcXVpcmUoJy4vbGliL3Byb21pc2UnKTtcbmNvbnN0IHtqb2luQ29tbWFuZCwgcGFyc2VDb21tYW5kLCBnZXRFc2NhcGVkQ29tbWFuZH0gPSByZXF1aXJlKCcuL2xpYi9jb21tYW5kJyk7XG5cbmNvbnN0IERFRkFVTFRfTUFYX0JVRkZFUiA9IDEwMDAgKiAxMDAwICogMTAwO1xuXG5jb25zdCBnZXRFbnYgPSAoe2VudjogZW52T3B0aW9uLCBleHRlbmRFbnYsIHByZWZlckxvY2FsLCBsb2NhbERpciwgZXhlY1BhdGh9KSA9PiB7XG5cdGNvbnN0IGVudiA9IGV4dGVuZEVudiA/IHsuLi5wcm9jZXNzLmVudiwgLi4uZW52T3B0aW9ufSA6IGVudk9wdGlvbjtcblxuXHRpZiAocHJlZmVyTG9jYWwpIHtcblx0XHRyZXR1cm4gbnBtUnVuUGF0aC5lbnYoe2VudiwgY3dkOiBsb2NhbERpciwgZXhlY1BhdGh9KTtcblx0fVxuXG5cdHJldHVybiBlbnY7XG59O1xuXG5jb25zdCBoYW5kbGVBcmd1bWVudHMgPSAoZmlsZSwgYXJncywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGNvbnN0IHBhcnNlZCA9IGNyb3NzU3Bhd24uX3BhcnNlKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xuXHRmaWxlID0gcGFyc2VkLmNvbW1hbmQ7XG5cdGFyZ3MgPSBwYXJzZWQuYXJncztcblx0b3B0aW9ucyA9IHBhcnNlZC5vcHRpb25zO1xuXG5cdG9wdGlvbnMgPSB7XG5cdFx0bWF4QnVmZmVyOiBERUZBVUxUX01BWF9CVUZGRVIsXG5cdFx0YnVmZmVyOiB0cnVlLFxuXHRcdHN0cmlwRmluYWxOZXdsaW5lOiB0cnVlLFxuXHRcdGV4dGVuZEVudjogdHJ1ZSxcblx0XHRwcmVmZXJMb2NhbDogZmFsc2UsXG5cdFx0bG9jYWxEaXI6IG9wdGlvbnMuY3dkIHx8IHByb2Nlc3MuY3dkKCksXG5cdFx0ZXhlY1BhdGg6IHByb2Nlc3MuZXhlY1BhdGgsXG5cdFx0ZW5jb2Rpbmc6ICd1dGY4Jyxcblx0XHRyZWplY3Q6IHRydWUsXG5cdFx0Y2xlYW51cDogdHJ1ZSxcblx0XHRhbGw6IGZhbHNlLFxuXHRcdHdpbmRvd3NIaWRlOiB0cnVlLFxuXHRcdC4uLm9wdGlvbnNcblx0fTtcblxuXHRvcHRpb25zLmVudiA9IGdldEVudihvcHRpb25zKTtcblxuXHRvcHRpb25zLnN0ZGlvID0gbm9ybWFsaXplU3RkaW8ob3B0aW9ucyk7XG5cblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgJiYgcGF0aC5iYXNlbmFtZShmaWxlLCAnLmV4ZScpID09PSAnY21kJykge1xuXHRcdC8vICMxMTZcblx0XHRhcmdzLnVuc2hpZnQoJy9xJyk7XG5cdH1cblxuXHRyZXR1cm4ge2ZpbGUsIGFyZ3MsIG9wdGlvbnMsIHBhcnNlZH07XG59O1xuXG5jb25zdCBoYW5kbGVPdXRwdXQgPSAob3B0aW9ucywgdmFsdWUsIGVycm9yKSA9PiB7XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNCdWZmZXIodmFsdWUpKSB7XG5cdFx0Ly8gV2hlbiBgZXhlY2Euc3luYygpYCBlcnJvcnMsIHdlIG5vcm1hbGl6ZSBpdCB0byAnJyB0byBtaW1pYyBgZXhlY2EoKWBcblx0XHRyZXR1cm4gZXJyb3IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6ICcnO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMuc3RyaXBGaW5hbE5ld2xpbmUpIHtcblx0XHRyZXR1cm4gc3RyaXBGaW5hbE5ld2xpbmUodmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxuY29uc3QgZXhlY2EgPSAoZmlsZSwgYXJncywgb3B0aW9ucykgPT4ge1xuXHRjb25zdCBwYXJzZWQgPSBoYW5kbGVBcmd1bWVudHMoZmlsZSwgYXJncywgb3B0aW9ucyk7XG5cdGNvbnN0IGNvbW1hbmQgPSBqb2luQ29tbWFuZChmaWxlLCBhcmdzKTtcblx0Y29uc3QgZXNjYXBlZENvbW1hbmQgPSBnZXRFc2NhcGVkQ29tbWFuZChmaWxlLCBhcmdzKTtcblxuXHR2YWxpZGF0ZVRpbWVvdXQocGFyc2VkLm9wdGlvbnMpO1xuXG5cdGxldCBzcGF3bmVkO1xuXHR0cnkge1xuXHRcdHNwYXduZWQgPSBjaGlsZFByb2Nlc3Muc3Bhd24ocGFyc2VkLmZpbGUsIHBhcnNlZC5hcmdzLCBwYXJzZWQub3B0aW9ucyk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gRW5zdXJlIHRoZSByZXR1cm5lZCBlcnJvciBpcyBhbHdheXMgYm90aCBhIHByb21pc2UgYW5kIGEgY2hpbGQgcHJvY2Vzc1xuXHRcdGNvbnN0IGR1bW15U3Bhd25lZCA9IG5ldyBjaGlsZFByb2Nlc3MuQ2hpbGRQcm9jZXNzKCk7XG5cdFx0Y29uc3QgZXJyb3JQcm9taXNlID0gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKHtcblx0XHRcdGVycm9yLFxuXHRcdFx0c3Rkb3V0OiAnJyxcblx0XHRcdHN0ZGVycjogJycsXG5cdFx0XHRhbGw6ICcnLFxuXHRcdFx0Y29tbWFuZCxcblx0XHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdFx0cGFyc2VkLFxuXHRcdFx0dGltZWRPdXQ6IGZhbHNlLFxuXHRcdFx0aXNDYW5jZWxlZDogZmFsc2UsXG5cdFx0XHRraWxsZWQ6IGZhbHNlXG5cdFx0fSkpO1xuXHRcdHJldHVybiBtZXJnZVByb21pc2UoZHVtbXlTcGF3bmVkLCBlcnJvclByb21pc2UpO1xuXHR9XG5cblx0Y29uc3Qgc3Bhd25lZFByb21pc2UgPSBnZXRTcGF3bmVkUHJvbWlzZShzcGF3bmVkKTtcblx0Y29uc3QgdGltZWRQcm9taXNlID0gc2V0dXBUaW1lb3V0KHNwYXduZWQsIHBhcnNlZC5vcHRpb25zLCBzcGF3bmVkUHJvbWlzZSk7XG5cdGNvbnN0IHByb2Nlc3NEb25lID0gc2V0RXhpdEhhbmRsZXIoc3Bhd25lZCwgcGFyc2VkLm9wdGlvbnMsIHRpbWVkUHJvbWlzZSk7XG5cblx0Y29uc3QgY29udGV4dCA9IHtpc0NhbmNlbGVkOiBmYWxzZX07XG5cblx0c3Bhd25lZC5raWxsID0gc3Bhd25lZEtpbGwuYmluZChudWxsLCBzcGF3bmVkLmtpbGwuYmluZChzcGF3bmVkKSk7XG5cdHNwYXduZWQuY2FuY2VsID0gc3Bhd25lZENhbmNlbC5iaW5kKG51bGwsIHNwYXduZWQsIGNvbnRleHQpO1xuXG5cdGNvbnN0IGhhbmRsZVByb21pc2UgPSBhc3luYyAoKSA9PiB7XG5cdFx0Y29uc3QgW3tlcnJvciwgZXhpdENvZGUsIHNpZ25hbCwgdGltZWRPdXR9LCBzdGRvdXRSZXN1bHQsIHN0ZGVyclJlc3VsdCwgYWxsUmVzdWx0XSA9IGF3YWl0IGdldFNwYXduZWRSZXN1bHQoc3Bhd25lZCwgcGFyc2VkLm9wdGlvbnMsIHByb2Nlc3NEb25lKTtcblx0XHRjb25zdCBzdGRvdXQgPSBoYW5kbGVPdXRwdXQocGFyc2VkLm9wdGlvbnMsIHN0ZG91dFJlc3VsdCk7XG5cdFx0Y29uc3Qgc3RkZXJyID0gaGFuZGxlT3V0cHV0KHBhcnNlZC5vcHRpb25zLCBzdGRlcnJSZXN1bHQpO1xuXHRcdGNvbnN0IGFsbCA9IGhhbmRsZU91dHB1dChwYXJzZWQub3B0aW9ucywgYWxsUmVzdWx0KTtcblxuXHRcdGlmIChlcnJvciB8fCBleGl0Q29kZSAhPT0gMCB8fCBzaWduYWwgIT09IG51bGwpIHtcblx0XHRcdGNvbnN0IHJldHVybmVkRXJyb3IgPSBtYWtlRXJyb3Ioe1xuXHRcdFx0XHRlcnJvcixcblx0XHRcdFx0ZXhpdENvZGUsXG5cdFx0XHRcdHNpZ25hbCxcblx0XHRcdFx0c3Rkb3V0LFxuXHRcdFx0XHRzdGRlcnIsXG5cdFx0XHRcdGFsbCxcblx0XHRcdFx0Y29tbWFuZCxcblx0XHRcdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0XHRcdHBhcnNlZCxcblx0XHRcdFx0dGltZWRPdXQsXG5cdFx0XHRcdGlzQ2FuY2VsZWQ6IGNvbnRleHQuaXNDYW5jZWxlZCxcblx0XHRcdFx0a2lsbGVkOiBzcGF3bmVkLmtpbGxlZFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghcGFyc2VkLm9wdGlvbnMucmVqZWN0KSB7XG5cdFx0XHRcdHJldHVybiByZXR1cm5lZEVycm9yO1xuXHRcdFx0fVxuXG5cdFx0XHR0aHJvdyByZXR1cm5lZEVycm9yO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRjb21tYW5kLFxuXHRcdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0XHRleGl0Q29kZTogMCxcblx0XHRcdHN0ZG91dCxcblx0XHRcdHN0ZGVycixcblx0XHRcdGFsbCxcblx0XHRcdGZhaWxlZDogZmFsc2UsXG5cdFx0XHR0aW1lZE91dDogZmFsc2UsXG5cdFx0XHRpc0NhbmNlbGVkOiBmYWxzZSxcblx0XHRcdGtpbGxlZDogZmFsc2Vcblx0XHR9O1xuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZVByb21pc2VPbmNlID0gb25ldGltZShoYW5kbGVQcm9taXNlKTtcblxuXHRoYW5kbGVJbnB1dChzcGF3bmVkLCBwYXJzZWQub3B0aW9ucy5pbnB1dCk7XG5cblx0c3Bhd25lZC5hbGwgPSBtYWtlQWxsU3RyZWFtKHNwYXduZWQsIHBhcnNlZC5vcHRpb25zKTtcblxuXHRyZXR1cm4gbWVyZ2VQcm9taXNlKHNwYXduZWQsIGhhbmRsZVByb21pc2VPbmNlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhlY2E7XG5cbm1vZHVsZS5leHBvcnRzLnN5bmMgPSAoZmlsZSwgYXJncywgb3B0aW9ucykgPT4ge1xuXHRjb25zdCBwYXJzZWQgPSBoYW5kbGVBcmd1bWVudHMoZmlsZSwgYXJncywgb3B0aW9ucyk7XG5cdGNvbnN0IGNvbW1hbmQgPSBqb2luQ29tbWFuZChmaWxlLCBhcmdzKTtcblx0Y29uc3QgZXNjYXBlZENvbW1hbmQgPSBnZXRFc2NhcGVkQ29tbWFuZChmaWxlLCBhcmdzKTtcblxuXHR2YWxpZGF0ZUlucHV0U3luYyhwYXJzZWQub3B0aW9ucyk7XG5cblx0bGV0IHJlc3VsdDtcblx0dHJ5IHtcblx0XHRyZXN1bHQgPSBjaGlsZFByb2Nlc3Muc3Bhd25TeW5jKHBhcnNlZC5maWxlLCBwYXJzZWQuYXJncywgcGFyc2VkLm9wdGlvbnMpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHRocm93IG1ha2VFcnJvcih7XG5cdFx0XHRlcnJvcixcblx0XHRcdHN0ZG91dDogJycsXG5cdFx0XHRzdGRlcnI6ICcnLFxuXHRcdFx0YWxsOiAnJyxcblx0XHRcdGNvbW1hbmQsXG5cdFx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRcdHBhcnNlZCxcblx0XHRcdHRpbWVkT3V0OiBmYWxzZSxcblx0XHRcdGlzQ2FuY2VsZWQ6IGZhbHNlLFxuXHRcdFx0a2lsbGVkOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0Y29uc3Qgc3Rkb3V0ID0gaGFuZGxlT3V0cHV0KHBhcnNlZC5vcHRpb25zLCByZXN1bHQuc3Rkb3V0LCByZXN1bHQuZXJyb3IpO1xuXHRjb25zdCBzdGRlcnIgPSBoYW5kbGVPdXRwdXQocGFyc2VkLm9wdGlvbnMsIHJlc3VsdC5zdGRlcnIsIHJlc3VsdC5lcnJvcik7XG5cblx0aWYgKHJlc3VsdC5lcnJvciB8fCByZXN1bHQuc3RhdHVzICE9PSAwIHx8IHJlc3VsdC5zaWduYWwgIT09IG51bGwpIHtcblx0XHRjb25zdCBlcnJvciA9IG1ha2VFcnJvcih7XG5cdFx0XHRzdGRvdXQsXG5cdFx0XHRzdGRlcnIsXG5cdFx0XHRlcnJvcjogcmVzdWx0LmVycm9yLFxuXHRcdFx0c2lnbmFsOiByZXN1bHQuc2lnbmFsLFxuXHRcdFx0ZXhpdENvZGU6IHJlc3VsdC5zdGF0dXMsXG5cdFx0XHRjb21tYW5kLFxuXHRcdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0XHRwYXJzZWQsXG5cdFx0XHR0aW1lZE91dDogcmVzdWx0LmVycm9yICYmIHJlc3VsdC5lcnJvci5jb2RlID09PSAnRVRJTUVET1VUJyxcblx0XHRcdGlzQ2FuY2VsZWQ6IGZhbHNlLFxuXHRcdFx0a2lsbGVkOiByZXN1bHQuc2lnbmFsICE9PSBudWxsXG5cdFx0fSk7XG5cblx0XHRpZiAoIXBhcnNlZC5vcHRpb25zLnJlamVjdCkge1xuXHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdH1cblxuXHRcdHRocm93IGVycm9yO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRjb21tYW5kLFxuXHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdGV4aXRDb2RlOiAwLFxuXHRcdHN0ZG91dCxcblx0XHRzdGRlcnIsXG5cdFx0ZmFpbGVkOiBmYWxzZSxcblx0XHR0aW1lZE91dDogZmFsc2UsXG5cdFx0aXNDYW5jZWxlZDogZmFsc2UsXG5cdFx0a2lsbGVkOiBmYWxzZVxuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMuY29tbWFuZCA9IChjb21tYW5kLCBvcHRpb25zKSA9PiB7XG5cdGNvbnN0IFtmaWxlLCAuLi5hcmdzXSA9IHBhcnNlQ29tbWFuZChjb21tYW5kKTtcblx0cmV0dXJuIGV4ZWNhKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuY29tbWFuZFN5bmMgPSAoY29tbWFuZCwgb3B0aW9ucykgPT4ge1xuXHRjb25zdCBbZmlsZSwgLi4uYXJnc10gPSBwYXJzZUNvbW1hbmQoY29tbWFuZCk7XG5cdHJldHVybiBleGVjYS5zeW5jKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMubm9kZSA9IChzY3JpcHRQYXRoLCBhcmdzLCBvcHRpb25zID0ge30pID0+IHtcblx0aWYgKGFyZ3MgJiYgIUFycmF5LmlzQXJyYXkoYXJncykgJiYgdHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3M7XG5cdFx0YXJncyA9IFtdO1xuXHR9XG5cblx0Y29uc3Qgc3RkaW8gPSBub3JtYWxpemVTdGRpby5ub2RlKG9wdGlvbnMpO1xuXHRjb25zdCBkZWZhdWx0RXhlY0FyZ3YgPSBwcm9jZXNzLmV4ZWNBcmd2LmZpbHRlcihhcmcgPT4gIWFyZy5zdGFydHNXaXRoKCctLWluc3BlY3QnKSk7XG5cblx0Y29uc3Qge1xuXHRcdG5vZGVQYXRoID0gcHJvY2Vzcy5leGVjUGF0aCxcblx0XHRub2RlT3B0aW9ucyA9IGRlZmF1bHRFeGVjQXJndlxuXHR9ID0gb3B0aW9ucztcblxuXHRyZXR1cm4gZXhlY2EoXG5cdFx0bm9kZVBhdGgsXG5cdFx0W1xuXHRcdFx0Li4ubm9kZU9wdGlvbnMsXG5cdFx0XHRzY3JpcHRQYXRoLFxuXHRcdFx0Li4uKEFycmF5LmlzQXJyYXkoYXJncykgPyBhcmdzIDogW10pXG5cdFx0XSxcblx0XHR7XG5cdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0c3RkaW46IHVuZGVmaW5lZCxcblx0XHRcdHN0ZG91dDogdW5kZWZpbmVkLFxuXHRcdFx0c3RkZXJyOiB1bmRlZmluZWQsXG5cdFx0XHRzdGRpbyxcblx0XHRcdHNoZWxsOiBmYWxzZVxuXHRcdH1cblx0KTtcbn07XG4iLCAiaW1wb3J0IHsgQWN0aW9uUGFuZWwsIExpc3QsIHNob3dUb2FzdCwgVG9hc3RTdHlsZSwgQ2xpcGJvYXJkIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBydW5BcHBsZVNjcmlwdCwgcnVuQXBwbGVTY3JpcHRTeW5jIH0gZnJvbSBcInJ1bi1hcHBsZXNjcmlwdFwiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gXCIuL3R5cGVzL2Nvbm5lY3Rpb25cIjtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0VnBuQ29ubmVjdGlvbnMoKTogUHJvbWlzZTxDb25uZWN0aW9uW10+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBydW5BcHBsZVNjcmlwdChgXG4gICAgICB0ZWxsIGFwcGxpY2F0aW9uIFwiVHVubmVsYmxpY2tcIiB0byBnZXQgY29uZmlndXJhdGlvbnNcbiAgICBgKTtcblxuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gcmVzdWx0LnNwbGl0KFwiLFwiKS5tYXAoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBjb25uZWN0aW9uLnJlcGxhY2UoXCJjb25maWd1cmF0aW9uIFwiLCBcIlwiKS50cmltKCk7XG4gICAgICBjb25zdCBzdGF0dXMgPSBydW5BcHBsZVNjcmlwdFN5bmMoYFxuICAgICAgdGVsbCBhcHBsaWNhdGlvbiBcIlR1bm5lbGJsaWNrXCIgdG8gZ2V0IHN0YXRlIG9mIGZpcnN0IGNvbmZpZ3VyYXRpb24gd2hlcmUgbmFtZSA9IFwiJHtuYW1lfVwiXG4gICAgYCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbnM7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgcmVqZWN0KFwiQ291bG4ndCBnZXQgVlBOIGNvbm5lY3Rpb25zLiBNYWtlIHN1cmUgeW91IGhhdmUgVHVubmVsYmxpY2sgaW5zdGFsbGVkLlwiKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbY29ubmVjdGlvbnMsIHNldENvbm5lY3Rpb25zXSA9IHVzZVN0YXRlPENvbm5lY3Rpb25bXT4oW10pO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPEVycm9yIHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBnZXRWcG5Db25uZWN0aW9ucygpXG4gICAgICAudGhlbigoY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSkgPT4ge1xuICAgICAgICBzZXRDb25uZWN0aW9ucyhjb25uZWN0aW9ucyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBzZXRFcnJvcihuZXcgRXJyb3IoZXJyb3IpKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGlmIChlcnJvcikge1xuICAgIHNob3dUb2FzdChUb2FzdFN0eWxlLkZhaWx1cmUsIFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIiwgZXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfT5cbiAgICAgIHtjb25uZWN0aW9ucy5tYXAoKGNvbm5lY3Rpb24pID0+IChcbiAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgIGtleT17Y29ubmVjdGlvbi5uYW1lfVxuICAgICAgICAgIGljb249e2Nvbm5lY3Rpb24uc3RhdHVzID09PSBcIkVYSVRJTkdcIiA/IFwieG1hcmstY2lyY2xlLTE2XCIgOiBcImNoZWNrbWFyay1jaXJjbGUtMTZcIn1cbiAgICAgICAgICB0aXRsZT17Y29ubmVjdGlvbi5uYW1lfVxuICAgICAgICAgIHN1YnRpdGxlPXtjb25uZWN0aW9uLnN0YXR1cyA9PT0gXCJFWElUSU5HXCIgPyBcIkNvbm5lY3RcIiA6IFwiRGlzY29ubmVjdFwifVxuICAgICAgICAgIGFjdGlvbnM9e1xuICAgICAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgICAgICA8QWN0aW9uUGFuZWwuSXRlbVxuICAgICAgICAgICAgICAgIHRpdGxlPVwiQ29ubmVjdFwiXG4gICAgICAgICAgICAgICAga2V5PXtjb25uZWN0aW9uLm5hbWV9XG4gICAgICAgICAgICAgICAgb25BY3Rpb249eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXR1cyA9PT0gXCJFWElUSU5HXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhlYyhcbiAgICAgICAgICAgICAgICAgICAgICBgXG52cG5wdyAoKSB7XG4gICAgICAgIGxvY2FsIHB3PSQob3AgaXRlbSBnZXQgLS1maWVsZHMgcGFzc3dvcmQgTW9uZGF5VlBOKVxuICAgICAgICBsb2NhbCBvdHA9JChvcCBpdGVtIGdldCAtLW90cCBNb25kYXlWUE4pXG4gICAgICAgIGxvY2FsIGtleT1cIlxcJHtwd31cXCR7b3RwfVwiXG4gICAgICAgIGVjaG8gJGtleSB8IHRyIC1kICdcXG4nXG59XG52cG5wd1xuYCxcbiAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IsIHNyZG91dCwgc3RkZXJyKSA9PiBDbGlwYm9hcmQuY29weShzcmRvdXQpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bkFwcGxlU2NyaXB0U3luYyhgdGVsbCBhcHBsaWNhdGlvbiBcIlR1bm5lbGJsaWNrXCIgdG8gY29ubmVjdCBcIiR7Y29ubmVjdGlvbi5uYW1lfVwiYCk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUb2FzdChUb2FzdFN0eWxlLlN1Y2Nlc3MsIFwiQ29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcnVuQXBwbGVTY3JpcHRTeW5jKGB0ZWxsIGFwcGxpY2F0aW9uIFwiVHVubmVsYmxpY2tcIiB0byBkaXNjb25uZWN0IFwiJHtjb25uZWN0aW9uLm5hbWV9XCJgKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvYXN0KFRvYXN0U3R5bGUuU3VjY2VzcywgXCJEaXNjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBnZXRWcG5Db25uZWN0aW9ucygpLnRoZW4oc2V0Q29ubmVjdGlvbnMpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cbiIsICJpbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuaW1wb3J0IGV4ZWNhIGZyb20gJ2V4ZWNhJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkFwcGxlU2NyaXB0KHNjcmlwdCkge1xuXHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21hY09TIG9ubHknKTtcblx0fVxuXG5cdGNvbnN0IHtzdGRvdXR9ID0gYXdhaXQgZXhlY2EoJ29zYXNjcmlwdCcsIFsnLWUnLCBzY3JpcHRdKTtcblx0cmV0dXJuIHN0ZG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkFwcGxlU2NyaXB0U3luYyhzY3JpcHQpIHtcblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtYWNPUyBvbmx5Jyk7XG5cdH1cblxuXHRjb25zdCB7c3Rkb3V0fSA9IGV4ZWNhLnN5bmMoJ29zYXNjcmlwdCcsIFsnLWUnLCBzY3JpcHRdKTtcblx0cmV0dXJuIHN0ZG91dDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSwyQ0FBQUEsU0FBQTtBQUFBLElBQUFBLFFBQU8sVUFBVTtBQUNqQixVQUFNLE9BQU87QUFFYixRQUFJLEtBQUssUUFBUTtBQUVqQixhQUFTLGFBQWMsTUFBTSxTQUFTO0FBQ3BDLFVBQUksVUFBVSxRQUFRLFlBQVksU0FDaEMsUUFBUSxVQUFVLFFBQVEsSUFBSTtBQUVoQyxVQUFJLENBQUMsU0FBUztBQUNaLGVBQU87QUFBQSxNQUNUO0FBRUEsZ0JBQVUsUUFBUSxNQUFNLEdBQUc7QUFDM0IsVUFBSSxRQUFRLFFBQVEsRUFBRSxNQUFNLElBQUk7QUFDOUIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxlQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFLO0FBQ3ZDLFlBQUksSUFBSSxRQUFRLEdBQUcsWUFBWTtBQUMvQixZQUFJLEtBQUssS0FBSyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxNQUFNLEdBQUc7QUFDbkQsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsYUFBUyxVQUFXLE1BQU0sTUFBTSxTQUFTO0FBQ3ZDLFVBQUksQ0FBQyxLQUFLLGVBQWUsS0FBSyxDQUFDLEtBQUssT0FBTyxHQUFHO0FBQzVDLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTyxhQUFhLE1BQU0sT0FBTztBQUFBLElBQ25DO0FBRUEsYUFBUyxNQUFPLE1BQU0sU0FBUyxJQUFJO0FBQ2pDLFNBQUcsS0FBSyxNQUFNLFNBQVUsSUFBSSxNQUFNO0FBQ2hDLFdBQUcsSUFBSSxLQUFLLFFBQVEsVUFBVSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsTUFD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TTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO01BTFo7TUFPQTtRQUNFSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUFhO1FBQ2JDLFVBQVU7TUFMWjtNQU9BO1FBQ0VKLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtNQUxaO01BT0E7UUFDRUosTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO01BTFo7TUFPQTtRQUNFSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUFhO1FBQ2JDLFVBQVU7TUFMWjtNQU9BO1FBQ0VKLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtNQUxaO01BT0E7UUFDRUosTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO01BTFo7TUFPQTtRQUNFSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUNFO1FBQ0ZDLFVBQVU7TUFOWjtNQVFBO1FBQ0VKLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtNQUxaO01BT0E7UUFDRUosTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO01BTFo7TUFPQTtRQUNFSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUFhO1FBQ2JDLFVBQVU7UUFDVkMsUUFBUTtNQU5WO01BUUE7UUFDRUwsTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO01BTFo7TUFPQTtRQUNFSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUFhO1FBQ2JDLFVBQVU7TUFMWjtNQU9BO1FBQ0VKLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtNQUxaO01BT0E7UUFDRUosTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO01BTFo7TUFPQTtRQUNFSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUFhO1FBQ2JDLFVBQVU7TUFMWjtNQU9BO1FBQ0VKLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtNQUxaO01BT0E7UUFDRUosTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO01BTFo7TUFPQTtRQUNFSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUFhO1FBQ2JDLFVBQVU7TUFMWjtNQU9BO1FBQ0VKLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtNQUxaO01BT0E7UUFDRUosTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO1FBQ1ZDLFFBQVE7TUFOVjtNQVFBO1FBQ0VMLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtRQUNWQyxRQUFRO01BTlY7TUFRQTtRQUNFTCxNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUFhO1FBQ2JDLFVBQVU7TUFMWjtNQU9BO1FBQ0VKLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtNQUxaO01BT0E7UUFDRUosTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsYUFBYTtRQUNiQyxVQUFVO01BTFo7TUFPQTtRQUNFSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxhQUFhO1FBQ2JDLFVBQVU7TUFMWjtNQU9BO1FBQ0VKLE1BQU07UUFDTkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsVUFBVTtNQUxaO01BT0E7UUFDRUosTUFBTTtRQUNOQyxRQUFR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QSxZQUM5QztBQUNBLDhCQUFrQixFQUFFLEtBQUssY0FBYztBQUFBLFVBQ3pDO0FBQUEsV0F0QkssV0FBVyxJQXVCbEI7QUFBQSxPQUNGO0FBQUEsT0FoQ0csV0FBVyxJQWtDbEIsQ0FDRDtBQUFBLEdBQ0g7QUFFSjsiLAogICJuYW1lcyI6IFsibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAicGF0aCIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm9uZXRpbWUiLCAiU0lHTkFMUyIsICJuYW1lIiwgIm51bWJlciIsICJhY3Rpb24iLCAiZGVzY3JpcHRpb24iLCAic3RhbmRhcmQiLCAiZm9yY2VkIiwgImdldFJlYWx0aW1lU2lnbmFscyIsICJsZW5ndGgiLCAiU0lHUlRNQVgiLCAiU0lHUlRNSU4iLCAiQXJyYXkiLCAiZnJvbSIsICJnZXRSZWFsdGltZVNpZ25hbCIsICJ2YWx1ZSIsICJpbmRleCIsICJuYW1lIiwgIm51bWJlciIsICJhY3Rpb24iLCAiZGVzY3JpcHRpb24iLCAic3RhbmRhcmQiLCAiZ2V0U2lnbmFscyIsICJyZWFsdGltZVNpZ25hbHMiLCAic2lnbmFscyIsICJTSUdOQUxTIiwgIm1hcCIsICJub3JtYWxpemVTaWduYWwiLCAibmFtZSIsICJudW1iZXIiLCAiZGVmYXVsdE51bWJlciIsICJkZXNjcmlwdGlvbiIsICJhY3Rpb24iLCAiZm9yY2VkIiwgInN0YW5kYXJkIiwgImNvbnN0YW50U2lnbmFsIiwgImNvbnN0YW50cyIsICJzdXBwb3J0ZWQiLCAidW5kZWZpbmVkIiwgImdldFNpZ25hbHNCeU5hbWUiLCAic2lnbmFscyIsICJyZWR1Y2UiLCAiZ2V0U2lnbmFsQnlOYW1lIiwgInNpZ25hbEJ5TmFtZU1lbW8iLCAibmFtZSIsICJudW1iZXIiLCAiZGVzY3JpcHRpb24iLCAic3VwcG9ydGVkIiwgImFjdGlvbiIsICJmb3JjZWQiLCAic3RhbmRhcmQiLCAic2lnbmFsc0J5TmFtZSIsICJnZXRTaWduYWxzQnlOdW1iZXIiLCAibGVuZ3RoIiwgIlNJR1JUTUFYIiwgInNpZ25hbHNBIiwgIkFycmF5IiwgImZyb20iLCAidmFsdWUiLCAiZ2V0U2lnbmFsQnlOdW1iZXIiLCAiT2JqZWN0IiwgImFzc2lnbiIsICJzaWduYWwiLCAiZmluZFNpZ25hbEJ5TnVtYmVyIiwgInVuZGVmaW5lZCIsICJmaW5kIiwgImNvbnN0YW50cyIsICJzaWduYWxBIiwgInNpZ25hbHNCeU51bWJlciIsICJtb2R1bGUiLCAibW9kdWxlIiwgInJlcXVpcmVfc2lnbmFscyIsICJtb2R1bGUiLCAibW9kdWxlIiwgInByb2Nlc3MiLCAidW5sb2FkIiwgImVtaXQiLCAibG9hZCIsICJwcm9jZXNzUmVhbGx5RXhpdCIsICJwcm9jZXNzRW1pdCIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAic3RyZWFtIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiZXhlY2EiLCAicHJvY2VzcyIsICJleGVjYSIsICJjb25uZWN0aW9ucyIsICJlcnJvciJdCn0K
