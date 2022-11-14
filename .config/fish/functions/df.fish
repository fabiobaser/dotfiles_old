function df --description 'Opens Lazygit with custom config and dotfiles-repo'
  lazygit --use-config-file "$HOME/.config/lazygit.yml,$HOME/Library/Application Support/lazygit/config.yml" --work-tree ~ --git-dir $HOME/.dotfiles
end
