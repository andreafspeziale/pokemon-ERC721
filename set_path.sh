#!/bin/sh

#
# Add local node.js binaries to PATH environment variable
#
# USAGE: source ./set_path.sh
#    OR: . ./set_path.sh
#

nodebin="$(pwd)/node_modules/.bin"

case ":$PATH:" in
    *:$nodebin:*) hash -r ;;
    *) export PATH="$nodebin:$PATH" ;;
esac