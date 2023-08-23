return {
    {
        "catppuccin/nvim",
        name = "catppuccin",
        lazy = false,
        priority = 1000,
        opts = {
            flavour = "mocha",
            dim_inactive = {
                enabled = true,
                shade = "light",
            },
            integrations = {
                treesitter = true,
                cmp = true,
                gitsigns = true,
                flash = true,
                fidget = true,
                lsp_saga = true,
                notify = true,
                leap = true,
                dropbar = {
                    enabled = true,
                    color_mode = true,
                },
                mason = true,
                noice = true,
                neotree = true,
                lsp_trouble = true,
                telescope = {
                    enabled = true,
                },
                which_key = true,
                native_lsp = {
                    enabled = true,
                    virtual_text = {
                        errors = { "italic" },
                        hints = { "italic" },
                        warnings = { "italic" },
                        information = { "italic" },
                    },
                    underlines = {
                        errors = { "underline" },
                        hints = { "underline" },
                        warnings = { "underline" },
                        information = { "underline" },
                    },
                    inlay_hints = {
                        background = true,
                    },
                },
            },
        },
    },
}
