local wilder = require("wilder")
wilder.setup({ modes = { ":", "/", "?" } })

wilder.set_option("pipeline", {
    wilder.branch(
        wilder.cmdline_pipeline({
            fuzzy = 2,
            fuzzy_filter = wilder.lua_fzy_filter(),
        }),
        {
            wilder.check(function(ctx, x)
                return x == ""
            end),
            wilder.history(),
        }
    ),
})

local highlighters = {
    wilder.pcre2_highlighter(),
    wilder.lua_fzy_highlighter(),
}

local popupmenu_renderer = wilder.popupmenu_renderer(wilder.popupmenu_palette_theme({
    border = "rounded",
    empty_message = wilder.popupmenu_empty_message_with_spinner(),
    highlighter = highlighters,
    highlights = {
        accent = wilder.make_hl("WilderAccent", "Pmenu", { { a = 1 }, { a = 1 }, { foreground = "#f4468f" } }),
    },
    reverse = 0,
    left = {
        " ",
        wilder.popupmenu_devicons(),
        wilder.popupmenu_buffer_flags({
            flags = " a + ",
            icons = { ["+"] = "", a = "", h = "" },
        }),
    },
    right = {
        " ",
        wilder.popupmenu_scrollbar(),
    },
}))

local wildmenu_renderer = wilder.wildmenu_renderer({
    highlighter = highlighters,
    separator = " · ",
    left = { " ", wilder.wildmenu_spinner(), " " },
    right = { " ", wilder.wildmenu_index() },
})

wilder.set_option(
    "renderer",
    wilder.renderer_mux({
            [":"] = popupmenu_renderer,
            ["/"] = wildmenu_renderer,
        substitute = wildmenu_renderer,
    })
)
