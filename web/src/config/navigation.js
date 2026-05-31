/** @deprecated Footer için navConfig kullanın */
export {
  FOOTER_CORPORATE_LINKS,
  FOOTER_SOCIAL_LINKS,
  getFooterToolLinks,
} from "./navConfig";

import {
  FOOTER_CORPORATE_LINKS,
  FOOTER_SOCIAL_LINKS,
  getFooterToolLinks,
} from "./navConfig";

export const NAV_LINKS = {
  tools: getFooterToolLinks(),
  corporate: FOOTER_CORPORATE_LINKS,
  social: FOOTER_SOCIAL_LINKS,
};
