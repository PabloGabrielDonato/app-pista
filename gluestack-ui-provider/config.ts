import { config as defaultConfig } from "@gluestack-ui/config";
import { AnimationResolver } from "@gluestack-style/animation-resolver";

export const config = {
  ...defaultConfig,
  plugins: [
    ...defaultConfig.plugins,
    AnimationResolver,  // Agregar animationResolver en los plugins
  ],
};
