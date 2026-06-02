import type { ElementKey } from "@/lib/destiny";
import wood from "@/assets/element-wood.jpg";
import fire from "@/assets/element-fire.jpg";
import earth from "@/assets/element-earth.jpg";
import metal from "@/assets/element-metal.jpg";
import water from "@/assets/element-water.jpg";

export const ELEMENT_IMAGES: Record<ElementKey, string> = {
  wood,
  fire,
  earth,
  metal,
  water,
};

export const ELEMENT_TEXT_CLASS: Record<ElementKey, string> = {
  wood: "text-wood",
  fire: "text-fire",
  earth: "text-earth",
  metal: "text-metal",
  water: "text-water",
};

export const ELEMENT_BORDER_CLASS: Record<ElementKey, string> = {
  wood: "border-wood/40",
  fire: "border-fire/40",
  earth: "border-earth/40",
  metal: "border-metal/40",
  water: "border-water/40",
};
