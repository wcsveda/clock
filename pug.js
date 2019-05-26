const pug = require("pug"),
  prettier = require("prettier"),
  write = require("write-to-file");

const args = process.argv;

if (args.length <= 2) {
  console.log("no file(s) specified");
  return;
}

const prettierConfig = {
  parser: "html",
  arrowParens: "avoid",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "ignore",
  insertPragma: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false
};

const pugConfig = {
  doctype: "html5"
};

for (let n = 2; n < args.length; n++) {
  let path = args[n];
  const text = prettier.format(pug.renderFile(path, pugConfig), prettierConfig);

  console.log(path);
  
  if (path.endsWith(".pug"))
    path = path.substring(0, path.length - 3).concat("html");
  else
    path = path.concat(".html");

  console.log(path);
  write(path, text);
}