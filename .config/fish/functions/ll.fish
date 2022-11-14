function ll --wraps=ls --wraps='exa -T -L 3 --icons --group-directories-first --git-ignore -I node_modules' --description 'alias ll=exa -T -L 3 --icons --group-directories-first --git-ignore -I node_modules'
  exa -T -L 3 --icons --group-directories-first --git-ignore -I node_modules $argv; 
end
