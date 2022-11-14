function dfg --description 'Opens Lazygit with custom config and dotfiles-repo'
  /usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME $argv
end
