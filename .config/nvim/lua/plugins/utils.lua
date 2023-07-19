return {
    { "famiu/bufdelete.nvim" },
    {
        "kylechui/nvim-surround",
        config = true,
    },
    {
        "aserowy/tmux.nvim",
        config = true,
    },
    {
        "akinsho/toggleterm.nvim",
        config = true,
    },
    {
        "motosir/skel-nvim",
        opts = {
            skel_enabled = true,
            apply_skel_for_empty_file = true,
            mappings = {
                ["*.tsx"] = "tsx.skel",
                ["*.ts"] = "ts.skel",
                ["*.test.tsx"] = "*-test-tsx.skel",
            },
        },
    },
    {
        "ggandor/leap.nvim",
        dependencies = { "tpope/vim-repeat" },
        config = function()
            local leap = require("leap")
            leap.opts.highlight_unlabeled_phase_one_targets = true
            leap.add_default_mappings()
        end,
    },
    {
        "nguyenvukhang/nvim-toggler",
        opts = { remove_default_keybinds = true },
    },
    {
        "numToStr/Comment.nvim",
        config = true,
    },
    {
        "Shatur/neovim-session-manager",
        config = function()
            require("session_manager").setup({
                autoload_mode = require("session_manager.config").AutoloadMode.Disabled,
            }) -- Possible values: Disabled, CurrentDir, LastSession
        end,
    },
    {
        "windwp/nvim-autopairs",
        config = true,
    },
    {
        "ThePrimeagen/refactoring.nvim",
        config = true,
        keys = {
            {
                "<leader>re",
                "<CMD>lua require('refactoring').refactor('Extract Function')<CR>",
                desc = "Extract Function",
                mode = "v",
            },
            {
                "<leader>rE",
                "<CMD>lua require('refactoring').refactor('Extract Function To File')<CR>",
                desc = "Extract Function to File",
                mode = "v",
            },
            {
                "<leader>rv",
                "<CMD>lua require('refactoring').refactor('Extract Variable')<CR>",
                desc = "Extract Varaible",
                mode = "v",
            },
            {
                "<leader>ri",
                "<CMD>lua require('refactoring').refactor('Inline Variable')<CR>",
                desc = "Inline Variable",
            },
            {
                "<leader>rb",
                "<CMD>lua require('refactoring').refactor('Extract Block')<CR>",
                desc = "Extract Block",
            },
            {
                "<leader>rbf",
                "<CMD>lua require('refactoring').refactor('Extract Block to File')<CR>",
                desc = "Extract Block to File",
            },
            {
                "<leader>ri",
                "<CMD>lua require('refactoring').refactor('Inline Variable')<CR>",
                desc = "Inline Variable",
            },
        },
    },
    "sindrets/diffview.nvim",
}
