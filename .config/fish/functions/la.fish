function la --wraps=ls --wraps='exa --icons -a --group-directories-first' --description 'List all files and directories'
  exa --icons -a --group-directories-first $argv; 
end
