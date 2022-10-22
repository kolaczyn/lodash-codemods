## How to run

```sh
# setup
yarn global add jscodeshift@0.14.0
# run lodash-to-lodash-es on example code
cd lodash-to-lodash-es
jscodeshift -t ./codemod.js ./example-input.js -d -p
```
