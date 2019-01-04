"use strict";

/* Color Definitions
============================================================================= */

const NAMED_COLORS = {
    blushPink: 'rgb(255, 131, 137)',
    greyBackground: 'rgb(243, 244, 246)',
    greyDark: 'rgb(74, 74, 74)',
    greyLight: 'rgb(116, 142, 152)',
    morningGlory: 'rgb(155,218, 214)',
    white: 'rgb(255, 255, 255)'
};

const TEXT_COLORS = {
    ...NAMED_COLORS,
    textHeading: NAMED_COLORS.greyDark,
    textLight: NAMED_COLORS.white,
    textNormal: NAMED_COLORS.greyLight,

};


/* Exports
============================================================================= */

export default {
    TEXT_COLORS, // pass through all theme colors (named and by-purpose)

    colorWithAlpha(name: string = "softorange", opacity: number = 1) {
        if (!TEXT_COLORS[name]) {
            name = "blue";
        }
        return TEXT_COLORS[name].split(", 1)").join(`, ${opacity})`);
    }
};
