const {exec} = require('shelljs')

exec('node wasm_exec_node_myself.js test.wasm add 1 2');

const wasmExec = (func, funcArgs) => {
  // ['bar', 'foo'] => '"bar" "foo"'
  const args = funcArgs
    .map((arg) => {
      return "'" + arg + "'";
    })
    .join(' ');

  // console.log(`node ./wasm_exec_node_myself.js ./test.wasm ${func} ${args}`);

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