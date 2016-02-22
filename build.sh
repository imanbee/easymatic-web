#!/bin/bash
FOLDER_NAME="www"
mkdir -p $FOLDER_NAME
webpack -p
cp index.html $FOLDER_NAME
cp -r dist $FOLDER_NAME
tar zcvf $FOLDER_NAME.tar.gz $FOLDER_NAME
rm -rf $FOLDER_NAME

