package = "voxgig-sdk-south-park-quotes"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/south-park-quotes-sdk.git",
  tag = "lua/v0.0.1",
  dir = "south-park-quotes-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the South Park Quotes public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/south-park-quotes-sdk",
  issues_url = "https://github.com/voxgig-sdk/south-park-quotes-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "south-park-quotes" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["south-park-quotes_sdk"] = "south-park-quotes_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
