# SouthParkQuotes SDK utility: feature_add
module SouthParkQuotesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
