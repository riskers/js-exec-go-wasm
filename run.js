/*
 * Of course, you can use child_process.execSync() to get the same result.
 */
const {exec} = require('shelljs')

const wasmExec = (func, funcArgs) => {
  // ['bar', 'foo'] => '"bar" "foo"'
  const args = funcArgs
    .map((arg) => {
      return "'" + arg + "'";
    })
    .join(' ');

  const result = exec(
    `node ./wasm_exec_node_myself.js ./test.wasm ${func} ${args}`,
    {
      silent: true
    }
  );

  return result.stdout;
};

const add = (a, b) => {
  return wasmExec('add', [a, b]);
}

module.exports = {
  add
}