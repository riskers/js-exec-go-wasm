const {exec} = require('shelljs')

const wasmExec = (func, funcArgs) => {
  // ['bar', 'foo'] => '"bar" "foo"'
  const args = funcArgs
    .map((arg) => {
      return "'" + arg + "'";
    })
    .join(' ');

  /*
   * Of course, you can use child_process to get the same result:
   * const { spawnSync } = require('node:child_process');
   * 
   * const proc = spawnSync('node', ['./wasm_exec_node_myself.js', './test.wasm', func, ...funcArgs], { env: allEnv });
   */
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