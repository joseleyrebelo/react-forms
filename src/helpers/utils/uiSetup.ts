/*
TODO - this should either be merged with formatting, or split into two new files
(e.g. UI & text formatting, or some other scheme), or entirely refactored to
avoid mixing formatting concerns into functions.

Consider that this wholly violates separation of concerns between styling and
behaviour / markup. Ideally these hex values would be stored only in css
and accessed via classNames. Assess whether this duplication can be removed.
*/

export const Colors = {
  // Plans
  cleanTech: "#FFA200",
  newHorizons: "#FF69E7",
  oceanRescue: "#00FFEF",
  wilderness: "#17FF60",
  // Success / Error
  successGreen: "#3BDF5F",
  errorRed: "#FF493D",
  // General
  navy: "#0B1221",
  fieldGrey: "#F0F5FE",
  metalGrey: "#ACC1E8",
  warningOrange: "#FFBA35",
  warningOrangeLight: "#FFF6E9",
  white: "#FFFFFF",
  // Social Media
  twitter: "#1DA1F2",
  facebook: "#4267B2",
  linkedIn: "#0A66C2",
};

export const CubicEasings = {
  default: "cubic-bezier(0.16, 1, 0.3, 1)",
};

export const Styles = {
  transitions: {
    height: `height 0.6s ${CubicEasings.default}`,
    width: `width 0.6s ${CubicEasings.default}`,
    border: `border 0.6s ${CubicEasings.default}`,
    margin: `margin 0.6s ${CubicEasings.default}`,
    padding: `padding 0.6s ${CubicEasings.default}`,
    opacity: `opacity 0.6s ${CubicEasings.default}`,
    visibility: `visibility 1s ${CubicEasings.default}`,
    background: `background 1s ${CubicEasings.default}`,
    transform: `transform 1s ${CubicEasings.default}`,
    boxShadow: `box-shadow 1s ${CubicEasings.default}`,
    "x-loading-tab": `width 6s ${CubicEasings.default}`,
  },
};

export const getTransitions = (
  selections: (keyof typeof Styles.transitions)[]
) => {
  return selections
    .map((selection) => Styles.transitions[selection])
    .join(", ");
};
