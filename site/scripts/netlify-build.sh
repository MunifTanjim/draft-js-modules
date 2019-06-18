#!/bin/sh

get_peer_dependencies() {
  cat package.json | sed -n -e '/"peerDependencies": {/,/}/p' | tr -d ' \n' | sed -e 's/"peerDependencies":{"//g; s/":"/@/g; s/","/ /g; s/"}//g'
}

echo "=== Installing Peer Dependencies"
peer_dependencies=$(get_peer_dependencies)
npm install --no-save ${peer_dependencies}

echo "=== Building"
npm run build
