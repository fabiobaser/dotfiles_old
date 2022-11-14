function l --wraps='exa -1 --icons --group-directories-first --git-ignore' --description 'Lists all, with git-ignored, 3 levels deep'
  exa -aT --level 1 --group-directories-first --icons $argv
end
