# Fig pre block. Keep at the top of this file.
[[ -f "$HOME/.fig/shell/zshrc.pre.zsh" ]] && builtin source "$HOME/.fig/shell/zshrc.pre.zsh"
# Profiling Start-Block
# zmodload zsh/zprof

#Enable Command-Correction
setopt correct

if [[ -n ${ZSH_VERSION-} ]]; then
  autoload -U +X compinit && if [[ ${ZSH_DISABLE_COMPFIX-} = true ]]; then
    compinit -u
  else
    compinit
  fi
  autoload -U +X bashcompinit && bashcompinit
fi

# fnm init
eval "$(/opt/homebrew/bin/fnm env --use-on-cd)"

#ZSH_THEME=spaceship

#Env Variables
export PATH=$HOME/bin:/usr/local/bin:/opt/homebrew/bin/:/usr/local/Cellar:/opt/Sencha/Cmd:/opt/homebrew/Cellar:$PATH
export EDITOR="/opt/homebrew/bin/nvim"
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
export ZSH="/Users/fabiobaser/.oh-my-zsh"
export LANG=de_DE.UTF-8
export FZF_DEFAULT_COMMAND="fd -H -t f -E .git -E .DS_Store"

#COMPLETION_WAITING_DOTS="true"
HIST_STAMPS="dd.mm.yyyy"

# disable sort when completing `git checkout`
zstyle ':completion:*:git-checkout:*' sort false
# set descriptions format to enable group support
zstyle ':completion:*:descriptions' format '[%d]'
# set list-colors to enable filename colorizing
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
# preview directory's content with exa when completing cd
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'exa -1 --color=always $realpath'
# switch group using `,` ad `.`
zstyle ':fzf-tab:*' switch-group ',' '.'

#ZSH Plugins
plugins=(
  colored-man-pages
  brew
  1password
  colorize
  command-not-found
  fnm
  tmuxinator
  z
)

fpath+=${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions/src
source $ZSH/oh-my-zsh.sh

alias v="nvim"
alias zv="z $1"
alias vrc="nvim ~/.config/nvim/"
alias zshconfig="nvim ~/.zshrc"
alias zshrc="zshconfig"
alias zshreload="source ~/.zshrc"

function vpnpw {
    local pw=$(op item get --fields password MondayVPN)
    local otp=$(op item get --otp MondayVPN)
    local key="${pw}${otp}"
    echo $key | tr -d '\n' | pbcopy
    # echo $key # not needed when executed by a hotkey
}

# setWallpaper ~/wallpaper.jpg

alias l="exa -1 --icons --group-directories-first --git-ignore"
alias la="exa --icons -a --group-directories-first"
alias ll="exa -T -L 3 --icons --group-directories-first --git-ignore -I node_modules"
alias lll="exa -T -L 3 --icons --group-directories-first"

alias c="clear;export NEW_LINE_BEFORE_PROMPT=0; printf '\e[3J'" #tput reset

# NPM Helper
alias list_node_module_dirs="find . -name 'node_modules' -type d -prune"
alias rm_node_modules_recursive="find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +"

alias df='lg -g $HOME/.dotfiles -w $HOME'
alias dfg='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'

#Mac Specific Commands
alias hidedesktop="defaults write com.apple.finder CreateDesktop -bool FALSE;killall Finder"
alias showdesktop="defaults write com.apple.finder CreateDesktop -bool TRUE;killall Finder"
alias showfiles="defaults write com.apple.finder AppleShowAllFiles YES"
alias hidefiles="defaults write com.apple.finder AppleShowAllFiles NO"
alias cleardock="defaults write com.apple.dock persistent-apps -array; killall Dock"

# Java Commands
alias j12="export JAVA_HOME=`/usr/libexec/java_home -v 12`; java -version"
alias j11="export JAVA_HOME=`/usr/libexec/java_home -v 11`; java -version"
alias j10="export JAVA_HOME=`/usr/libexec/java_home -v 10`; java -version"
alias j9="export JAVA_HOME=`/usr/libexec/java_home -v 9`; java -version"
alias j8="export JAVA_HOME=`/usr/libexec/java_home -v 1.8`; java -version"

# Setup Pyenv
export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

eval "$(sheldon source)"

abbrev-alias lg="lazygit"
abbrev-alias ld="lazydocker"

abbrev-alias n="npm"
abbrev-alias -r ni="n install"
abbrev-alias -r nr="n run"

abbrev-alias t="tmux"

abbrev-alias p="pnpm"
abbrev-alias -r pi="p install"
abbrev-alias -r pir="pi -r"
abbrev-alias -r px="p nx"
abbrev-alias -r pxr="px run"
abbrev-alias -r pxrm="px run-many --target"

abbrev-alias shad="sheldon add --github"

abbrev-alias d="docker"
abbrev-alias -r db="d build"

eval "$(starship init zsh)"
# Profiling End-Block
# zprof

# pnpm
export PNPM_HOME="/Users/fabiobaser/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
# pnpm end

# Fig post block. Keep at the bottom of this file.
[[ -f "$HOME/.fig/shell/zshrc.post.zsh" ]] && builtin source "$HOME/.fig/shell/zshrc.post.zsh"
