#!/usr/bin/env bash
echo $GITHUB_REF
if [[ $GITHUB_REF == refs/pull/* ]]; then
  echo 'is PR'
else
  echo 'is not PR'
fi