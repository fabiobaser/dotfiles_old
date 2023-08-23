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
map("n", "K", vim.lsp.buf.hover, "Close all Folds")

map("n", "<leader>pi", "<CMD>Lazy<CR>", "Lazy Package Manager")
map("n", "<leader>pI", "<CMD>Mason<CR>", "Mason Package Manager")
-- only needed for MacBookPro + EurKeys
-- map("n", "§", "^")

-- Bufdelete
map("n", "<leader>c", "<CMD>lua require('bufdelete').bufdelete(0, false)<CR>", "Close Buffer")
map("n", "<leader>C", "<CMD>lua require('bufdelete').bufdelete(0, true)<CR>", "Force close Buffer")

-- Commenting
map("n", "<leader>/", require("Comment.api").toggle.linewise.current, "Comment Line")
map("v", "<leader>/", "<esc><cmd>lua require('Comment.api').toggle.linewise(vim.fn.visualmode())<cr>", "Comment Block")

-- Session Manager
map("n", "<leader>Sl", "<CMD>SessionManager! load_last_session<CR>", "Load last session")
map("n", "<leader>Ss", "<CMD>SessionManager! save_current_session<CR>", "Save this session")
map("n", "<leader>Sd", "<CMD>SessionManager! delete_session<CR>", "Delete session")
map("n", "<leader>Sf", "<CMD>SessionManager! load_session<CR>", "Search sessions")
map("n", "<leader>S.", "<CMD>SessionManager! load_current_dir_session<CR>", "Load current directory session")

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

map("n", "<leader>xx", require("dropbar.api").pick, "Pick from Dropbar")

-- goto-preview
map("n", "gpd", gotoPreview.goto_preview_definition, "Preview Definition")
map("n", "gpt", gotoPreview.goto_preview_type_definition, "Preview Type")
map("n", "gpi", gotoPreview.goto_preview_implementation, "Implementation")
map("n", "gP", gotoPreview.close_all_win, "Close all Previews")
map("n", "gpr", gotoPreview.goto_preview_references, "Preview References")

-- LSP
-- map("n", "<leader>lf", "<CMD>Lspsaga lsp_finder<CR>", "Find Definition")
map("n", "<leader>la", "<CMD>CodeActionMenu<CR>", "Code Action")
-- map("n", "<leader>lr", "<CMD>Lspsaga rename<CR>", "Rename")
-- map("n", "<leader>ld", "<CMD>TroubleToggle<CR>", "Toggle Diagnostics List")
-- map("n", "[e", "<CMD>Lspsaga diagnostics_jump_prev<CR>", "Jump to next Issue")
-- map("n", "]e", "<CMD>Lspsaga diagnostics_jump_next<CR>", "Jump to previous Issue")
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
-- map("n", "K", "<CMD>Lspsaga hover_doc<CR>", "Hover Diagnostics")
map("t", "<F16>", [[<C-\><C-n><cmd>:q<CR>]], "Close Floatterm")
