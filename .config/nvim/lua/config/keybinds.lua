local function map(m, k, v, d)
    vim.keymap.set(m, k, v, { silent = true, desc = d })
end

local gotoPreview = require("goto-preview")

-- Essentials
map("n", "<leader>q", "<CMD>q<CR>", "Quit")
map("n", "<leader>h", "<CMD>nohlsearch<CR>", "No Highlight")
map("n", "<leader>fn", "<CMD>enew<CR>", "New File")
map("n", "P", "<CMD>put<CR>", "Paste in new Line")
map("n", "<leader>i", require("nvim-toggler").toggle, "Toggle Value")
map("v", "<leader>i", require("nvim-toggler").toggle, "Toggle Value")
map("n", "<leader>s", "<CMD>write<CR>", "Save File")
map("i", "<C-s>", "<esc><CMD>write<CR>", "Force Save File")
map("n", "<leader>w", "<C-w>")
map("n", "<C-f>", "<CMD>lua vim.lsp.buf.format()<CR>", "Format Buffer")
map("n", "<S-Up>", "<CMD>move -2<CR>", "Move Line Up")
map("n", "<S-Down>", "<CMD>move +1<CR>", "Move Line Down")
map("i", "<S-Up>", "<ESC><CMD>move -2<CR>", "Move Line Up")
map("i", "<S-Down>", "<ESC><CMD>move +1<CR>", "Move Line Down")
map("n", "zR", require("ufo").openAllFolds, "Open all Folds")
map("n", "zM", require("ufo").closeAllFolds, "Close all Folds")
map("n", "zr", require("ufo").openFoldsExceptKinds, "Open All Folds except Kinds")
map("n", "zm", require("ufo").closeFoldsWith, "Close all Folds")
map("n", "K", function()
    local winid = require("ufo").peekFoldedLinesUnderCursor()
    if not winid then
        vim.lsp.buf.hover()
    end
end, "Close all Folds")

-- UI
map("n", "<leader>ut", "<CMD>Twilight<CR>", "Toggle Twilight")
map("n", "<leader>uc", "<CMD>ColorizerToggle<CR>", "Toggle Color-Previews")

-- Packer
map("n", "<leader>pi", "<CMD>Lazy<CR>", "Lazy Package Manager")
map("n", "<leader>pI", "<CMD>Mason<CR>", "Mason Installer")
map("n", "<leader>pU", "<CMD>MasonUpdateAll<CR>", "Mason Update")
map("n", "<leader>ps", "<CMD>PackerSync<CR>", "Packer Sync")
map("n", "<leader>pS", "<CMD>PackerStatus<CR>", "Packer Status")

-- Bufdelete
map("n", "<leader>c", "<CMD>lua require('bufdelete').bufdelete(0, false)<CR>", "Close Buffer")
map("n", "<leader>C", "<CMD>lua require('bufdelete').bufdelete(0, true)<CR>", "Force close Buffer")

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
map("n", "<leader>fh", "<CMD>Telescope highlights<CR>", "Search Highlight Groups")
map("n", "<leader>fH", "<CMD>Telescope help_tags<CR>", "Search Help Tags")
map("n", "<leader>fR", "<CMD>Telescope frecency<CR>", "Search recent files")
map("n", "<leader>fr", "<CMD>Telescope frecency workspace=CWD<CR>", "Search recent files in CWD")

-- Buffer Menu
map("n", "<leader>fe", "<esc><cmd>lua require('buffer_manager.ui').toggle_quick_menu()<cr>", "Show Buffer Quick Menu")

-- Session Manager
map("n", "<leader>Sl", "<CMD>SessionManager! load_last_session<CR>", "Load last session")
map("n", "<leader>Ss", "<CMD>SessionManager! save_current_session<CR>", "Save this session")
map("n", "<leader>Sd", "<CMD>SessionManager! delete_session<CR>", "Delete session")
map("n", "<leader>Sf", "<CMD>SessionManager! load_session<CR>", "Search sessions")
map("n", "<leader>S.", "<CMD>SessionManager! load_current_dir_session<CR>", "Load current directory session")

-- Buffer Navigation
map("n", "<S-l>", "<CMD>BufferLineCycleNext<CR>", "Next Buffer Tab")
map("n", "<S-h>", "<CMD>BufferLineCyclePrev<CR>", "Previous Buffer Tab")

map("n", "<leader><tab>", "<CMD>tabnext<CR>", "Next Tab")
map("t", "<leader><tab>", "<CMD>tabnext<CR>", "Next Tab")
-- Terminal
map(
    "n",
    "<leader>tf",
    "<CMD>FloatermNew --height=0.9 --width=0.9 --disposable <CR>",
    "New floating disposable Terminal"
)
map("n", "<leader>tF", "<CMD>FloatermNew --height=0.9 --width=0.9<CR>", "New floating Terminal")
map("n", "<leader>tv", "<CMD>ToggleTerm direction=vertical size=50<CR>", "New vertical Terminal")
map("n", "<leader>tt", "<CMD>ToggleTerm direction=tab<CR>", "New Terminal-Tab")
map("n", "<leader>th", "<CMD>Telescope highlights<CR>", "Search Highlight-Groups")
map("n", "<leader>tH", "<CMD>FloatermNew --wintype=split --disposable <CR>", "New horizontal Terminal")
map(
    "n",
    "<leader>tm",
    "<CMD>FloatermNew --height=0.9 --width=0.9 --disposable --title=MidnightCommander mc<CR>",
    "New floating MidnightCommander"
)
map(
    "n",
    "<leader>tg",
    "<CMD>FloatermNew --height=0.9 --width=0.9 --disposable --title=LazyGit lazygit<CR>",
    "New floating LazyGit"
)

-- goto-preview
map("n", "gpd", gotoPreview.goto_preview_definition, "Preview Definition")
map("n", "gpt", gotoPreview.goto_preview_type_definition, "Preview Type")
map("n", "gpi", gotoPreview.goto_preview_implementation, "Implementation")
map("n", "gP", gotoPreview.close_all_win, "Close all Previews")
map("n", "gpr", gotoPreview.goto_preview_references, "Preview References")

-- LSP
map("n", "<leader>lf", "<CMD>Lspsaga lsp_finder<CR>", "Find Definition")
map("n", "<leader>la", "<CMD>CodeActionMenu<CR>", "Code Action")
map("n", "<leader>lr", "<CMD>Lspsaga rename<CR>", "Rename")
map("n", "<leader>ld", "<CMD>TroubleToggle<CR>", "Toggle Diagnostics List")
map("n", "[e", "<CMD>Lspsaga diagnostics_jump_prev<CR>", "Jump to next Issue")
map("n", "]e", "<CMD>Lspsaga diagnostics_jump_next<CR>", "Jump to previous Issue")
map(
    "n",
    "[e",
    "<CMD>lua require('lspsaga.diagnostics').goto_next({ severity = vim.diagnostics.severity.ERROR })<CR>",
    "Jump to next Error"
)
map(
    "n",
    "]e",
    "<CMD>lua require('lspsaga.diagnostics').goto_prev({ severity = vim.diagnostics.severity.ERROR })<CR>",
    "Jump to previous Error"
)
map("n", "K", "<CMD>Lspsaga hover_doc<CR>", "Hover Diagnostics")
map("t", "<F16>", [[<C-\><C-n><cmd>Lspsaga close_floaterm<CR>]], "Close Floatterm")
