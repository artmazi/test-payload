const { spawn } = require('child_process');

const child = spawn('npx', ['-y', 'create-payload-app@latest', 'temp-app', '-t', 'blank', '--no-deps'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

child.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  if (output.includes('Select a database')) {
    // MongoDB is the second option (index 1), let's just press Enter if it's default, or down then enter
    // Wait, MongoDB is usually default (marked with ●)
    child.stdin.write('\n');
  }
});

child.stderr.on('data', (data) => {
  console.error(data.toString());
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
