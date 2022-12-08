local function map(m, k, v, d)
    vim.keymap.set(m, k, v, { silent = true, desc = d })
end

-- Essentials
map("n", "<leader>q", "<CMD>q<CR>", "Quit")
map("n", "<leader>h", "<CMD>nohlsearch<CR>", "No Highlight")
map("n", "<leader>fn", "<CMD>enew<CR>", "New File")
map("n", "<C-s>", "<CMD>write<CR>", "Force Save File")
map("i", "<C-s>", "<esc><CMD>write<CR>", "Force Save File")
map("n", "<C-f>", "<CMD>lua vim.lsp.buf.format()<CR>", "Format Buffer")
map("n", "<S-Up>", "<CMD>move -2<CR>", "Move Line Up")
map("n", "<S-Down>", "<CMD>move +1<CR>", "Move Line Down")
map("i", "<S-Up>", "<ESC><CMD>move -2<CR>", "Move Line Up")
map("i", "<S-Down>", "<ESC><CMD>move +1<CR>", "Move Line Down")

-- Packer
map("n", "<leader>pi", "<CMD>PackerInstall<CR>", "Packer Install")
map("n", "<leader>ps", "<CMD>PackerSync<CR>", "Packer Sync")
map("n", "<leader>pS", "<CMD>PackerStatus<CR>", "Packer Status")

-- NeoTree
map("n", "<leader>e", "<CMD>Neotree toggle<CR>", "Toggle Explorer")
map("n", "<leader>o", "<CMD>Neotree focus<CR>", "Focus Explorer")

-- Aerial (Symbol Outline)
map("n", "<leader>lS", "<CMD>AerialToggle<CR>", "Toggle Outline")

-- Commenting
map("n", "<leader>/", require("Comment.api").toggle.linewise.current, "Comment Line")
map("v", "<leader>/", "<esc><cmd>lua require('Comment.api').toggle.linewise(vim.fn.visualmode())<cr>", "Comment Block")

-- Telescope (Search)
map("n", "<leader>ff", "<CMD>Telescope find_files<CR>", "Search for File")
map("n", "<leader>fg", "<CMD>Telescope live_grep<CR>", "Search for Word")
map("n", "<leader>fb", "<CMD>Telescope buffers<CR>", "Search Buffers")
map("n", "<leader>fh", "<CMD>Telescope help_tags<CR>", "Search Help Tags")

-- Buffer Menu
map("n", "<leader>fe", "<esc><cmd>lua require('buffer_manager.ui').toggle_quick_menu()<cr>", "Show Buffer Quick Menu")
map("n", "<leader>fh", "<CMD>Telescope help_tags<CR>", "Search Help Tags")

-- Session Manager
map("n", "<leader>Sl", "<CMD>SessionManager! load_last_session<CR>", "Load last session")
map("n", "<leader>Ss", "<CMD>SessionManager! save_current_session<CR>", "Save this session")
map("n", "<leader>Sd", "<CMD>SessionManager! delete_session<CR>", "Delete session")
map("n", "<leader>Sf", "<CMD>SessionManager! load_session<CR>", "Search sessions")
map("n", "<leader>S.", "<CMD>SessionManager! load_current_dir_session<CR>", "Load current directory session")

-- Buffer Navigation
map("n", "<S-l>", "<CMD>BufferLineCycleNext<CR>", "Next Buffer Tab")
map("n", "<S-h>", "<CMD>BufferLineCyclePrev<CR>", "Previous Buffer Tab")

-- Terminal
map("n", "<leader>tf", "<CMD>ToggleTerm direction=float<cr>", "Terminal floating")
map("n", "<leader>th", "<CMD>ToggleTerm direction=horizontal<cr>", "Terminal floating")
map("n", "<leader>tv", "<CMD>ToggleTerm direction=vertical<cr>", "Terminal floating")
map("n", "<leader>tg", "<CMD>lua Toggle_lazygit()<cr>", "Open Lazygit")

map("n", "<F7>", "<CMD>ToggleTerm<cr>", "Close Terminal")
