---
title: .zshrc
description: My zsh configuration file
---

```zsh
export ZSH="$HOME/.oh-my-zsh"

plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  zsh-z
  docker-compose
  bun
)

source $ZSH/oh-my-zsh.sh

alias gs="git status"
alias gco="git checkout"
alias gcob="git checkout -b"
alias gp="git push"
alias gpnv="git push --no-verify"
alias gpl="git pull"
alias main="git checkout main"
alias master="git checkout master"

alias code="cursor"
alias vi="nvim"
alias docker-compose="docker compose"

eval "$(starship init zsh)"
```
