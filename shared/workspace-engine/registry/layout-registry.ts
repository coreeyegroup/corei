import { focusedLayout } from "../layouts/focused.layout";
import { splitLayout } from "../layouts/split.layout";
import { quadLayout } from "../layouts/quad.layout";
import { deskLayout } from "../layouts/desk.layout";
import { nocLayout } from "../layouts/noc.layout";

export const layoutRegistry = {
  focused: focusedLayout,
  split: splitLayout,
  quad: quadLayout,
  desk: deskLayout,
  noc: nocLayout
} as const;
