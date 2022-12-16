vim.api.nvim_create_autocmd("ColorScheme", {
    pattern = "*",
    callback = function()
        package.loaded["feline"] = nil
        package.loaded["catppuccin.groups.integrations.feline"] = nil

        local components = require("catppuccin.groups.integrations.feline").get()
        local navic = require("nvim-navic")
        navic.setup({ highlight = true, safe_output = true })

        require("feline").setup({
            components = components,
        })
        require("feline").winbar.setup({
            components = {
                active = {
                    { { provider = navic.get_location, hl = { bg = "#1e2030" } } },
                    {},
                    { { provider = "lsp_client_names", hl = { bg = "#1e2030" } } },
                },
                inactive = { {}, {} },
            },
        })
    end,
})
