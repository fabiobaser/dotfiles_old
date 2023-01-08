local icons = require("nvim-nonicons")
local get = icons.get

require("nvim-web-devicons").setup({
	override = {
		[".npmignore"] = {
			icon = get("npm"),
			color = "#E8274B",
		},
		[".npmrc"] = {
			icon = get("npm"),
			color = "#E8274B",
		},
		["package.json"] = {
			icon = get("npm"),
			color = "#e8274b",
			name = "PackageJson",
		},
		["package-lock.json"] = {
			icon = get("npm"),
			color = "#7a0d21",
			name = "PackageLockJson",
		},
		["pnpm-lock.json"] = {
			icon = "",
			color = "#e8274b",
			name = "PackageLockJson",
		},
		["babel.config.json"] = {
			icon = "",
			color = "#cbcb41",
			name = "Babelrc",
		},
		["babel.config.js"] = {
			icon = "",
			name = "Babelrc",
		},
		[".babelrc.json"] = {
			icon = "",
			name = "Babelrc",
		},
		[".babelrc.js"] = {
			icon = "",
		},
		[".babelrc"] = {
			icon = "",
		},
		["jest.config.js"] = {
			icon = "",
		},
		["jest.config.ts"] = {
			icon = "",
		},
		["jest.config.json"] = {
			icon = "",
		},
		["Dockerfile"] = {
			icon = "",
		},
		["docker-compose.yml"] = {
			icon = "",
		},
		["yml"] = {
			icon = "",
			name = "Yaml",
		},
		[".prettierrc"] = {
			icon = get("prettier"),
		},
		["project.json"] = {
			icon = "",
			name = "Nx",
		},
		["lua"] = {
			icon = "",
			name = "Luau",
		},
		["html"] = {
			icon = get("html"),
		},
		["ts"] = {
			icon = get("typescript"),
			name = "Tsx",
		},
		["toml"] = {
			icon = "🅃",
		},
		["yaml"] = {
			icon = "",
			name = "Yaml",
		},
		["jsx"] = {
			icon = "",
			name = "Tsx",
		},
		["tsx"] = {
			icon = "",
			color = "#519aba",
			cterm_color = "67",
			name = "Tsx",
		},
	},
})
