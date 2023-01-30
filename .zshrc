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
export EDITOR="nvim"
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

alias v="nvim --listen /tmp/nvimsocket"
alias vrc="nvim ~/.config/nvim/"
alias wezrc="nvim ~/.config/wezterm/wezterm.lua"
alias zshconfig="nvim ~/.zshrc"
alias zshrc="zshconfig"
alias zshreload="source ~/.zshrc"
alias lg="lazygit"

# TMUX Aliases
alias t="tmux"
alias tn="tmux new -t"
alias ta="tmux attach -t"
alias td="tmux detach"

alias tm="tmuxinator"
function vpnpw {
    local pw=$(op item get --fields password MondayVPN)
    local otp=$(op item get --otp MondayVPN)
    local key="${pw}${otp}"
    echo $key | tr -d '\n' | pbcopy
    # echo $key # not needed when executed by a hotkey
}

function tmo {
    project=${PWD##*/}

    if [ -z "$1" ]
    then
          tmuxinator open $project
    else
          tmuxinator open $1
    fi
}
function tms {
    project=${PWD##*/}

    if [ -z "$1" ]
    then
          tmuxinator start $project
    else
          tmuxinator start $1
    fi
}

function tmstop {
    project=${PWD##*/}

    if [ -z "$1" ]
    then
          tmuxinator stop $project
    else
          tmuxinator stop $1
    fi
}

function setWallpaper() {
    sqlite3 ~/Library/Application\ Support/Dock/desktoppicture.db "update data set value = '$1'" && killall Dock 
}

# setWallpaper ~/wallpaper.jpg

alias l="exa -1 --icons --group-directories-first --git-ignore"
alias la="exa --icons -a --group-directories-first"
alias ll="exa -T -L 3 --icons --group-directories-first --git-ignore -I node_modules"
alias lll="exa -T -L 3 --icons --group-directories-first"

alias c="clear;export NEW_LINE_BEFORE_PROMPT=0; printf '\e[3J'" #tput reset
# PNPM Aliases
alias p=pnpm
alias px="pnpm nx"
alias x="pnpm nx run"

alias df='lg -g $HOME/.dotfiles -w $HOME'
alias dfg='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'

#Mac Specific Commands
alias hidedesktop="defaults write com.apple.finder CreateDesktop -bool FALSE;killall Finder"
alias showdesktop="defaults write com.apple.finder CreateDesktop -bool TRUE;killall Finder"
alias showfiles="defaults write com.apple.finder AppleShowAllFiles YES"
alias hidefiles="defaults write com.apple.finder AppleShowAllFiles NO"

# Java Commands
alias j12="export JAVA_HOME=`/usr/libexec/java_home -v 12`; java -version"
alias j11="export JAVA_HOME=`/usr/libexec/java_home -v 11`; java -version"
alias j10="export JAVA_HOME=`/usr/libexec/java_home -v 10`; java -version"
alias j9="export JAVA_HOME=`/usr/libexec/java_home -v 9`; java -version"
alias j8="export JAVA_HOME=`/usr/libexec/java_home -v 1.8`; java -version"

#Source external Shell-Scripts
defaults write com.apple.finder CreateDesktop -bool false

eval "$(sheldon source)"
eval "$(starship init zsh)"
# Profiling End-Block
# zprof

# pnpm
export PNPM_HOME="/Users/fabiobaser/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
# pnpm end
