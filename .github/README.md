# Fabio Baser's Dotfiles

## Installation of Dotfiles

```bash
git clone --bare https://github.com/fabiobaser/dotfiles .dotfiles
```

```bash
git --git-dit=$HOME/.dotfiles --work-tree=$HOME config --local status.showUntrackedFiles no
```

```bash
git --git-dit=$HOME/.dotfiles --work-tree=$HOME checkout
```

## Installation of used tools & packages

### Homebrew
All Formulae and Casks are regularly dumped into the `Brewfile` with `brew bundle dump --force` and can be installed from there too with:
```
brew bundle install
```
