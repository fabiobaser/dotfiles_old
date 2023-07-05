# Fabio Baser's Dotfiles

## Installation of Dotfiles

```bash
git clone --bare https://github.com/fabiobaser/dotfiles .dotfiles
```

```bash
git --git-dir=$HOME/.dotfiles --work-tree=$HOME config --local status.showUntrackedFiles no
```

```bash
git --git-dir=$HOME/.dotfiles --work-tree=$HOME checkout
```

## Installation of used tools & packages

### Sheldon / ZSH-Packages
There will be many error messages in your console after checkout, mainly because you are missing the zsh-packages installed by sheldon (zsh-package-manage similiar to oh-my-zsh) this will resolve itself when sheldon is installed and executed (automatically on shell load). Sheldon itself is not installed. You have to do this yourself with e.g.: `brew install sheldon` or `cargo install sheldon`. Sheldon will be automatically installed if you install all homebrew packages like mentioned in the Homebrew section.

### Homebrew
All Formulae and Casks are regularly dumped into the `Brewfile` with `brew bundle dump --force` and can be installed from there too with:
```
brew bundle install
```
